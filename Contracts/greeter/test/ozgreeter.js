const OZGreeterContract =artifacts.require("OZGreeter");

contract("OZGreeter",(accounts) => {
    it("has been deployed successfully", async () => {
        const greeter = await OZGreeterContract.deployed();
        assert(greeter,"contract was not deployed");
    });

    describe("greet()", () => {
            it("returns 'Hello, World!'", async () => {
                const greeter = await OZGreeterContract.deployed();
                const expected = "Hello, World!";
                const actual = await greeter.greet();
                assert.equal(actual,expected,"greeted with 'Hello, World!'");
            });
    });
});

contract("OZGreeter: update greeting", (accounts) => {
    describe("setGreeting(string)", () => {
        describe("when message is sent by the owner", () =>{
            it("sets greeting to passed in string", async () => {
                const greeter = await OZGreeterContract.deployed();
                const expected = "The owner changed the message";
    
                await greeter.setGreeting(expected);
                const actual = await greeter.greet();
    
                assert.equal(actual, expected, "greeting was not updated");
            });
        });

        describe("When message is sent by another account", () =>{
            it("does not set the greeting", async () => {
                const greeter  = await OZGreeterContract.deployed();
                const expected = await greeter.greet();
                try{
                    await greeter.setGreeting("Not the owner", { from: accounts[1]});
                } catch(err) {
                    const errorMessage = "Ownable: caller is not the owner";
                    assert.equal(err.reason, errorMessage, "greeting should not update");
                    return;
                }
                assert(false, "greeting should not up date");
            });
        });
    });
});