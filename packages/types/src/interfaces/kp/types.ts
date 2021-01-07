// Auto-generated via `yarn polkadot-types-from-defs`, do not edit
/* eslint-disable */

import type { Bytes, Enum, Struct, Vec, bool, u32, u64, u8 } from '@polkadot/types';
import type { AccountId, Balance, BalanceOf, BlockNumber, Hash } from '@polkadot/types/interfaces/runtime';

/** @name AccountID32 */
export interface AccountID32 extends AccountId {}

/** @name AccountStatistics */
export interface AccountStatistics extends Struct {
  readonly createCommodityNum: u32;
  readonly slashCommodityNum: u32;
  readonly slashKpTotal: u64;
  readonly commentNum: u32;
  readonly commentCostTotal: u64;
  readonly commentCostMax: u64;
  readonly commentPositiveTrendNum: u32;
  readonly commentNegativeTrendNum: u32;
}

/** @name AddAppParams */
export interface AddAppParams extends Struct {
  readonly appType: Bytes;
  readonly appName: Bytes;
  readonly appKey: AccountId;
  readonly appAdminKey: AccountId;
  readonly returnRate: u32;
}

/** @name AppData */
export interface AppData extends Struct {
  readonly name: Bytes;
  readonly returnRate: u32;
  readonly stake: Balance;
}

/** @name AppFinanceDataRPC */
export interface AppFinanceDataRPC extends Struct {
  readonly amount: u64;
  readonly exchange: u64;
  readonly block: BlockNumber;
  readonly totalBalance: u64;
  readonly exchanged: u64;
  readonly exchangeEndBlock: BlockNumber;
}

/** @name AppFinancedData */
export interface AppFinancedData extends Struct {
  readonly appId: u32;
  readonly proposalId: Bytes;
  readonly amount: Balance;
  readonly exchange: Balance;
  readonly block: BlockNumber;
  readonly totalBalance: Balance;
  readonly exchanged: Balance;
  readonly exchangeEndBlock: BlockNumber;
}

/** @name AppFinancedProposalParams */
export interface AppFinancedProposalParams extends Struct {
  readonly account: AccountId;
  readonly appId: u32;
  readonly proposalId: Bytes;
  readonly exchange: Balance;
  readonly amount: Balance;
}

/** @name AppFinancedUserExchangeConfirmParams */
export interface AppFinancedUserExchangeConfirmParams extends Struct {
  readonly account: AccountId;
  readonly appId: u32;
  readonly payId: Bytes;
  readonly proposalId: Bytes;
}

/** @name AppFinancedUserExchangeData */
export interface AppFinancedUserExchangeData extends Struct {
  readonly exchangeAmount: Balance;
  readonly status: u8;
  readonly payId: Bytes;
}

/** @name AppFinancedUserExchangeParams */
export interface AppFinancedUserExchangeParams extends Struct {
  readonly account: AccountId;
  readonly appId: u32;
  readonly proposalId: Bytes;
  readonly exchangeAmount: Balance;
}

/** @name AppFinanceExchangeDataParams */
export interface AppFinanceExchangeDataParams extends Struct {
  readonly appId: u32;
  readonly proposalId: Bytes;
  readonly account: AccountId;
}

/** @name AppFinanceExchangeDataRPC */
export interface AppFinanceExchangeDataRPC extends Struct {
  readonly exchangeAmount: u64;
  readonly status: u8;
  readonly payId: Bytes;
}

/** @name AppFinanceRecordParams */
export interface AppFinanceRecordParams extends Struct {
  readonly appId: u32;
  readonly proposalId: Bytes;
}

/** @name AuthAccountId */
export interface AuthAccountId extends AccountId {}

/** @name AuthParamsCreateModel */
export interface AuthParamsCreateModel extends Struct {
  readonly modelId: Bytes;
}

/** @name ClientParamsCreateChooseDoc */
export interface ClientParamsCreateChooseDoc extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly modelId: Bytes;
  readonly productId: Bytes;
  readonly contentHash: Hash;
  readonly sellCount: PowerSize;
  readonly tryCount: PowerSize;
}

