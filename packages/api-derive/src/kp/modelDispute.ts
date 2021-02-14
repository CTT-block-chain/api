// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Retrieve all model model dispute records
 */

import { Observable, combineLatest, of } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { DeriveModelDisputeData, DeriveModelDispute } from '../types';
import { AccountId } from '@polkadot/types/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { u8aToString } from '@polkadot/util';

// model appId + modelId as key
interface Dict {
  [Key: string]: DeriveModelDisputeData
}

export function modelDisputeStatistic (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveModelDispute> {
  return memo(instanceId, (): Observable<DeriveModelDispute> => {
    // get all records
    return api.query.kp.modelDisputeRecords.entries().pipe(
      switchMap((entries) =>
        combineLatest([
          of(entries),
          combineLatest(
            entries.map(([, record]): Observable<AccountId> => api.rpc.members.modelCreator({appId: record.appId, modelId: record.modelId}))
          )
        ])
      ),
      map(([entries, accounts]) => {
        const result: DeriveModelDispute = {
          data: [],
          summary: {
            lv0Count: 0,
            lv1Count: 0,
            lv2Count: 0,
            total: 0
          }
        };

        const dict: Dict = {};

        for (let i = 0; i < entries.length; i++) {
          const item = entries[i][1];
          const account = accounts[i];

          result.summary.total++;
          const lvCount = [0, 0, 0];

          switch (item.disputeType.toString()) {
            case 'NoneIntendNormal':
              result.summary.lv0Count++;
              lvCount[0]++;
              break;
            case 'IntendNormal':
              result.summary.lv1Count++;
              lvCount[1]++;
              break;
            case 'Serious':
              result.summary.lv2Count++;
              lvCount[2]++;
              break;
          }

          const key = item.appId.toString() + u8aToString(item.modelId);

          if (typeof dict[key] === 'undefined') {
            dict[key] = {
              account: account.toString(),
              appId: item.appId.toString(),
              lv0Count: lvCount[0],
              lv1Count: lvCount[1],
              lv2Count: lvCount[2],
              modelId: u8aToString(item.modelId)
            };
          } else {
            // update count
            dict[key].lv0Count += lvCount[0];
            dict[key].lv1Count += lvCount[1];
            dict[key].lv2Count += lvCount[2];
          }
        }

        // go through dict
        result.data = Object.values(dict);

        return result;
      })
    );
  });
}
