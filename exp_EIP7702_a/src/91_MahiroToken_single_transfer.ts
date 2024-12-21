/**
 * Usage:
 * To execute the token transfer, run the script with the following command:
 * tsx 91_MahiroToken_single_transfer.js <sender> <recipient>
 * 
 * Replace <sender> and <recipient> with one of the following names:
 * alice, bob, carol, dave, eve
 * 
 * Example:
 * tsx 91_MahiroToken_single_transfer.js alice bob
 */

import { createWalletClient, encodeFunctionData,http,parseEther } from 'viem'
import { owner, ray, alice, bob, carol, dave, eve } from './config'
import { abi, contractAddress } from './contract'
import { eip7702Actions } from 'viem/experimental';
import { anvil } from 'viem/chains';
import { ethers } from 'ethers';

const accounts = [alice, bob, carol, dave, eve];

//----------------------------------------------------------------------------
//  args
//-----------------------------------------------------------------------------
const args = process.argv.slice(2);
const senderName = args[0];
const recipientName = args[1];

const validNames = ['alice', 'bob', 'carol', 'dave', 'eve'];
if (!validNames.includes(senderName) || !validNames.includes(recipientName)) {
    throw new Error('Invalid sender or recipient. Please choose from alice, bob, carol, dave, eve.');
}
const senderIndex = validNames.indexOf(senderName);
const recipientIndex = validNames.indexOf(recipientName);

console.log("sender No.:", senderIndex+5, "  recipient No.:", recipientIndex+5)


//-----------------------------------------------------------------------------
//  recipient
//-----------------------------------------------------------------------------
const recipient = accounts[recipientIndex];

//-----------------------------------------------------------------------------
//  sender
//-----------------------------------------------------------------------------
const walletClient_sender = createWalletClient({
    account: accounts[senderIndex],
    chain: anvil,
    transport: http(),
}).extend(eip7702Actions())


//-----------------------------------------------------------------------------
//  delegate    
//-----------------------------------------------------------------------------
const delegate = ray;



//-----------------------------------------------------------------------------
//  MahiroToken
//-----------------------------------------------------------------------------
const tokenContract = process.env.CA_TOKEN as `0x${string}`;
const tokenAbi = [
    {
        "constant": false,
        "inputs": [
            { "name": "to", "type": "address" },
            { "name": "value", "type": "uint256" }
        ],
        "name": "transfer",
        "outputs": [{ "name": "", "type": "bool" }],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

//-----------------------------------------------------------------------------
//  executeTransactions
//-----------------------------------------------------------------------------
async function executeTransactions() {
  try {
    if (!contractAddress) {
      throw new Error('Contract address is not defined');
    }

    const authorization = await walletClient_sender.signAuthorization({
      contractAddress,
      delegate,
    })
    
    const transferData = [{
        data: encodeFunctionData({
            abi: tokenAbi,
            functionName: 'transfer', 
            args: [recipient.address, ethers.parseEther("1")],
        }),
        to: tokenContract,
        value: BigInt(0),
    }];

    const data = encodeFunctionData({
      abi,
      functionName: 'execute', 
      args: [transferData],
    })

    const hash = await walletClient_sender.sendTransaction({ 
      account: delegate, 
      authorizationList: [authorization], 
      to: walletClient_sender.account.address, 
      data: data,
    })

    console.log('success TxID:', hash)
    return hash
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

executeTransactions()