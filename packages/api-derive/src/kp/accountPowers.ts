// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Retrieve all account powers
 */

import { Observable } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { u64 } from '@polkadot/types';
import { AccountId, Balance, PowerSize, StakeToVoteResult } from '@polkadot/types/interfaces';
import { DeriveAccountPowers } from '../types';
import { map } from 'rxjs/operators';
import { memo } from '../util';

function retriveCurrent (api: ApiInterfaceRx): Observable<DeriveAccountPowers> {
  const kp = api.query.kp;

  return kp.minerPowerByAccount.entries<PowerSize>().pipe(
    map((entries): DeriveAccountPowers =>
      entries.map(([key, power]): [AccountId, PowerSize] =>
        [key.args[0] as AccountId, power]
      )
    )
  );
}

function retriveSinglePower (api: ApiInterfaceRx, account: AccountId | string): Observable<PowerSize> {
  const kp = api.query.kp;
  return kp.minerPowerByAccount<PowerSize>(account).pipe(
    map((power): PowerSize => {
      return power;
    })
  );
}

function stakeToVote (api: ApiInterfaceRx, account: AccountId, stake: u64): Observable<Balance> {
  const kp = api.rpc.kp;
  return kp.stakeToVote<StakeToVoteResult>({account, stake}).pipe(
    map((result): Balance => {
      return result.result;
    })
  );
}

export function accountPowers (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveAccountPowers> {
  return memo(instanceId, (): Observable<DeriveAccountPowers> => retriveCurrent(api));
}

export function accountPower (intanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<PowerSize> {
  return memo(intanceId, (account: AccountId): Observable<PowerSize> => {
    return retriveSinglePower(api, account);
  });
}

export function stakeToVoteEvulate (intanceId: string, api: ApiInterfaceRx): (account: AccountId, stake: Balance) => Observable<Balance> {
  return memo(intanceId, (account: AccountId, stake: Balance): Observable<Balance> => {
    return stakeToVote(api, account, stake);
  });
}

export function powerRatio (intanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<string> {
  return memo(intanceId, (account: AccountId): Observable<string> => {
    return api.rpc.kp.powerRatio(account).pipe(
      map((result): string => {
        return (Number(result.toString()) / 10000).toString();
      })
    );
  });
}
