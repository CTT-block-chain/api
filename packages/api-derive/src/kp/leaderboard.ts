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
import { DeriveLeaderboardKeys, DeriveLeaderboardQueryKey, DeriveLeaderboardData } from './types';
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

export function leaderboardKeys (intanceId: string, api: ApiInterfaceRx): () => Observable<DeriveLeaderboardKeys> {
  return memo(intanceId, (): Observable<DeriveLeaderboardKeys> => {
    return retriveBoardKeys(api);
  });
}

export function leaderboardRecord (intanceId: string, api: ApiInterfaceRx): (params: DeriveLeaderboardQueryKey) => Observable<DeriveLeaderboardData> {
  return memo(intanceId, (params: DeriveLeaderboardQueryKey): Observable<DeriveLeaderboardData> => {
    return retriveLeaderboard(api, params);
  });
}
