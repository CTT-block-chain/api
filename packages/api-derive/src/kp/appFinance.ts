// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Get app finace related records
 */

import { Observable, combineLatest, of } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Bytes, u32 } from '@polkadot/types';
import { AccountId, AppFinancedData, AppFinanceExchangeDataRPC, Hash } from '@polkadot/types/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { DeriveAppFinanceCountInfo, DeriveAppFinanceRecord, DeriveAccountFinanceRecord } from '../types';
import { u8aToString } from '@polkadot/util';
import BN from 'bn.js';

function accountExchange (api: ApiInterfaceRx, account: AccountId, appId: u32, proposalId: Bytes | string): Observable<string> {
  return api.rpc.kp.appFinanceExchangeData<AppFinanceExchangeDataRPC>({ appId, proposalId, account }).pipe(
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
  return api.query.kp.appFinancedRecord.entries<AppFinancedData>().pipe(
    switchMap((entries) =>
      combineLatest(
        entries.map(([, financeData]) => accountExchange(api, account, financeData.appId, financeData.proposalId))
      )
    ),
    map((results) => results)
  );
}

function queryAppFinanceRecord (api: ApiInterfaceRx, hash: Hash): Observable<AppFinancedData> {
  return api.query.kp.appFinancedRecord(hash).pipe(
    map((record) => record)
  );
}

function queryCurrentBlock (api: ApiInterfaceRx): Observable<number> {
  return api.rpc.chain.getHeader().pipe(
    map((header) => Number(header.number.toString()))
  );
}

function lastFinanceLeft (api: ApiInterfaceRx): Observable<number> {
  return api.query.kp.appFinancedLast().pipe(
    switchMap((hash) =>
      combineLatest(
        queryAppFinanceRecord(api, hash),
        queryCurrentBlock(api)
      )
    ),
    map(([financeData, currentBlock]) => {
      const end = Number(financeData.exchangeEndBlock.toString());

      if (end > 0 && currentBlock < end) {
        // we are in current exchange stage
        return (end - currentBlock) * 6;
      } else {
        return 0;
      }
    })
  );
}

function countInfo (api: ApiInterfaceRx): Observable<DeriveAppFinanceCountInfo> {
  return combineLatest([
    api.query.kp.appFinancedCount(),
    api.query.kp.appFinancedBurnTotal(),
    lastFinanceLeft(api)
  ]).pipe(map(([count, total, leftSeconds]) => {
    return {
      count,
      leftSeconds,
      totalBurn: total.toHuman()
    };
  }));
}

function financeRecords (api: ApiInterfaceRx): Observable<DeriveAppFinanceRecord[]> {
  return api.query.kp.appFinancedRecord.entries().pipe(
    map((entries): DeriveAppFinanceRecord[] => {
      return entries.map(([, item]) => {
        return {
          amount: item.amount,
          appId: item.appId,
          block: item.block,
          proposalId: u8aToString(item.proposalId),
          totalBalance: item.totalBalance
        };
      });
    })
  );
}

function accountRecord (api: ApiInterfaceRx, account: AccountId, appId: u32, proposalId: string): Observable<DeriveAccountFinanceRecord> {
  // get app finance record
  return api.rpc.kp.appFinanceRecord({ appId, proposalId }).pipe(
    // get user block height finance info
    switchMap((record) => combineLatest([
      of(record),
      api.rpc.chain.getBlockHash(record.block)
    ])),
    switchMap(([record, blockHash]) => combineLatest([
      of(record),
      api.query.system.account.at(blockHash, account),
      accountExchange(api, account, appId, proposalId)
    ])),
    map(([record, balanceInfo, realExchangeStr]): DeriveAccountFinanceRecord => {
      const maxAmount = record.exchange.mul(balanceInfo.data.free).div(record.totalBalance);

      return {
        actuallyAmount: realExchangeStr,
        maxAmount: maxAmount.div(new BN(1e14)).toString()
      };
    })
  );
}

export function appFinanceAccountExchangeRecords (instanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<string[]> {
  return memo(instanceId, (account: AccountId): Observable<string[]> => {
    return accountRecords(api, account);
  });
}

export function appFinanceCountInfo (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveAppFinanceCountInfo> {
  return memo(instanceId, (): Observable<DeriveAppFinanceCountInfo> => {
    return countInfo(api);
  });
}

export function appFinanceRecords (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveAppFinanceRecord[]> {
  return memo(instanceId, (): Observable<DeriveAppFinanceRecord[]> => {
    return financeRecords(api);
  });
}

export function accountFinanceRecord (instanceId: string, api: ApiInterfaceRx): (account: AccountId, appId: u32, proposalId: string) => Observable<DeriveAccountFinanceRecord> {
  return memo(instanceId, (account: AccountId, appId: u32, proposalId: string): Observable<DeriveAccountFinanceRecord> => {
    return accountRecord(api, account, appId, proposalId);
  });
}

export function financeGroup (instanceId: string, api: ApiInterfaceRx): () => Observable<AccountId[]> {
  return memo(instanceId, (): Observable<AccountId[]> => api.query.members.financeMembers().pipe(
    map((result) => result))
  );
}
