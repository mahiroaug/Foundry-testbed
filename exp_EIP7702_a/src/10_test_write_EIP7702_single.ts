import { parseEther } from 'viem'
import { addresses, alice, bob, carol, dave, eve, walletClient } from './config'
import { abi, contractAddress } from './contract'
 
async function executeTransactions() {
  try {
    if (!contractAddress) {
      throw new Error('Contract address is not defined');
    }

    console.log('contractAddres    :', contractAddress)
    console.log('walletClient.acc  :', walletClient.account.address)
    console.log('alice.address     :', alice.address)
    console.log('bob.address       :', bob.address)
    console.log('carol.address     :', carol.address)
    console.log('dave.address      :', dave.address)
    console.log('eve.address       :', eve.address)

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
          to: dave.address,
          value: parseEther('0.1'),  
        }, { 
          data: '0x', 
          to: eve.address,
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