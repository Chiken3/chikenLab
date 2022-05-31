# ganache で ERC721 を元にNFTを作り,拡張する。

```bash
$ cd
$ node -v       # v16.13.2
$ truffle -v    # Truffle v5.5.10
$ chmod u+x #ganacheAppImagefile
$ mkdir greeter
$ cd greeter
$ truffle init  # Truffle プロジェクト初期化
$ touch test/greeter.js # Truffleテストを書く
```
 ↓ test/gteeter.js は コントラクトをデプロイできるかのテスト
```javascript
const GreeterContract =artifacts.require("Greeter")

GreeterContract("Greeter",() => {
    it("has been deployed successfully", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter,"contract was not deployed");

    })
})
```
- truffleでは、artifacts.require関数を使って、コンパイル済みのコントラクトを読み込んで操作できる。
ただし、一つのファイルに複数のコントラクトの宣言が含まれている可能性がある為ここではコントラクト名を指定

```bash
$ truffle test # error
$ touch contracts/Greeter.sol
```
 ↓ Greeter.sol
```solidity
const GreeterContract =artifacts.require("Greeter");

contract("Greeter",() => {
    it("has been deployed successfully", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter,"contract was not deployed");

    });
});
``` 
truffle test で確かめる
```bash
$ truffle test
=>
Contract: Greeter
    1) has been deployed successfully
    > No events were emitted

  0 passing (112ms)
  1 failing

  1) Contract: Greeter
       has been deployed successfully:
     Error: Greeter has not been deployed to detected network (network/artifact mismatch)
```
truffle は truffle test のたびにコントラクトをコンパイル & テストネットにデプロイする。
コントラクトをデプロイするには Truffle の migration ツールを利用する。

```bash
$ touch migrations/2_deploy_greeter.js
```
2_deploy_greeter.js #Greeter contract をtestnetにデプロイできるようにする。 
```javascript
const GreeterContract = artifacts.require("Greeter");

module.exports = function(deployer) {
    deployer.deploy(GreeterContract);
}
```


Solidity は標準出力、ファイルシステム、ネットワーク、その他の入出力にはアクセスできない。   
Solidity にあるのは関数だけ 
ここで、スマートコントラクトで "Hollo, World!" を出力する関数を作る。
まず、テストを作る。
test/greeter_test.js
```javascript
const GreeterContract =artifacts.require("Greeter");

contract("Greeter",() => {
    it("has been deployed successfully", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter,"contract was not deployed");
    });

    describe("greet()", () => {
            it("returns 'Hello, World!'", async () => {
                const greeter =await GreeterContract.deployed();
                const expected = "Hello World!";
                const actual = await greeter.greet();
                assert.equal(actual,expected,"greeted with 'Hello, World!'");
            });
    });
});
```


```bash
$ truffle test
=>
  1 passing (144ms)
  1 failing

  1) Contract: Greeter
       greeter()
         returns 'Hello, World!':
     TypeError: greeter.greet is not a function
```


greeter.greet 関数の作成
```solidity
pragma solidity >=0.4.22 <0.9.0;

contract Greeter {
    function greet() external pure returns(string memory) {
        return "Hello, World!";
    }
}
```

- greet は external 関数であることを指定している。つまり、この関数は Greeter コントラクトのインターフェイスの一部であり、他コントラクト(トランザクション) からは呼び出せるが、コントラクト内からは呼び出せない。
    - external 以外にも、public, internal, private の３つの修飾子を指定できる。
        - public 関数は他コントラクトと内部からもアクセス可能
        - internal, private 関数はオブジェクトや this では呼び出せない。<br>特に private はそれを定義しているコントラクト内だけで、派生コントラクトでも参照できない。
- コントラクト変数の状態を変更しない関数は、pure または view として定義できる。
    - pure 関数は、ブロックチェーンからデータを読み取ることも、ブロックチェーンにデータを書き込むこともできない関数。
        - これらの関数は渡されたデータだけを操作するか、入力を一切必要としない。
    - view 関数は、ブロックチェーンからデータを読み取ることができるが、やはりブロックチェーンにデータを書き込むことができないという制限がある。
- memory　キーワードを使って、この値がコントラクトの永続ストレージに配置されているものを一切参照しないことも指定している。

関数からの戻り値を動的に指定できるようにする。<br> greet 関数から返されるメッセージを設定できる別の関数を用意する。
test/greeter-test.js
```javascript

```
