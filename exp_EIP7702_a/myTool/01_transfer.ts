import { ethers } from "ethers";


const anvilUrl = "http://127.0.0.1:8545";
const provider = new ethers.JsonRpcProvider(anvilUrl);

const senderAddress = "0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc"; // No.5
const privateKey = "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba"; // No.5
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 送信先のスマートコントラクトアドレス

const wallet = new ethers.Wallet(privateKey, provider);

async function sendEthToContract() {

    const tx = {
        to: contractAddress,
        value: ethers.parseEther("100"),
        gasLimit: 210000,
    };

    try {
        const txResponse = await wallet.sendTransaction(tx);
        console.log(`txid ${txResponse.hash}`);


        const receipt = await txResponse.wait();
        console.log(`receipt: ${receipt?.hash}`);
    } catch (error) {
        console.error("error:", error);
    }
}


sendEthToContract();