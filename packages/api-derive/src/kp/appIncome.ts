// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Get app finace related records
 */

import { Observable, combineLatest, of } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { u32 } from '@polkadot/types';
import { AccountId, AppFinanceExchangeDataRPC, AppIncomeCycleRecord } from '@polkadot/types/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { DeriveAccountFinanceRecord, DeriveAppCycleIncomeCountInfo, DeriveAppCycleIncomeRecord } from '../types';
import { stringToU8a } from '@polkadot/util';
import BN from 'bn.js';

const TREASURY_ACCOUNT = stringToU8a('modlpy/trfin'.padEnd(32, '\0'));//融资
const TRMODEL_ACCOUNT = stringToU8a('modlpy/trmod'.padEnd(32, '\0'));//模型
const ACMODEL_ACCOUNT = stringToU8a('modlpy/acmod'.padEnd(32, '\0'));//模型
const TECHNOLOGY_ACCOUNT = stringToU8a('modlpy/trtch'.padEnd(32, '\0'));//技术

function queryHistoryLiquid (api: ApiInterfaceRx, block: number): Observable<BN> {
  return api.rpc.chain.getBlockHash(block).pipe(
    switchMap((blockHash) => combineLatest([
      api.query.balances.totalIssuance.at(blockHash),
      api.query.system.account.at(blockHash, TREASURY_ACCOUNT),
      api.query.system.account.at(blockHash, TRMODEL_ACCOUNT),
      api.query.system.account.at(blockHash, ACMODEL_ACCOUNT),
      api.query.system.account.at(blockHash, TECHNOLOGY_ACCOUNT)
    ])),
    map(([total, f1, f2, f3, f4]): BN => {
      const result = total.sub(f1.data.free).sub(f2.data.free).sub(f3.data.free).sub(f4.data.free);

      return result;
    })
  );
}

function accountExchange (api: ApiInterfaceRx, account: AccountId, appId: u32, cycle: number): Observable<string> {
  return api.rpc.kp.appIncomeExchangeData<AppFinanceExchangeDataRPC>({ appId, cycle, account }).pipe(
    map((exchange: AppFinanceExchangeDataRPC): string => {
      if (exchange.status.toString() === '2') {
        return exchange.exchangeAmount.div(new BN(10000)).toString();
      } else {
        return '0';
      }
    })
  );
}

function accountRecords (api: ApiInterfaceRx, account: AccountId): Observable<string[]> {
  return api.query.kp.appCycleIncome.entries<AppIncomeCycleRecord>().pipe(
    switchMap((entries) =>
      combineLatest(
        entries.map(([, financeData]) => accountExchange(api, account, financeData.appId, financeData.cycle.toNumber()))
      )
    ),
    map((results) => results)
  );
}

function countInfo (api: ApiInterfaceRx): Observable<DeriveAppCycleIncomeCountInfo> {
  return combineLatest([
    api.query.kp.appFinancedCount(),
    api.query.kp.appFinancedBurnTotal()
  ]).pipe(map(([count, total]) => {
    return {
      count,
      totalBurn: total.toHuman()
    };
  }));
}

function incomeRecords (api: ApiInterfaceRx): Observable<DeriveAppCycleIncomeRecord[]> {
  return api.query.kp.appCycleIncome.entries().pipe(
    map((entries): DeriveAppCycleIncomeRecord[] => {
      return entries.map(([, item]) => {
        return {
          appId: item.appId,
          cycle: item.cycle,
          income: (item.income.toNumber() / 100).toFixed(2)
        };
      });
    })
  );
}

function accountRecord (api: ApiInterfaceRx, account: AccountId, appId: u32, cycle: number): Observable<DeriveAccountFinanceRecord> {
  // get app finance record
  const periodBlock = Number(api.consts.kp.modelIncomeCyclePeriod.toString());
  const trackPoint = cycle * periodBlock;

  return api.rpc.kp.appIncomeRecord({ appId, cycle }).pipe(
    // get user block height finance info
    switchMap((record) => combineLatest([
      of(record),
      api.rpc.chain.getBlockHash(trackPoint)
    ])),
    switchMap(([record, blockHash]) => combineLatest([
      of(record),
      api.query.members.appDataMap(appId),
      api.query.system.account.at(blockHash, account),
      queryHistoryLiquid(api, trackPoint),
      accountExchange(api, account, appId, cycle)
    ])),
    map(([record, appConfig, balanceInfo, totalBalance, realExchangeStr]): DeriveAccountFinanceRecord => {
      // first convert income to balance
      const income = record.income.toNumber();
      const rate = appConfig.returnRate.toNumber() / 10000;
      const amountBalance = new BN(Math.floor(income * rate)).mul(new BN(1e12));
      const portion = amountBalance.mul(balanceInfo.data.free).div(totalBalance).div(new BN(1e10)).toString();

      return {
        actuallyAmount: realExchangeStr,
        maxAmount: (Number(portion) / 10000).toFixed(2)
      };
    })
  );
}

export function appIncomeAccountExchangeRecords (instanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<string[]> {
  return memo(instanceId, (account: AccountId): Observable<string[]> => {
    return accountRecords(api, account);
  });
}

export function appIncomeCountInfo (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveAppCycleIncomeCountInfo> {
  return memo(instanceId, (): Observable<DeriveAppCycleIncomeCountInfo> => {
    return countInfo(api);
  });
}

export function appIncomeRecords (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveAppCycleIncomeRecord[]> {
  return memo(instanceId, (): Observable<DeriveAppCycleIncomeRecord[]> => {
    return incomeRecords(api);
  });
}

export function accountAppIncomeRecord (instanceId: string, api: ApiInterfaceRx): (account: AccountId, appId: u32, cycle: number) => Observable<DeriveAccountFinanceRecord> {
  return memo(instanceId, (account: AccountId, appId: u32, cycle: number): Observable<DeriveAccountFinanceRecord> => {
    return accountRecord(api, account, appId, cycle);
  });
}

export function currentIssuance (instanceId: string, api: ApiInterfaceRx): () => Observable<BN> {
  return memo(instanceId, (): Observable<BN> => {
    return combineLatest([
      api.query.balances.totalIssuance(),
      api.query.system.account(TREASURY_ACCOUNT),
      api.query.system.account(TRMODEL_ACCOUNT),
      api.query.system.account(ACMODEL_ACCOUNT),
      api.query.system.account(TECHNOLOGY_ACCOUNT)
    ]).pipe(
      map(([total, f1, f2, f3, f4]): BN => {
        console.log(`currentIssuance: ${total.toString()}`);
        const result = total.sub(f1.data.free).sub(f2.data.free).sub(f3.data.free).sub(f4.data.free);

        return result;
      })
    );
  });
}
