
/**
 * @description Retrieve all account powers
 */

import { Observable } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { AccountId, PowerSize } from '@polkadot/types/interfaces';
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

export function accountPowers (instanceId: string, api: ApiInterfaceRx): () => Observable<DeriveAccountPowers> {
  return memo(instanceId, (): Observable<DeriveAccountPowers> => retriveCurrent(api));
}

export function accountPower (intanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<PowerSize> {
  return memo(intanceId, (account: AccountId): Observable<PowerSize> => {
    return retriveSinglePower(api, account);
  });
}
