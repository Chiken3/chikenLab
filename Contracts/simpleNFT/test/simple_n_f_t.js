const simpleNFT = artifacts.require("simpleNFT");

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract("simpleNFT", function (/* accounts */) {
  it("should assert true", async function () {
    await simpleNFT.deployed();
    return assert.isTrue(true);
  });
});
