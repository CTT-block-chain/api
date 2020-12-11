
/**
 * @description Retrieve account statistics
 */

import { Observable } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { AccountId, AccountStatistics} from '@polkadot/types/interfaces';
import { map } from 'rxjs/operators';
import { memo } from '../util';
import { Vec, Bytes, u32 } from '@polkadot/types';
import { DeriveCommodityPower } from '../types';

function retriveSingleStatistics (api: ApiInterfaceRx, account: AccountId | string): Observable<AccountStatistics> {
  const kp = api.query.kp;
  return kp.accountStatisticsMap<AccountStatistics>(account).pipe(
    map((info): AccountStatistics => {
      return info;
    })
  );
}

function retriveCommodities (api: ApiInterfaceRx, account: AccountId | string, appId: u32): Observable<DeriveCommodityPower[]> {
  return api.query.kp.accountCommoditySet<Bytes[]>(account, appId).pipe(
    map((sets: Bytes[]): DeriveCommodityPower[] => {
      let result: DeriveCommodityPower[] = [];
      return result;
    })
  );
}

export function accountStatistics (intanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<AccountStatistics> {
  return memo(intanceId, (account: AccountId): Observable<AccountStatistics> => {
    return retriveSingleStatistics(api, account);
  });
}

export function accountCommodities (intanceId: string, api: ApiInterfaceRx): (account: AccountId, appId: u32) => Observable<[DeriveCommodityPower]> {
  return memo(intanceId, (account: AccountId, appId: u32): Observable<[DeriveCommodityPower]> => {
    return retriveCommodities(api, account, appId);
  });
}
