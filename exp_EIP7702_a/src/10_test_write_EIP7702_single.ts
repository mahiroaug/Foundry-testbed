import { parseEther } from 'viem'
import { walletClient } from './config'
import { abi, contractAddress } from './contract'
 
async function executeTransactions() {
  try {
    const authorization = await walletClient.signAuthorization({
      contractAddress,
    })
    
    const hash = await walletClient.writeContract({ 
      abi, 
      address: walletClient.account.address, 
      functionName: 'execute', 
      args: [[ 
        { 
          data: '0x', 
          to: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',  
          value: parseEther('0.1'),  
        }, { 
          data: '0x', 
          to: '0x90F79bf6EB2c4f870365E785982E1f101E93b906',  
          value: parseEther('0.2'),  
        } 
      ]], 
      authorizationList: [authorization], 
    })

    console.log('success TxID:', hash)
    return hash
  } catch (error) {
    console.error('error:', error)
    throw error
  }
}

executeTransactions()