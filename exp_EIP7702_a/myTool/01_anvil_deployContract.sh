#!/bin/bash

export $(grep -v '^#' .env | xargs)
PRIVATE_KEY=$PRIVATE_KEY_0

cd /workspaces/Foundry-testbed/exp_EIP7702_a
forge script script/Deploy_BatchCallDel.s.sol:DeployScript --rpc-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
forge script script/Deploy_MahiroToken.s.sol:DeployScript --rpc-url http://localhost:8545 --private-key $PRIVATE_KEY --broadcast
