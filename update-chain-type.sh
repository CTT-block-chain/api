#!/bin/bash

mkdir out
echo "read remote chain info"
yarn polkadot-types-from-chain --endpoint=ws://39.106.116.92:9944 --output=./out/

echo "start copying"
cp ./out/augment-api-consts.ts ./packages/api/src/augment/consts.ts
cp ./out/augment-api-query.ts ./packages/api/src/augment/query.ts
cp ./out/augment-api-tx.ts ./packages/api/src/augment/tx.ts

rm -fr ./out
echo "process success!"
