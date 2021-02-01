// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, PowerSize, BlockNumber, ModelCycleIncomeReward, DocumentType, Balance } from '@polkadot/types/interfaces';
import { u8, u32, Vec } from '@polkadot/types';

export type DeriveAccountPowers = [AccountId, PowerSize][]
export interface DeriveCommodityPower {
  appId: u32;
  commodityId: string;
  power: PowerSize;
}

export interface DeriveDocumentPower {
  appId: u32;
  documentId: string;
  documentType: DocumentType;
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

export interface DeriveModelData {
  account: AccountId;
  appId: u32;
  modelId: string;
  status: string;
  createReward: string;
  commodityName: string;
  deposit: string;
  experts: Vec<AccountId>;
}

export interface DeriveUserExchanges {
  exchanges: string[];
}

export interface DeriveAppFinanceCountInfo {
  count: u32;
  leftSeconds: number;
  totalBurn: string;
}

export interface DeriveAppFinanceRecord {
  appId: u32;
  block: BlockNumber;
  proposalId: string;
  amount: Balance;
  totalBalance: Balance;
}

export interface DeriveAccountFinanceRecord {
  maxAmount: string;
  actuallyAmount: string;
}
