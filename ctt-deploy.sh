#!/bin/bash

cp -fr ./packages/api/build/* $1/node_modules/@polkadot/api/
cp -fr ./packages/api-contract/build/* $1/node_modules/@polkadot/api-contract/
cp -fr ./packages/api-derive/build/* $1/node_modules/@polkadot/api-derive/
cp -fr ./packages/metadata/build/* $1/node_modules/@polkadot/metadata/
cp -fr ./packages/rpc-core/build/* $1/node_modules/@polkadot/rpc-core/
cp -fr ./packages/rpc-provider/build/* $1/node_modules/@polkadot/rpc-provider/
cp -fr ./packages/types/build/* $1/node_modules/@polkadot/types/
cp -fr ./packages/types-known/build/* $1/node_modules/@polkadot/types-known/
