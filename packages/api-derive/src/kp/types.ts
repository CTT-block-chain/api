// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, PowerSize } from '@polkadot/types/interfaces';
import { u32, Bytes } from '@polkadot/types';

export type DeriveAccountPowers = [AccountId, PowerSize][]
export interface DeriveCommodityPower {
  appId: u32;
  commodityId: Bytes;
  power: PowerSize;
}
