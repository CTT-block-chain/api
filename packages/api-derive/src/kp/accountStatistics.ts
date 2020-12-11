
/**
 * @description Retrieve account statistics
 */

import { Observable, combineLatest } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { AccountId, AccountStatistics, PowerSize} from '@polkadot/types/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { Bytes, u32 } from '@polkadot/types';
import { DeriveCommodityPower } from '../types';
import { u8aToString } from '@polkadot/util';

function retriveSingleStatistics (api: ApiInterfaceRx, account: AccountId | string): Observable<AccountStatistics> {
  const kp = api.query.kp;
  return kp.accountStatisticsMap<AccountStatistics>(account).pipe(
    map((info): AccountStatistics => {
      return info;
    })
  );
}

function retriveCommodityPower(api: ApiInterfaceRx, appId: u32, commodityId: Bytes): 
  Observable<DeriveCommodityPower> {
  return api.rpc.kp.commodityPower<PowerSize>({appId, cartId: commodityId}).pipe(
    map((power: PowerSize): DeriveCommodityPower => {
      return {appId, commodityId: u8aToString(commodityId), power}
    })
  );
}

function retriveCommodities (api: ApiInterfaceRx, account: AccountId | string, appId: u32): 
  Observable<DeriveCommodityPower[]> {
  return api.query.kp.accountCommoditySet<Bytes[]>(account, appId).pipe(
    switchMap((sets) => 
      combineLatest(
        sets.map((commodityId) => retriveCommodityPower(api, appId, commodityId))
      )
    ),
    map((results) => results)
  );
}

export function accountStatistics (intanceId: string, api: ApiInterfaceRx): (account: AccountId) => Observable<AccountStatistics> {
  return memo(intanceId, (account: AccountId): Observable<AccountStatistics> => {
    return retriveSingleStatistics(api, account);
  });
}

export function accountCommodities (intanceId: string, api: ApiInterfaceRx): (account: AccountId, appId: u32) => Observable<DeriveCommodityPower[]> {
  return memo(intanceId, (account: AccountId, appId: u32): Observable<DeriveCommodityPower[]> => {
    return retriveCommodities(api, account, appId);
  });
}
