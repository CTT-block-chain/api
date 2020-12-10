
/**
 * @description Retrieve account statistics
 */

import { Observable } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { AccountId, AccountStatistics } from '@polkadot/types/interfaces';
import { map } from 'rxjs/operators';
import { memo } from '../util';

function retriveSingleStatistics (api: ApiInterfaceRx, account: AccountId | string): Observable<AccountStatistics> {
  const kp = api.query.kp;
  return kp.accountStatisticsMap<AccountStatistics>(account).pipe(
    map((info): AccountStatistics => {
      return info;
    })
  );
}

export function accountStatistics (intanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<AccountStatistics> {
  return memo(intanceId, (account: AccountId): Observable<AccountStatistics> => {
    return retriveSingleStatistics(api, account);
  });
}
