require("@nomiclabs/hardhat-truffle5");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    mainnet: {
      url: process.env.MAINNET_END_POINT,
      accounts: [process.env.MAINNET_PRIVATE_KEY]
    },
    ropsten: {
      url: process.env.ROPSTEN_END_POINT,
      accounts: [process.env.ROPSTEN_PRIVATE_KEY]
    },
    rinkeby: {
      url: process.env.RINKEBY_END_POINT,
      accounts: [process.env.RINKEBY_PRIVATE_KEY]
    }
  },
};
