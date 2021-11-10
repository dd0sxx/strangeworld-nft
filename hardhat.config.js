require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
const {ETHERSCAN_API_KEY, ALCHEMY_MAINNET_PRIVATE_KEY, MAINNET_PRIVATE_KEY, ALCHEMY_PRIVATE_KEY, RINKEBY_PRIVATE_KEY} = require('./config');

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_PRIVATE_KEY}`,
      }
    },
    rinkeby: {
      url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_PRIVATE_KEY}`,
      accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
    },
    mainnet: {
      url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_MAINNET_PRIVATE_KEY}`,
      accounts: [`0x${MAINNET_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY
  },
  gasReporter: {
    enabled: true
  }
};
