// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, PowerSize, BlockNumber, ModelCycleIncomeReward } from '@polkadot/types/interfaces';
import { u8, u32 } from '@polkadot/types';

export type DeriveAccountPowers = [AccountId, PowerSize][]
export interface DeriveCommodityPower {
  appId: u32;
  commodityId: string;
  power: PowerSize;
}

export interface DeriveDocumentPower {
  appId: u32;
  documentId: string;
  documentType: u8;
  power: PowerSize;
}

export type DeriveLeaderboardQueryKey = [u32, BlockNumber, string];

export type DeriveLeaderboardKeys = DeriveLeaderboardQueryKey[];

export interface DeriveLeaderBoardItem {
  commodityId: string;
  power: PowerSize;
  owner: AccountId;
}

export interface DeriveLeaderboardData {
  accounts: AccountId[];
  board: DeriveLeaderBoardItem[];
}

export interface DeriveModelRewards {
  index: u32;
  rewards: ModelCycleIncomeReward[];
}

export interface DeriveModelRewardRecords {
  account: AccountId;
  appId: u32;
  modelId: string;
  rewards: string[];
}

export interface DeriveModelCycleRewardTime {
  stage: u8;
  leftSeconds: number;
}
