// Copyright 2017-2020 @polkadot/types authors & contributors
// SPDX-License-Identifier: Apache-2.0

// order important in structs... :)
/* eslint-disable sort-keys */

import { Definitions } from '../../types';

export default {
  rpc: {
    isPlatformExpert: {
      description: 'check if account be platform expert',
      params: [
        {
          name: 'account',
          type: 'AccountId'
        },
        {
          name: 'query',
          type: 'QueryPlatformExpertParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'bool'
    },
    isModelExpert: {
      description: 'check if account be model expert',
      params: [
        {
          name: 'account',
          type: 'AccountId'
        },
        {
          name: 'query',
          type: 'QueryModelExpertParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        },
      ],
      type: 'bool'
    },
    isModelCreator: {
      description: 'check if account be model creator',
      params: [
        {
          name: 'account',
          type: 'AccountId'
        },
        {
          name: 'query',
          type: 'QueryModelExpertParams'
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true
        }
      ],
      type: 'bool',
    }
  },

  types: {}
} as Definitions;
