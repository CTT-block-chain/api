// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Observable, combineLatest, of } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { DeriveAppInfos } from './types';
import { Vec, u32 } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { u8aToString } from '@polkadot/util';

function retrieveApps (api: ApiInterfaceRx): Observable<DeriveAppInfos> {
  return api.query.members.appDataMap.entries().pipe(
    switchMap((entries) =>
      combineLatest([
        of(entries),
        api.query.members.appAdmins.multi<Vec<AccountId>>(
          entries.map(([key]): u32 => key.args[0] as u32)),
        api.query.members.appKeys.multi<Vec<AccountId>>(
          entries.map(([key]): u32 => key.args[0] as u32)),
        api.query.members.appPlatformExpertMembers.multi<Vec<AccountId>>(
          entries.map(([key]): u32 => key.args[0] as u32))
      ])
    ),
    map(([entries, admins, identities, experts]) =>
      entries.map(([key, appData], idx) => {
        return {
          adminAccount: admins[idx],
          appId: key.args[0] as u32,
          appName: u8aToString(appData.name),
          identityAccount: identities[idx],
          platformExperts: experts[idx],
          returnRate: appData.returnRate,
          stake: appData.stake
        };
      })
    )
  );
}

export function apps (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveAppInfos> {
  return memo(instanceId, (): Observable<DeriveAppInfos> => retrieveApps(api));
}
