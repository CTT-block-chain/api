// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Get app finace related records
 */

import { Observable, combineLatest } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { Bytes, u32 } from '@polkadot/types';
import { AccountId, AppFinancedData, AppFinanceExchangeDataRPC, Hash } from '@polkadot/types/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { DeriveAppFinanceCountInfo } from '../types';
import BN from 'bn.js';

function accountExchange (api: ApiInterfaceRx, account: AccountId, appId: u32, proposalId: Bytes): Observable<string> {
  return api.rpc.kp.appFinanceExchangeData<AppFinanceExchangeDataRPC>({appId, proposalId, account}).pipe(
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
