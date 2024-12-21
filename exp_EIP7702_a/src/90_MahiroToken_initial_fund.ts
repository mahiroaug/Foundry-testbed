import { createWalletClient, encodeFunctionData,http,parseEther } from 'viem'
import { owner, ray, alice, bob, carol, dave, eve } from './config'
import { abi, contractAddress } from './contract'
import { eip7702Actions } from 'viem/experimental';
import { anvil } from 'viem/chains';
import { ethers } from 'ethers';


//-----------------------------------------------------------------------------
//  delegate    
//-----------------------------------------------------------------------------
const delegate = ray;

//-----------------------------------------------------------------------------
//  recipient
//-----------------------------------------------------------------------------
const recipients = [alice, bob, carol, dave, eve];


//-----------------------------------------------------------------------------
//  owner
//-----------------------------------------------------------------------------
const walletClient_owner = createWalletClient({
    account: owner,
    chain: anvil,
    transport: http(),
}).extend(eip7702Actions())

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

    const authorization = await walletClient_owner.signAuthorization({
      contractAddress,
      delegate,
    })
    
    const transferData = recipients.map(recipient => ({
        data: encodeFunctionData({
            abi: tokenAbi,
            functionName: 'transfer', 
            args: [recipient.address, ethers.parseEther("100")],
        }),
        to: tokenContract,
        value: BigInt(0),
    }));

    const data = encodeFunctionData({
      abi,
      functionName: 'execute', 
      args: [transferData], 
    })

    const hash = await walletClient_owner.sendTransaction({ 
      account: delegate, 
      authorizationList: [authorization], 
      to: walletClient_owner.account.address, 
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