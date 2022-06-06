const NFTkeyContract = artifacts.require("NFTkey");

contract("NFTkey",(accounts) => {
    //NFTkey contract は正常にデプロイできるか
    it("has been deployed successfully", async () => {
        const nftkey = await NFTkeyContract.deployed();
        assert(nftkey,"contract was not deployed");
    });

    //describe("")
});