/** @name ClientParamsCreateIdentifyDoc */
export interface ClientParamsCreateIdentifyDoc extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly productId: Bytes;
  readonly contentHash: Hash;
  readonly goodsPrice: PowerSize;
  readonly identRate: PowerSize;
  readonly identConsistence: PowerSize;
  readonly cartId: Bytes;
}

/** @name ClientParamsCreateModel */
export interface ClientParamsCreateModel extends Struct {
  readonly appId: u32;
  readonly expertId: Bytes;
  readonly commodityName: Bytes;
  readonly commodityType: u32;
  readonly contentHash: Hash;
}

/** @name ClientParamsCreateModelDoc */
export interface ClientParamsCreateModelDoc extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly modelId: Bytes;
  readonly productId: Bytes;
  readonly contentHash: Hash;
  readonly producerCount: PowerSize;
  readonly productCount: PowerSize;
}

/** @name ClientParamsCreatePublishDoc */
export interface ClientParamsCreatePublishDoc extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly modelId: Bytes;
  readonly productId: Bytes;
  readonly contentHash: Hash;
  readonly paraIssueRate: PowerSize;
  readonly selfIssueRate: PowerSize;
}

/** @name ClientParamsCreateTryDoc */
export interface ClientParamsCreateTryDoc extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly productId: Bytes;
  readonly contentHash: Hash;
  readonly goodsPrice: PowerSize;
  readonly offsetRate: PowerSize;
  readonly trueRate: PowerSize;
  readonly cartId: Bytes;
}

/** @name CommentData */
export interface CommentData extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly commentId: Bytes;
  readonly commentHash: Hash;
  readonly commentFee: PowerSize;
  readonly commentTrend: u8;
}

/** @name CommentMaxRecord */
export interface CommentMaxRecord extends Struct {
  readonly maxCount: PowerSize;
  readonly maxFee: PowerSize;
  readonly maxPositive: PowerSize;
  readonly maxUnitFee: PowerSize;
}

/** @name CommentTrend */
export interface CommentTrend extends Enum {
  readonly isPositive: boolean;
  readonly isNegative: boolean;
  readonly isEmpty: boolean;
}

/** @name CommentWeightData */
export interface CommentWeightData extends Struct {
  readonly account: AccountId;
  readonly position: u64;
  readonly cashCost: PowerSize;
}

/** @name CommodityLeaderBoardData */
export interface CommodityLeaderBoardData extends Struct {
  readonly cartId: Bytes;
  readonly cartIdHash: Hash;
  readonly power: PowerSize;
  readonly owner: AccountId;
}

/** @name CommodityTypeData */
export interface CommodityTypeData extends Struct {
  readonly typeId: u32;
  readonly typeDesc: Bytes;
}

/** @name DocumentPower */
export interface DocumentPower extends Struct {
  readonly attend: PowerSize;
  readonly content: PowerSize;
  readonly judge: PowerSize;
}

/** @name DocumentPowerInfo */
export interface DocumentPowerInfo extends Struct {
  readonly docType: DocumentType;
  readonly power: PowerSize;
}

/** @name DocumentSpecificData */
export interface DocumentSpecificData extends Enum {
  readonly isProductPublish: boolean;
  readonly asProductPublish: KPProductPublishData;
  readonly isProductIdentify: boolean;
  readonly asProductIdentify: KPProductIdentifyData;
  readonly isProductTry: boolean;
  readonly asProductTry: KPProductTryData;
  readonly isProductChoose: boolean;
  readonly asProductChoose: KPProductChooseData;
  readonly isModelCreate: boolean;
  readonly asModelCreate: KPModelCreateData;
}

/** @name DocumentType */
export interface DocumentType extends Enum {
  readonly isProductPublish: boolean;
  readonly isProductIdentify: boolean;
  readonly isProductTry: boolean;
  readonly isProductChoose: boolean;
  readonly isModelCreate: boolean;
  readonly isUnknown: boolean;
}

