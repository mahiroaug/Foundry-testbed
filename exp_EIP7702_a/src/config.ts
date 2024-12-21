import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'
 
import dotenv from 'dotenv';
dotenv.config();

export const addresses = {
  account0: process.env.ACCOUNT_0,
  account1: process.env.ACCOUNT_1,
  account2: process.env.ACCOUNT_2,
  account3: process.env.ACCOUNT_3,
  account4: process.env.ACCOUNT_4,
  account5: process.env.ACCOUNT_5,
  account6: process.env.ACCOUNT_6,
  account7: process.env.ACCOUNT_7,
  account8: process.env.ACCOUNT_8,
  account9: process.env.ACCOUNT_9,
};

export const privateKeys = {
  privateKey0: process.env.PRIVATE_KEY_0,
  privateKey1: process.env.PRIVATE_KEY_1,
  privateKey2: process.env.PRIVATE_KEY_2,
  privateKey3: process.env.PRIVATE_KEY_3,
  privateKey4: process.env.PRIVATE_KEY_4,
  privateKey5: process.env.PRIVATE_KEY_5,
  privateKey6: process.env.PRIVATE_KEY_6,
  privateKey7: process.env.PRIVATE_KEY_7,
  privateKey8: process.env.PRIVATE_KEY_8,
  privateKey9: process.env.PRIVATE_KEY_9,
};


export const owner = privateKeyToAccount(privateKeys.privateKey0 as `0x${string}`)
export const ray   = privateKeyToAccount(privateKeys.privateKey1 as `0x${string}`)
export const alice = privateKeyToAccount(privateKeys.privateKey5 as `0x${string}`)
export const bob   = privateKeyToAccount(privateKeys.privateKey6 as `0x${string}`)
export const carol = privateKeyToAccount(privateKeys.privateKey7 as `0x${string}`)
export const dave  = privateKeyToAccount(privateKeys.privateKey8 as `0x${string}`)
export const eve   = privateKeyToAccount(privateKeys.privateKey9 as `0x${string}`)
 
export const walletClient = createWalletClient({
  account: alice,
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())