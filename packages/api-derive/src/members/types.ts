// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, Balance } from '@polkadot/types/interfaces';
import { Vec, u32 } from '@polkadot/types';

export interface DeriveAppInfo {
  appId: u32;
  appName: string;
  identityAccount: AccountId[];
  adminAccount: AccountId[];
  platformExperts: AccountId[];
  returnRate: u32;
  stake: Balance;
  appType: string;
}

export type DeriveAppInfos = DeriveAppInfo[]

export type DeriveRoleAccounts = Vec<AccountId>

export interface DeriveAppSummary {
  total: number;
  commodity: number;
  service: number;
  governance: number;
  others: number;
}
export interface DeriveApp {
  summary: DeriveAppSummary;
  infos: DeriveAppInfos;
}
