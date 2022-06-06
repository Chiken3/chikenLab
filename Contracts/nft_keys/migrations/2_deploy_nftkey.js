const NFTkeyContract = artifacts.require("NFTkey");

module.exports = function(deployer) {
    deployer.deploy(NFTkeyContract);
}