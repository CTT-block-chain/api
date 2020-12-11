// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, PowerSize } from '@polkadot/types/interfaces';
import { u32 } from '@polkadot/types';

export type DeriveAccountPowers = [AccountId, PowerSize][]
export interface DeriveCommodityPower {
  appId: u32;
  commodityId: string;
  power: PowerSize;
}

export interface DeriveDocumentPower {
  appId: u32;
  documentId: string;
  power: PowerSize;
}
