
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const DeployModule = buildModule('TokenModule',(m) => {
  // creating instance form our smart contract // 

  const marketPLace = m.contract("NFTSTORE"); 
  return marketPLace;


})

module.exports = DeployModule;