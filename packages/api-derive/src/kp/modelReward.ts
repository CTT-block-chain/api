// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Retrieve all model cycle income reward records
 */

import BN from 'bn.js';
import { Observable, combineLatest, of } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { ModelCycleIncomeReward, ModelIncomeCurrentStageRPC, KPModelDataOf } from '@polkadot/types/interfaces';
import { DeriveModelRewardRecords, DeriveModelCycleRewardTime, DeriveModelData } from '../types';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { u8aToString } from '@polkadot/util';

interface Dict {
  [Key: string]: DeriveModelRewardRecords
}

function retrieveAll (api: ApiInterfaceRx): Observable<DeriveModelRewardRecords[]> {
  const kp = api.query.kp;

  return kp.modelCycleIncomeRewardStore.entries<ModelCycleIncomeReward[]>().pipe(
    map((entries): DeriveModelRewardRecords[] => {
      // dict key is appId concat ModelId, value is DeriveModelRewardRecords
      const dict:Dict = {};

      // need to go through entries to collect all app_id + model_id records
      entries.forEach(([, store]) => {
        store.forEach((value) => {
          const key = value.appId.toString() + value.modelId.toString();

          if (typeof dict[key] === 'undefined') {
            dict[key] = {
              account: value.account,
              appId: value.appId,
              modelId: u8aToString(value.modelId),
              rewards: [value.reward.toString()]
            };
          } else {
            // just push rewards
            dict[key].rewards.push(value.reward.toHuman());
          }
        });
      });

      return Object.values(dict);
    })
  );
}

function currentModelCycleRewardInfo (api: ApiInterfaceRx): Observable<DeriveModelCycleRewardTime> {
  return api.rpc.kp.modelIncomeCurrentStage<ModelIncomeCurrentStageRPC>().pipe(
    map((info: ModelIncomeCurrentStageRPC): DeriveModelCycleRewardTime => {
      return {
        leftSeconds: Number(info.left.toString()) * 6,
        stage: info.stage
      };
    })
  );
}

function modelList (api: ApiInterfaceRx): Observable<DeriveModelData[]> {
  return api.query.kp.kPModelDataByIdHash.entries<KPModelDataOf>().pipe(
    switchMap((entries) =>
      combineLatest([
        of(entries),
        combineLatest(
          entries.map(([, data]) =>
            api.rpc.kp.modelDeposit({ appId: data.appId, modelId: data.modelId })
          )
        ),
        combineLatest(
          entries.map(([, data]) =>
            api.rpc.members.modelExperts({ appId: data.appId, modelId: data.modelId })
          )
        )
      ])
    ),
    map(([entries, deposits, experts]) =>
      entries.map(([, data], idx) => {
        return {
          account: data.owner,
          appId: data.appId,
          commodityName: u8aToString(data.commodityName),
          createReward: data.createReward.div(new BN(1e14)).toString(),
          deposit: deposits[idx].div(new BN(10000)).toString(),
          experts: experts[idx],
          modelId: u8aToString(data.modelId),
          status: data.status.toString()
        };
      })
    )
  );
}

export function allRewardsRecord (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveModelRewardRecords[]> {
  return memo(instanceId, (): Observable<DeriveModelRewardRecords[]> => {
    return retrieveAll(api);
  });
}

export function modelCycleRewardStage (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveModelCycleRewardTime> {
  return memo(instanceId, (): Observable<DeriveModelCycleRewardTime> => {
    return currentModelCycleRewardInfo(api);
  });
}

export function allModels (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveModelData[]> {
  return memo(instanceId, (): Observable<DeriveModelData[]> => {
    return modelList(api);
  });
}
