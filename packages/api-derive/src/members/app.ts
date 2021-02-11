// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Observable, combineLatest, of } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { DeriveAppInfos, DeriveApp, DeriveAppSummary } from './types';
import { Vec, u32 } from '@polkadot/types';
import { AccountId } from '@polkadot/types/interfaces';
import { u8aToString } from '@polkadot/util';

const APP_TYPE_COMMODITY = '商品';
const APP_TYPE_SERVICE = '服务';
const APP_TYPE_GOV = '社会治理';
const APP_TYPE_OTHERS = '其它';

function getAppType (appId: number): string {
  if (appId < 200010000) return APP_TYPE_COMMODITY;
  if (appId < 300010000) return APP_TYPE_SERVICE;
  if (appId < 400010000) return APP_TYPE_GOV;

  return APP_TYPE_OTHERS;
}

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
          appType: getAppType(Number(key.args[0].toString())),
          identityAccount: identities[idx],
          platformExperts: experts[idx],
          returnRate: appData.returnRate,
          stake: appData.stake
        };
      })
    )
  );
}

export function apps (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveApp> {
  return memo(instanceId, (): Observable<DeriveApp> => retrieveApps(api).pipe(
    map((infos) => {
      // go through infos to get count info
      const summary: DeriveAppSummary = {
        commodity: 0,
        governance: 0,
        others: 0,
        service: 0,
        total: infos.length
      };

      infos.forEach((info) => {
        switch (info.appType) {
          case APP_TYPE_COMMODITY:
            summary.commodity += 1;
            break;
          case APP_TYPE_SERVICE:
            summary.service += 1;
            break;
          case APP_TYPE_GOV:
            summary.governance += 1;
            break;
          case APP_TYPE_OTHERS:
            summary.others += 1;
            break;
        }
      });

      return {
        infos,
        summary
      };
    })
  ));
}
