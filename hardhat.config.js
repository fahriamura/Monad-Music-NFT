require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


module.exports = {
  solidity: "0.8.28", // or your preferred version
  networks: {
    monadTestnet: {
      url: "https://testnet-rpc.monad.xyz",
      accounts: [process.env.PRIVATE_KEY], // Make sure you have PRIVATE_KEY in your .env file
      chainId: 10143,
      gasPrice: 1000000000, // 1 gwei
      
    },
  },
};