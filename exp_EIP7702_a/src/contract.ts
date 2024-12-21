import dotenv from 'dotenv';
dotenv.config();

export const abi = [
  {
    "type": "function",
    "name": "execute",
    "inputs": [
      {
        "name": "calls",
        "type": "tuple[]",
        "components": [
          {
            "name": "data",
            "type": "bytes",
          },
          {
            "name": "to",
            "type": "address",
          },
          {
            "name": "value",
            "type": "uint256",
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "payable"
  },
] as const
 
export const CA_BATCH_CALL_DELEGATION = process.env.CA_BATCH_CALL_DELEGATION as `0x${string}`;
export const contractAddress = CA_BATCH_CALL_DELEGATION;