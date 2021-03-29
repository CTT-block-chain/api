// Copyright 2017-2020 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

// order important in structs... :)
/* eslint-disable sort-keys */

import { Definitions } from '../../types';

export default {
  rpc: {
    totalPower: {
      description: 'Get current total knowledge power.',
      params: [],
      type: 'PowerSize'
    },

    accountPower: {
      description: 'Get account knowledge power.',
      params: [
        {
          name: 'account',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'PowerSize'
    },

    powerRatio: {
      description: 'Get account knowledge power ratio.',
      params: [
        {
          name: 'account',
          type: 'AccountId'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'u64'
    },

    commodityPower: {
      description: 'Get commodify knowledge power.',
      params: [
        {
          name: 'query',
          type: 'QueryCommodityPowerParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'PowerSize'
    },

    isCommodityInBlackList: {
      description: 'Check if commodify knowledge power in black list.',
      params: [
        {
          name: 'query',
          type: 'QueryCommodityPowerParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'bool'
    },

    documentPower: {
      description: 'Get document knowledge power.',
      params: [
        {
          name: 'query',
          type: 'QueryDocumentPowerParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'DocumentPowerInfo'
    },

    isCommodityPowerExist: {
      description: 'Check if commodify knowledge power exist.',
      params: [
        {
          name: 'query',
          type: 'QueryCommodityPowerParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'bool'
    },

    leaderBoardResult: {
      description: 'read power leader board result.',
      params: [
        {
          name: 'query',
          type: 'QueryLeaderBoardParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'LeaderBoardResult'
    },

    stakeToVote: {
      description: 'convert balance to vote weight according accuont kp.',
      params: [
        {
          name: 'params',
          type: 'StakeToVoteParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        },
      ],
      type: 'StakeToVoteResult'
    },

    modelIncomeCurrentStage: {
      description: 'get current model income/reward stage.',
      params: [
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'ModelIncomeCurrentStageRPC'
    },

    appFinanceRecord: {
      description: 'get app finance record.',
      params: [
        {
          name: 'params',
          type: 'AppFinanceRecordParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'AppFinanceDataRPC'
    },

    appFinanceExchangeAccounts: {
      description: 'get app finance exchange record accounts.',
      params: [
        {
          name: 'params',
          type: 'AppFinanceRecordParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        },
      ],
      type: 'Vec<AccountId>'
    },

    appFinanceExchangeData: {
      description: 'get app finance exchange data.',
      params: [
        {
          name: 'params',
          type: 'AppFinanceExchangeDataParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        },
      ],
      type: 'AppFinanceExchangeDataRPC'
    },

    modelDeposit: {
      description: 'get model deposit.',
      params: [
        {
          name: 'params',
          type: 'QueryModelParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'u64'
    },

    appIncomeRecord: {
      description: 'get app cycle income record.',
      params: [
        {
          name: 'params',
          type: 'AppIncomeRecordParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'AppIncomeDataRPC'
    },

    appIncomeExchangeAccounts: {
      description: 'get app income exchange record accounts.',
      params: [
        {
          name: 'params',
          type: 'AppIncomeRecordParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'Vec<AccountId>'
    },

    appIncomeExchangeData: {
      description: 'get app income exchange data.',
      params: [
        {
          name: 'params',
          type: 'AppIncomeExchangeDataParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'AppFinanceExchangeDataRPC'
    }
  },

  types: {
    PowerSize: 'u64',
    AccountID32: 'AccountId',
    AuthAccountId: 'AccountId',

    KPProductPublishData: {
      paraIssueRate: 'PowerSize',
      selfIssueRate: 'PowerSize'
    },

    KPProductIdentifyData: {
      goodsPrice: 'PowerSize',
      identRate: 'PowerSize',
      identConsistence: 'PowerSize',
      cartId: 'Vec<u8>'
    },

    KPProductTryData: {
      goodsPrice: 'PowerSize',
      offsetRate: 'PowerSize',
      trueRate: 'PowerSize',
      cartId: 'Vec<u8>'
    },

    KPProductChooseData: {
      sellCount: 'PowerSize',
      tryCount: 'PowerSize'
    },

    KPModelCreateData: {
      producerCount: 'PowerSize',
      productCount: 'PowerSize'
    },

    LeaderBoardItem: {
      cartId: 'Vec<u8>',
      power: 'PowerSize',
      owner: 'AccountId'
    },

    LeaderBoardItemRPC: {
      cart_id: 'Bytes',
      power: 'PowerSize',
      owner: 'AccountId'
    },

    LeaderBoardResultRPC: {
      accounts: 'Vec<AccountId>',
      board: 'Vec<LeaderBoardItemRPC>'
    },

    ModelStatus: {
      _enum: ['ENABLED', 'DISABLED']
    },

    DocumentType: {
      _enum: ['ProductPublish', 'ProductIdentify', 'ProductTry', 'ProductChoose', 'ModelCreate', 'Unknown']
    },

    CommentTrend: {
      _enum: ['Positive', 'Negative', 'Empty']
    },

    ModelDisputeType: {
      _enum: ['NoneIntendNormal', 'IntendNormal', 'Serious']
    },

    TechFundWithdrawType: {
      _enum: ['ChainDev', 'Tctp', 'Model', 'Knowledge', 'ChainAdmin']
    },

    TechFundWithdrawLevel: {
      _enum: ['LV1', 'LV2', 'LV3', 'LV4', 'LV5']
    },

    DocumentSpecificData: {
      _enum: {
        ProductPublish: 'KPProductPublishData',
        ProductIdentify: 'KPProductIdentifyData',
        ProductTry: 'KPProductTryData',
        ProductChoose: 'KPProductChooseData',
        ModelCreate: 'KPModelCreateData'
      },
    },

    KPDocumentDataOf: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      modelId: 'Vec<u8>',
      productId: 'Vec<u8>',
      contentHash: 'Hash',
      sender: 'AccountId',
      owner: 'AuthAccountId',
      documentType: 'DocumentType',
      documentData: 'DocumentSpecificData',
      commentCount: 'PowerSize',
      commentTotalFee: 'PowerSize',
      commentPositiveCount: 'PowerSize',
      expertTrend: 'CommentTrend',
      platformTrend: 'CommentTrend'
    },

    KPModelDataOf: {
      appId: 'u32',
      modelId: 'Vec<u8>',
      expertId: 'Vec<u8>',
      status: 'ModelStatus',
      commodityName: 'Vec<u8>',
      commodityType: 'u32',
      contentHash: 'Hash',
      sender: 'AccountId',
      owner: 'AuthAccountId',
      createReward: 'BalanceOf'
    },

    KPCommentDataOf: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      commentId: 'Vec<u8>',
      commentHash: 'Hash',
      commentFee: 'PowerSize',
      commentTrend: 'u8',
      sender: 'AccountId',
      owner: 'AuthAccountId'
    },

    DocumentPower: {
      attend: 'PowerSize',
      content: 'PowerSize',
      judge: 'PowerSize'
    },

    QueryCommodityPowerParams: {
      appId: 'u32',
      cartId: 'Bytes'
    },

    QueryPlatformExpertParams: {
      appId: 'u32'
    },

    QueryModelExpertParams: {
      appId: 'u32',
      modelId: 'Bytes'
    },

    CommodityTypeData: {
      typeId: 'u32',
      typeDesc: 'Vec<u8>'
    },

    QueryLeaderBoardParams: {
      appId: 'u32',
      modelId: 'Bytes',
      block: 'u32'
    },

    LeaderBoardResult: {
      accounts: 'Vec<AccountId>',
      board: 'Vec<LeaderBoardItem>',
    },

    CommodityLeaderBoardData: {
      cartId: 'Vec<u8>',
      cartIdHash: 'T::Hash',
      power: 'PowerSize',
      owner: 'AccountId'
    },

    StakeToVoteParams: {
      account: 'AccountId',
      stake: 'u64'
    },

    StakeToVoteResult: {
      result: 'u64'
    },

    AppFinancedProposalParams: {
      account: 'AccountId',
      appId: 'u32',
      proposalId: 'Vec<u8>',
      exchange: 'Balance',
      amount: 'Balance'
    },

    AppFinancedUserExchangeParams: {
      account: 'AccountId',
      appId: 'u32',
      proposalId: 'Vec<u8>',
      exchangeAmount: 'Balance'
    },

    AppFinanceRecordParams: {
      appId: 'u32',
      proposalId: 'Bytes'
    },

    AppFinanceExchangeDataParams: {
      appId: 'u32',
      proposalId: 'Bytes',
      account: 'AccountId'
    },

    AppFinanceExchangeDataRPC: {
      exchangeAmount: 'u64',
      status: 'u8', // 0: initial state, 1: reserved, 2: received cash and burned
      payId: 'Bytes'
    },

    AppFinancedUserExchangeConfirmParams: {
      account: 'AccountId',
      appId: 'u32',
      payId: 'Vec<u8>',
      proposalId: 'Vec<u8>'
    },

    AppFinancedData: {
      appId: 'u32',
      proposalId: 'Vec<u8>',
      amount: 'Balance',
      exchange: 'Balance',
      block: 'BlockNumber',
      totalBalance: 'Balance',
      exchanged: 'Balance',
      exchangeEndBlock: 'BlockNumber'
    },

    AppFinanceDataRPC: {
      amount: 'u64',
      exchange: 'u64',
      block: 'BlockNumber',
      totalBalance: 'u64',
      exchanged: 'u64',
      exchangeEndBlock: 'BlockNumber'
    },

    CommentData: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      commentId: 'Vec<u8>',
      commentHash: 'Hash',
      commentFee: 'PowerSize',
      commentTrend: 'u8'
    },

    AddAppParams: {
      appType: 'Vec<u8>',
      appName: 'Vec<u8>',
      appKey: 'AccountId',
      appAdminKey: 'AccountId',
      returnRate: 'u32',
    },

    ClientParamsCreateModel: {
      appId: 'u32',
      expertId: 'Vec<u8>',
      commodityName: 'Vec<u8>',
      commodityType: 'u32',
      contentHash: 'Hash'
    },

    AuthParamsCreateModel: {
      modelId: 'Vec<u8>'
    },

    ClientParamsCreatePublishDoc: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      modelId: 'Vec<u8>',
      productId: 'Vec<u8>',
      contentHash: 'Hash',
      paraIssueRate: 'PowerSize',
      selfIssueRate: 'PowerSize'
    },

    ClientParamsCreateIdentifyDoc: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      productId: 'Vec<u8>',
      contentHash: 'Hash',
      goodsPrice: 'PowerSize',
      identRate: 'PowerSize',
      identConsistence: 'PowerSize',
      cartId: 'Vec<u8>'
    },

    ClientParamsCreateTryDoc: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      productId: 'Vec<u8>',
      contentHash: 'Hash',
      goodsPrice: 'PowerSize',
      offsetRate: 'PowerSize',
      trueRate: 'PowerSize',
      cartId: 'Vec<u8>'
    },

    ClientParamsCreateChooseDoc: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      modelId: 'Vec<u8>',
      productId: 'Vec<u8>',
      contentHash: 'Hash',
      sellCount: 'PowerSize',
      tryCount: 'PowerSize'
    },

    ClientParamsCreateModelDoc: {
      appId: 'u32',
      documentId: 'Vec<u8>',
      modelId: 'Vec<u8>',
      productId: 'Vec<u8>',
      contentHash: 'Hash',
      producerCount: 'PowerSize',
      productCount: 'PowerSize'
    },

    ModelExpertAddMemberParams: {
      appId: 'u32',
      modelId: 'Vec<u8>',
      kptProfitRate: 'u32'
    },

    ModelExpertDelMemberParams: {
      appId: 'u32',
      modelId: 'Vec<u8>',
      member: 'AccountId'
    },

    AppData: {
      name: 'Vec<u8>',
      returnRate: 'u32',
      stake: 'Balance'
    },

    ModelIncome: {
      modelId: 'Vec<u8>',
      income: 'u64',
    },

    ModelIncomeCollectingParam: {
      appId: 'u32',
      modelIds: 'Vec<Vec<u8>>',
      incomes: 'Vec<u64>'
    },

    ModelIncomeCurrentStageRPC: {
      stage: 'u8',
      left: 'BlockNumber'
    },

    ModelCycleIncomeReward: {
      account: 'AccountId',
      appId: 'u32',
      modelId: 'Vec<u8>',
      reward: 'BalanceOf'
    },

    DocumentPowerInfo: {
      docType: 'DocumentType',
      power: 'PowerSize',
      isExist: 'bool',
      isSlashed: 'bool'
    },

    AccountStatistics: {
      createCommodityNum: 'u32',
      slashCommodityNum: 'u32',
      slashKpTotal: 'u64',
      commentNum: 'u32',
      commentCostTotal: 'u64',
      commentCostMax: 'u64',
      commentPositiveTrendNum: 'u32',
      commentNegativeTrendNum: 'u32'
    },

    CommentMaxRecord: {
      maxCount: 'PowerSize',
      maxFee: 'PowerSize',
      maxPositive: 'PowerSize',
      // for document, this is the max of document's total comment cost/count
      // for account, this is the max of account's total comment fees/count
      maxUnitFee: 'PowerSize'
    },

    CommentWeightData: {
      account: 'AccountId',
      position: 'u64',
      cashCost: 'PowerSize',
    },

    KPCommentAccountRecord: {
      count: 'PowerSize',
      fees: 'PowerSize',
      positiveCount: 'PowerSize'
    },

    KPModelCreateDataMax: {
      producerCount: 'PowerSize',
      productCount: 'PowerSize'
    },

    KPProductChooseDataMax: {
      sellCount: 'PowerSize',
      tryCount: 'PowerSize'
    },

    KPProductIdentifyRateMax: {
      identRate: 'PowerSize',
      identConsistence: 'PowerSize'
    },

    KPProductPublishRateMax: {
      paraIssueRate: 'PowerSize',
      selfIssueRate: 'PowerSize'
    },

    KPProductTryRateMax: {
      offsetRate: 'PowerSize',
      trueRate: 'PowerSize'
    },

    StableExchangeData: {
      receiver: 'AccountId',
      amount: 'BalanceOf',
      redeemed: 'bool'
    },

    AppFinancedUserExchangeData: {
      exchangeAmount: 'Balance',
      status: 'u8', // 0: initial state, 1: reserved, 2: received cash and burned
      payId: 'Vec<u8>'
    },

    QueryDocumentPowerParams: {
      appId: 'u32',
      docId: 'Bytes'
    },

    TechFundWithdrawData: {
      account: 'AccountId',
      amount: 'BalanceOf',
      devLevel: 'TechFundWithdrawLevel',
      devType: 'TechFundWithdrawType',
      reason: 'Hash'
    },

    MiscDocumentPowerParams: {
      appId: 'u32',
      documentId: 'Bytes'
    },

    AppKeyManageParams: {
      admin: 'AuthAccountId',
      appId: 'u32',
      member: 'AccountId'
    },

    QueryModelParams: {
      appId: 'u32',
      modelId: 'Bytes'
    },

    CommoditySlashRecord: {
      appId: 'u32',
      commentId: 'Vec<u8>',
      cartId: 'Vec<u8>',
      block: 'BlockNumber'
    },

    ModelDisputeRecord: {
      appId: 'u32',
      modelId: 'Bytes',
      commentId: 'Bytes',
      disputeType: 'ModelDisputeType',
      block: 'BlockNumber'
    },

    AppIncomeCycleRecord: {
      initial: 'BalanceOf',
      balance: 'BalanceOf',
      cycle: 'BlockNumber',
      appId: 'u32',
      income: 'u64'
    },

    AppIncomeRecordParams: {
      appId: 'u32',
      cycle: 'BlockNumber'
    },

    AppIncomeExchangeDataParams: {
      appId: 'u32',
      cycle: 'BlockNumber',
      account: 'AccountId'
    },

    AppIncomeRedeemParams: {
      account: 'AccountId',
      appId: 'u32',
      cycle: 'BlockNumber',
      exchangeAmount: 'BalanceOf'
    },

    AppIncomeRedeemConfirmParams: {
      account: 'AccountId',
      appId: 'u32',
      payId: 'Vec<u8>',
      cycle: 'BlockNumber'
    },

    DisableModelParams: {
      app_id: 'u32',
      model_id: 'Vec<u8>'
    },

    AppIncomeDataRPC: {
      app_id: 'u32',
      cycle: 'BlockNumber',
      income: 'u64'
    },

    ModelKeyParams: {
      appId: 'u32',
      modelId: 'Vec<u8>'
    },

    FinanceMemberParams: {
      deposit: 'BalanceOf',
      member: 'AccountId'
    }
  }
} as Definitions;
