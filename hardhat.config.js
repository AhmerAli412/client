require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.4",
  paths: {
    // artifacts: "./src/backend/artifacts",
    artifacts: "./src/pages/backend/artifacts",
    sources: "./src/pages/backend/contracts",
    cache: "./src/pages/backend/cache",
    tests: "./src/pages/backend/test"
  },
};
