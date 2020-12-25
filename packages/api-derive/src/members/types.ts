// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, Balance } from '@polkadot/types/interfaces';
import { Vec, u32 } from '@polkadot/types';

export interface DeriveAppInfo {
  appId: u32,
  appName: string,
  identityAccount: AccountId,
  adminAccount: AccountId,
  staking: Balance,
  returnRate: u32,
}

export type DeriveAppInfos = DeriveAppInfo[]

export type DeriveRoleAccounts = Vec<AccountId>
