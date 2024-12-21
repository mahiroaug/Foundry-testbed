#!/bin/bash

export $(grep -v '^#' .env | xargs)

ACCOUNTS=(
    "$CA_BATCH_CALL_DELEGATION"
)

i=0
for address in "${ACCOUNTS[@]}"; do
    balance=$(cast balance $address --ether)
    echo "No.$i Addr: $address  Balance: $balance ETH"
    i=$((i+1))
done