/** @name KPCommentAccountRecord */
export interface KPCommentAccountRecord extends Struct {
  readonly count: PowerSize;
  readonly fees: PowerSize;
  readonly positiveCount: PowerSize;
}

/** @name KPCommentDataOf */
export interface KPCommentDataOf extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly commentId: Bytes;
  readonly commentHash: Hash;
  readonly commentFee: PowerSize;
  readonly commentTrend: u8;
  readonly sender: AccountId;
  readonly owner: AuthAccountId;
}

/** @name KPDocumentDataOf */
export interface KPDocumentDataOf extends Struct {
  readonly appId: u32;
  readonly documentId: Bytes;
  readonly modelId: Bytes;
  readonly productId: Bytes;
  readonly contentHash: Hash;
  readonly sender: AccountId;
  readonly owner: AuthAccountId;
  readonly documentType: DocumentType;
  readonly documentData: DocumentSpecificData;
  readonly commentCount: PowerSize;
  readonly commentTotalFee: PowerSize;
  readonly commentPositiveCount: PowerSize;
  readonly expertTrend: CommentTrend;
  readonly platformTrend: CommentTrend;
}

/** @name KPModelCreateData */
export interface KPModelCreateData extends Struct {
  readonly producerCount: PowerSize;
  readonly productCount: PowerSize;
}

/** @name KPModelCreateDataMax */
export interface KPModelCreateDataMax extends Struct {
  readonly producerCount: PowerSize;
  readonly productCount: PowerSize;
}

/** @name KPModelDataOf */
export interface KPModelDataOf extends Struct {
  readonly appId: u32;
  readonly modelId: Bytes;
  readonly expertId: Bytes;
  readonly status: ModelStatus;
  readonly commodityName: Bytes;
  readonly commodityType: u32;
  readonly contentHash: Hash;
  readonly sender: AccountId;
  readonly owner: AuthAccountId;
  readonly createReward: BalanceOf;
}

/** @name KPProductChooseData */
export interface KPProductChooseData extends Struct {
  readonly sellCount: PowerSize;
  readonly tryCount: PowerSize;
}

/** @name KPProductChooseDataMax */
export interface KPProductChooseDataMax extends Struct {
  readonly sellCount: PowerSize;
  readonly tryCount: PowerSize;
}

/** @name KPProductIdentifyData */
export interface KPProductIdentifyData extends Struct {
  readonly goodsPrice: PowerSize;
  readonly identRate: PowerSize;
  readonly identConsistence: PowerSize;
  readonly cartId: Bytes;
}

/** @name KPProductIdentifyRateMax */
export interface KPProductIdentifyRateMax extends Struct {
  readonly identRate: PowerSize;
  readonly identConsistence: PowerSize;
}

/** @name KPProductPublishData */
export interface KPProductPublishData extends Struct {
  readonly paraIssueRate: PowerSize;
  readonly selfIssueRate: PowerSize;
}

/** @name KPProductPublishRateMax */
export interface KPProductPublishRateMax extends Struct {
  readonly paraIssueRate: PowerSize;
  readonly selfIssueRate: PowerSize;
}

/** @name KPProductTryData */
export interface KPProductTryData extends Struct {
  readonly goodsPrice: PowerSize;
  readonly offsetRate: PowerSize;
  readonly trueRate: PowerSize;
  readonly cartId: Bytes;
}

/** @name KPProductTryRateMax */
export interface KPProductTryRateMax extends Struct {
  readonly offsetRate: PowerSize;
  readonly trueRate: PowerSize;
}

/** @name LeaderBoardItem */
export interface LeaderBoardItem extends Struct {
  readonly cartId: Bytes;
  readonly power: PowerSize;
  readonly owner: AccountId;
}

/** @name LeaderBoardItemRPC */
export interface LeaderBoardItemRPC extends Struct {
  readonly cart_id: Bytes;
  readonly power: PowerSize;
  readonly owner: AccountId;
}

/** @name LeaderBoardResult */
export interface LeaderBoardResult extends Struct {
  readonly accounts: Vec<AccountId>;
  readonly board: Vec<LeaderBoardItem>;
}

