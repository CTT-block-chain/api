// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { AccountId, PowerSize, BlockNumber, ModelCycleIncomeReward, DocumentType, Balance } from '@polkadot/types/interfaces';
import { u8, u32, Vec, bool } from '@polkadot/types';

export type DeriveAccountPowers = [AccountId, PowerSize][]
export interface DeriveCommodityPower {
  appId: u32;
  commodityId: string;
  isSlashed: bool;
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

export interface DeriveLeaderboardCycle {
  index: string;
  keys: DeriveLeaderboardKeys;
}

export interface DeriveLeaderboardKeyGroup {
  global: DeriveLeaderboardCycle[];
  models: DeriveLeaderboardCycle[];
}

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

export interface DeriveModelReward {
  account: AccountId;
  appId: u32;
  modelId: string;
  reward: string;
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
  stage: number; // 0: not in any valid stage, 1: exchange requesting, 2: confirming, 3: compensating
  totalBurn: string;
}

export interface DeriveAppCycleIncomeCountInfo {
  count: u32;
  totalBurn: string;
}

export interface DeriveAppFinanceRecord {
  appId: u32;
  block: BlockNumber;
  proposalId: string;
  amount: Balance;
  totalBalance: Balance;
}

export interface DeriveAppCycleIncomeRecord {
  appId: u32;
  cycle: BlockNumber;
  income: string;
}

export interface DeriveAccountFinanceRecord {
  maxAmount: string;
  actuallyAmount: string;
}

export interface DeriveModelDisputeSummary {
  total: number;
  lv0Count: number;
  lv1Count: number;
  lv2Count: number;
}

export interface DeriveModelDisputeData {
  appId: string;
  account: string;
  modelId: string;
  lv0Count: number;
  lv1Count: number;
  lv2Count: number;
}

export interface DeriveModelDispute {
  summary: DeriveModelDisputeSummary;
  data: DeriveModelDisputeData[];
}
