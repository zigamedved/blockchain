require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { SEPOLIA_URL, TEST_PRIVATE_KEY } = process.env;

module.exports = {
  solidity: "0.8.4",
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {},
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [TEST_PRIVATE_KEY]
    }
  },
}
