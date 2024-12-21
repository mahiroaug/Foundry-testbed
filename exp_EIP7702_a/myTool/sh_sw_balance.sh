#!/bin/bash

# 各アカウントの残高を確認
ACCOUNTS=(
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
)

i=0
for address in "${ACCOUNTS[@]}"; do
    balance=$(cast balance $address --ether)
    echo "No.$i Addr: $address  Balance: $balance ETH"
    i=$((i+1))
done