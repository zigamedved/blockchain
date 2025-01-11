require("@nomicfoundation/hardhat-toolbox");

const { SEPOLIA_URL, TEST_PRIVATE_KEY } = process.env;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
      sepolia: {
        chainId: 11155111,
        url: SEPOLIA_URL,
        accounts: [TEST_PRIVATE_KEY],
      }
  } 
};
