// Copyright 2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

/**
 * @description Retrieve account statistics
 */

import { Observable, combineLatest } from 'rxjs';
import { ApiInterfaceRx } from '@polkadot/api/types';
import { AccountId, AccountStatistics, PowerSize, DocumentPowerInfo } from '@polkadot/types/interfaces';
import { map, switchMap } from 'rxjs/operators';
import { memo } from '../util';
import { Bytes, u32, bool } from '@polkadot/types';
import { DeriveCommodityPower, DeriveDocumentPower } from '../types';
import { u8aToString } from '@polkadot/util';

function retriveSingleStatistics (api: ApiInterfaceRx, account: AccountId | string): Observable<AccountStatistics> {
  const kp = api.query.kp;

  return kp.accountStatisticsMap<AccountStatistics>(account).pipe(
    map((info): AccountStatistics => {
      return info;
    })
  );
}

function retriveCommodityPower (api: ApiInterfaceRx, appId: u32, cartId: Bytes): Observable<DeriveCommodityPower> {
  return combineLatest([
    api.rpc.kp.commodityPower<PowerSize>({ appId, cartId }),
    api.rpc.kp.isCommodityInBlackList<bool>({ appId, cartId })
  ]).pipe(
    map(([power, isSlashed]) => {
      return {
        appId,
        commodityId: u8aToString(cartId),
        isSlashed,
        power
      };
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

function retriveDocumentPower(api: ApiInterfaceRx, appId: u32, docId: Bytes):
  Observable<DeriveDocumentPower> {
  return api.rpc.kp.documentPower<DocumentPowerInfo>({appId, docId}).pipe(
    map((info: DocumentPowerInfo): DeriveDocumentPower => {
      return {appId, documentId: u8aToString(docId), power: info.power, documentType: info.docType}
    })
  );
}

function retriveDocuments (api: ApiInterfaceRx, account: AccountId | string, appId: u32):
  Observable<DeriveDocumentPower[]> {
  return api.query.kp.accountDocumentSet<Bytes[]>(account, appId).pipe(
    switchMap((sets) =>
      combineLatest(
        sets.map((docId) => retriveDocumentPower(api, appId, docId))
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

export function accountDocuments (intanceId: string, api: ApiInterfaceRx): (account: AccountId, appId: u32) => Observable<DeriveDocumentPower[]> {
  return memo(intanceId, (account: AccountId, appId: u32): Observable<DeriveDocumentPower[]> => {
    return retriveDocuments(api, account, appId);
  });
}
