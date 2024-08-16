require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

console.log("Mnemonic:", process.env.MNEMONIC); // 這行會在終端中打印出助記詞

const { MNEMONIC, INFURA_PROJECT_ID } = process.env;

module.exports = {
  networks: {
    sepolia: {
      provider: () =>
        new HDWalletProvider(
          MNEMONIC,
          `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`
        ),
      network_id: 11155111, // Sepolia 的網絡 ID
      gas: 5500000,         // Gas 限制
      confirmations: 2,     // 部署間等待的確認次數
      timeoutBlocks: 200,   // 部署超時前等待的區塊數
      skipDryRun: true      // 跳過遷移前的 dry run 測試
    },
  },
  compilers: {
    solc: {
      version: "0.8.17",    // 指定的 Solidity 編譯器版本
    },
  },
};
