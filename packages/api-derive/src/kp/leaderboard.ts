// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Retrieve power leaderboard info
 */

import { Observable } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { map } from 'rxjs/operators';
import { memo } from '../util';
import { Bytes } from '@polkadot/types';
import { DeriveLeaderboardKeys, DeriveLeaderboardQueryKey, DeriveLeaderboardData, DeriveLeaderboardKeyGroup } from './types';
import { u8aToString } from '@polkadot/util';

function retriveBoardKeys (api : ApiInterfaceRx): Observable<DeriveLeaderboardKeys> {
  return api.query.kp.appLeaderBoardSequenceKeys().pipe(
    map((keys): DeriveLeaderboardKeys =>
      keys.map((item) => {
        return [item[0], item[1], u8aToString(item[2] as Bytes)];
      })
    )
  );
}

function groupKeys (keys: DeriveLeaderboardKeys, cycleBlocks: number): DeriveLeaderboardKeyGroup {
  interface Dict {
    [index: string]: DeriveLeaderboardKeys;
  }

  const result: DeriveLeaderboardKeyGroup = {
    global: [],
    models: []
  };
  const dictGlobal: Dict = {};
  const dictModels: Dict = {};

  keys.forEach((key) => {
    const block = key[1];
    const index = Math.floor(Number(block.toString()) / cycleBlocks).toString();
    let dict = dictModels;

    if (key[2] === '') {
      // for global
      dict = dictGlobal;
    }

    if (dict[index]) {
      dict[index].push(key);
    } else {
      dict[index] = [key];
    }
  });

  for (const index in dictGlobal) {
    result.global.push({
      index,
      keys: dictGlobal[index]
    });
  }

  for (const index in dictModels) {
    result.models.push({
      index,
      keys: dictModels[index]
    });
  }

  return result;
}

function retriveLeaderboard (api: ApiInterfaceRx, params: DeriveLeaderboardQueryKey): Observable<DeriveLeaderboardData> {
  return api.rpc.kp.leaderBoardResult({appId: params[0], modelId: params[2], block: params[1]}).pipe(
    map((result): DeriveLeaderboardData => {
      let converted: DeriveLeaderboardData = {
        accounts: result.accounts,
        board: [],
      };

      result.board.forEach((item) => {
        converted.board.push({
          commodityId: u8aToString(item.cartId),
          power: item.power,
          owner: item.owner
        });
      });

      return converted;
    })
  );
}

export function leaderboardKeys (intanceId: string, api: ApiInterfaceRx): () => Observable<DeriveLeaderboardKeyGroup> {
  return memo(intanceId, (): Observable<DeriveLeaderboardKeyGroup> => {
    return retriveBoardKeys(api).pipe(
      map((result) => groupKeys(result, Number(api.consts.kp.appLeaderBoardInterval.toString())))
    );
  });
}

export function leaderboardRecord (intanceId: string, api: ApiInterfaceRx): (params: DeriveLeaderboardQueryKey) => Observable<DeriveLeaderboardData> {
  return memo(intanceId, (params: DeriveLeaderboardQueryKey): Observable<DeriveLeaderboardData> => {
    return retriveLeaderboard(api, params);
  });
}
