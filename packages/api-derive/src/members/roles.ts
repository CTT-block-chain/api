
/**
 * @description Retrieve power leaderboard info
 */

import { Observable } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { map } from 'rxjs/operators';
import { memo } from '../util';
import { DeriveRoleAccounts } from './types';
import { u32 } from '@polkadot/types';

function retriveRoleInvestorAccounts (api: ApiInterfaceRx): Observable<DeriveRoleAccounts> {
  return api.query.members.investorMembers().pipe(
    map((accounts): DeriveRoleAccounts => {
      return accounts;
    })
  );
}

export function roleInvestorAccounts (intanceId: string, api: ApiInterfaceRx): () => Observable<DeriveRoleAccounts> {
  return memo(intanceId, (): Observable<DeriveRoleAccounts> => {
    return retriveRoleInvestorAccounts(api);
  });
}

function retriveRolePlatformExpertAccounts (api: ApiInterfaceRx, appId: u32): Observable<DeriveRoleAccounts> {
  return api.query.members.appPlatformExpertMembers(appId).pipe(
    map((accounts): DeriveRoleAccounts => {
      return accounts;
    })
  );
}

export function rolePlatformExpertAccounts (intanceId: string, api: ApiInterfaceRx): (appId: u32) => Observable<DeriveRoleAccounts> {
  return memo(intanceId, (appId: u32): Observable<DeriveRoleAccounts> => {
    return retriveRolePlatformExpertAccounts(api, appId);
  });
}

