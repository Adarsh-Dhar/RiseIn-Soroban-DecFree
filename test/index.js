const ethers = require('ethers');

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/dc10a4b3a75349aab5abdf2314cbad35`);

const queryBlockChain = async () => {
    const block = await provider.getBlockNumber();
    console.log(block);
}

queryBlockChain()