const OZGreeterContract = artifacts.require("OZGreeter");

module.exports = function(deployer) {
    deployer.deploy(OZGreeterContract);
}