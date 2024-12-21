import { ethers, getDefaultProvider } from 'ethers';
import dotenv from 'dotenv';
dotenv.config();

const provider = getDefaultProvider("http://localhost:8545/");

const ACCOUNTS = [
    process.env.ACCOUNT_0,
    process.env.ACCOUNT_1,
    process.env.ACCOUNT_2,
    process.env.ACCOUNT_3,
    process.env.ACCOUNT_4,
    process.env.ACCOUNT_5,
    process.env.ACCOUNT_6,
    process.env.ACCOUNT_7,
    process.env.ACCOUNT_8,
    process.env.ACCOUNT_9,
];

async function showTokenBalances() {
    for (const address of ACCOUNTS) {
        if (!address) {
            throw new Error("Account address is undefined.");
        }
        const ethBalance = ethers.formatEther(await provider.getBalance(address));
        const balance = ethers.formatEther(await getTokenBalance(address));
        console.log(`No.${ACCOUNTS.indexOf(address)}: ${address}  ETH: ${ethBalance}  Token: ${balance}`);
    }
}

async function getTokenBalance(address) {
    const tokenContractAddress = process.env.CA_TOKEN as `0x${string}`;
    const tokenAbi = [
        {
            "constant": true,
            "inputs": [{ "name": "owner", "type": "address" }],
            "name": "balanceOf",
            "outputs": [{ "name": "", "type": "uint256" }],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];

    const tokenContract = new ethers.Contract(tokenContractAddress, tokenAbi, provider);

    const balance = await tokenContract.balanceOf(address);
    return balance.toString();
}

showTokenBalances();