/** @name LeaderBoardResultRPC */
export interface LeaderBoardResultRPC extends Struct {
  readonly accounts: Vec<AccountId>;
  readonly board: Vec<LeaderBoardItemRPC>;
}

/** @name ModelCycleIncomeReward */
export interface ModelCycleIncomeReward extends Struct {
  readonly account: AccountId;
  readonly appId: u32;
  readonly modelId: Bytes;
  readonly reward: BalanceOf;
}

/** @name ModelDisputeType */
export interface ModelDisputeType extends Enum {
  readonly isNoneIntendNormal: boolean;
  readonly isIntendNormal: boolean;
  readonly isSerious: boolean;
}

/** @name ModelExpertAddMemberParams */
export interface ModelExpertAddMemberParams extends Struct {
  readonly appId: u32;
  readonly modelId: Bytes;
  readonly kptProfitRate: u32;
}

/** @name ModelExpertDelMemberParams */
export interface ModelExpertDelMemberParams extends Struct {
  readonly appId: u32;
  readonly modelId: Bytes;
  readonly member: AccountId;
}

/** @name ModelIncome */
export interface ModelIncome extends Struct {
  readonly modelId: Bytes;
  readonly income: u64;
}

/** @name ModelIncomeCollectingParam */
export interface ModelIncomeCollectingParam extends Struct {
  readonly appId: u32;
  readonly modelIds: Vec<Bytes>;
  readonly incomes: Vec<u64>;
}

/** @name ModelIncomeCurrentStageRPC */
export interface ModelIncomeCurrentStageRPC extends Struct {
  readonly stage: u8;
  readonly left: BlockNumber;
}

/** @name ModelStatus */
export interface ModelStatus extends Enum {
  readonly isEnabled: boolean;
  readonly isDisabled: boolean;
}

/** @name PowerSize */
export interface PowerSize extends u64 {}

/** @name QueryCommodityPowerParams */
export interface QueryCommodityPowerParams extends Struct {
  readonly appId: u32;
  readonly cartId: Bytes;
}

/** @name QueryDocumentPowerParams */
export interface QueryDocumentPowerParams extends Struct {
  readonly appId: u32;
  readonly docId: Bytes;
}

/** @name QueryLeaderBoardParams */
export interface QueryLeaderBoardParams extends Struct {
  readonly appId: u32;
  readonly modelId: Bytes;
  readonly block: u32;
}

/** @name QueryModelExpertParams */
export interface QueryModelExpertParams extends Struct {
  readonly appId: u32;
  readonly modelId: Bytes;
}

/** @name QueryPlatformExpertParams */
export interface QueryPlatformExpertParams extends Struct {
  readonly appId: u32;
}

/** @name StableExchangeData */
export interface StableExchangeData extends Struct {
  readonly receiver: AccountId;
  readonly amount: BalanceOf;
  readonly redeemed: bool;
}

/** @name StakeToVoteParams */
export interface StakeToVoteParams extends Struct {
  readonly account: AccountId;
  readonly stake: u64;
}

/** @name StakeToVoteResult */
export interface StakeToVoteResult extends Struct {
  readonly result: u64;
}

/** @name TechFundWithdrawData */
export interface TechFundWithdrawData extends Struct {
  readonly account: AccountId;
  readonly amount: BalanceOf;
  readonly devLevel: TechFundWithdrawLevel;
  readonly devType: TechFundWithdrawType;
  readonly reason: Hash;
}

/** @name TechFundWithdrawLevel */
export interface TechFundWithdrawLevel extends Enum {
  readonly isLv1: boolean;
  readonly isLv2: boolean;
  readonly isLv3: boolean;
  readonly isLv4: boolean;
  readonly isLv5: boolean;
}

/** @name TechFundWithdrawType */
export interface TechFundWithdrawType extends Enum {
  readonly isChainDev: boolean;
  readonly isTctp: boolean;
  readonly isModel: boolean;
  readonly isKnowledge: boolean;
  readonly isChainAdmin: boolean;
}

export type PHANTOM_KP = 'kp';
