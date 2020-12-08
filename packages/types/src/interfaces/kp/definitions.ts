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
    }
  },

  types: {
    PowerSize: 'u64',
    AccountID32: 'AccountId',
    AuthAccountId: 'AccountId',

    AppData: {
      name: 'Vec<u8>',
      returnRate: 'u32',
    },

    StableExchangeData: {
      receiver: 'AccountId',
      amount: 'BalanceOf',
      redeemed: 'bool',
    },

    AppFinancedData: {
      amount: 'BalanceOf',
      exchangeRate: 'BalanceOf',
    },

    CommentMaxRecord: {
      maxCount: 'PowerSize',
      maxFee: 'PowerSize',
      maxPositive: 'PowerSize',
      maxUnitFee: 'PowerSize'
    },

    KPProductChooseDataMax: {
      sellCount: 'PowerSize',
      tryCount: 'PowerSize'
    },

    KPProductIdentifyRateMax: {
      identRate: 'PowerSize',
      identConsistence: 'PowerSize'
    },

    CommentWeightData: {
      account: 'AccountId',
      position: 'u64',
      cashCost: 'PowerSize'
    },

    KPModelCreateDataMax: {
      producerCount: 'PowerSize',
      productCount: 'PowerSize'
    },

    KPProductPublishRateMax: {
      paraIssueRate: 'PowerSize',
      selfIssueRate: 'PowerSize'
    },

    KPProductTryRateMax: {
      offsetRate: 'PowerSize',
      trueRate: 'PowerSize'
    },

    KPCommentAccountRecord: {
      count: 'PowerSize',
      fees: 'PowerSize',
      positiveCount: 'PowerSize'
    },

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

    DocumentSpecificData: {
      _enum: {
        ProductPublish: 'KPProductPublishData',
        ProductIdentify: 'KPProductIdentifyData',
        ProductTry: 'KPProductTryData',
        ProductChoose: 'KPProductChooseData',
        ModelCreate: 'KPModelCreateData'
      }
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
      owner: 'AuthAccountId'
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
      board: 'Vec<LeaderBoardItem>'
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
    }
  }
} as Definitions;
