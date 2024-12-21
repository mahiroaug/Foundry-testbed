import { createWalletClient, http } from 'viem'
import { anvil } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'
import { eip7702Actions } from 'viem/experimental'
 
export const account = privateKeyToAccount('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d')
 
export const walletClient = createWalletClient({
  account,
  chain: anvil,
  transport: http(),
}).extend(eip7702Actions())