# greeter contract 作成手順。

ERC721 token exam mounting : https://github.com/nibbstack/erc721



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
```js solidity
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
```js solidity
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

関数からの戻り値を動的に指定できるようにする。<br> greet 関数から返されるメッセージを設定できる別の関数を用意する。<br> 
test/greeter-test.js に以下のコントラクトを追加
```javascript
contract("Greeter: update greeting", () => {
    describe("setGreeting(string)", () => {
        it("sets greeting to passed in string", async () => {
            const greeter = await GreeterContract.deployed();
            const expected = "Hi there!";

            await greeter.setGreeting(expected);
            const actual = await greeter.greet();

            assert.equal(actual, expected, "greeting was not updated");
        });
    });
});
```
contract/Greeter.sol に以下を追加
```js solidity
function setGreeting(string calldata greeteing) external {}
```
* この関数は外部から呼び出される為、パラメータとして渡されるデータはコントラクトの永続ストレージの一部ではないが、コールデータ * の一部として含まれる。このため、データの保管場所である calldata で修飾しなければならない。
  * calldata が必要となるのは、関数が external として宣言されていて、パラメータのデータ型が mapping , struct , string , array といった参照型である場合に限られる。
  * int や address といった値型を使う時は、この修飾子を指定する必要はない。

> *calldata とは、memory キーワードと同じtemporary(一時的な)領域を指定するものであるが memory は可変で calldata は不変 である。<br> https://ethereum.stackexchange.com/questions/74442/when-should-i-use-calldata-and-when-should-i-use-memory

ある関数内で変数を変更しその変数を別の関数で利用できるようにするには、コントラクトの永続ストレージにデータを格納する必要がある。これには状態変数をつかう。<br>
contract/Greeter.sol に以下を追加
```js solidity
pragma solidity >=0.4.22 <0.9.0;

contract Greeter {
    string private _greeting;
    // 省略
}
```
* 状態変数はブロックチェーンに格納されているので、pure 関数では参照できないことに注意する。
* また、状態変数を更新する関数を記述する際はパラメータに状態変数と同じ名前をつけることができないことを踏まえて以下のように書き換える。

contract/Greeter.sol
```js solidity
contract Greeter {
    string private _greeting = "Hello, World!";
    function greet() external view returns(string memory) {
        return _greeting;
    }

    function setGreeting(string calldata greeting) external {
        _greeting = greeting;
    }
}
```
<br>

これで動的なコントラクトを実装できた。<br>
しかし、現時点では挨拶文の内容を誰でも変更できる状態である。<br>

ここからは、コントラクトに所有権の概念を追加し、挨拶文を変更する能力を所有者に限定することにする。

* まずは、このコントラクトの所有者として、初期値にコントラクトをデプロイしたアドレスを格納する。その為には、msg オブジェクトの情報にアクセスする必要がある。
  * msg オブジェクトはグローバルにアクセスできるオブジェクトであり、コールデータ、メッセージの送信者、呼び出されている関数のシグネチャ、そして値(どれだけの wei をが送信されたか)を含んでいる。
* 最初のテストはゲッター関数 owner を呼び出し、所有者が存在するかを確認。

test/greeter.js のはじめのコントラクトに以下を追加
```js
describe("owner()", () => {
        it("returns the address of the owner", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            assert(owner, "the current owner");
        });
    });
```
ここで、コントラクトにデプロイに使われたアカウントと所有者のアドレスが等しいことをテストする。<br>
そのために、テスト環境でアカウントにアクセスする必要がある。Truffle では accounts 変数を利用してアカウントにアクセスできる。<br>
test/greeter.js にの以下のように変更する。
```js
contract("Greeter",(accounts) => {
    it("has been deployed successfully", async () => {
        const greeter = await GreeterContract.deployed();
        assert(greeter,"contract was not deployed");
    });

    describe("greet()", () => {
            it("returns 'Hello, World!'", async () => {
                const greeter = await GreeterContract.deployed();
                const expected = "Hello, World!";
                const actual = await greeter.greet();
                assert.equal(actual,expected,"greeted with 'Hello, World!'");
            });
    });

    describe("owner()", () => {
        it("returns the address of the owner", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            assert(owner, "the current owner");
        });

        it("match the address that originally deployed the contract", async () => {
            const greeter = await GreeterContract.deployed();
            const owner = await greeter.owner();
            const expected = accounts[0];
            assert.equal(owner,expected,"matches address used to deploy contract");
        });
    });
});
```
次は、所有者だけが挨拶文を更新できるような制約を定義できる。<br>
この種のアクセス制御は関数修飾子を利用して実装する。<br>
test/greeter.js
```js 
contract("Greeter: update greeting", (accounts) => {
    describe("setGreeting(string)", () => {
        describe("when message is sent by the owner", () =>{
            it("sets greeting to passed in string", async () => {
                const greeter = await GreeterContract.deployed();
                const expected = "The owner changed the message";
    
                await greeter.setGreeting(expected);
                const actual = await greeter.greet();
    
                assert.equal(actual, expected, "greeting was not updated");
            });
        });

        describe("When message is sent by another account", () =>{
            it("does not set the greeting", async () => {
                const greeter  = await GreeterContract.deployed();
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
```
パラメータの中に from プロパティを持つオブジェクトがある。<br>
これは、このメッセージを別アカウントから明示的に送信している。<br>
このようにして、コントラクトに送信される value(wei単位)の設定も可能になる。

Greeter コントラクトに修飾子を作成して適用する。<br>
contracts/Greeter.sol の constractorの下に以下を追加
```js solidity
modifier onlyOwner() {
    require(
        msg.sender == _owner,   //この式がfalseならばトランザクションは完全に取り消して変更が元に戻される。
        "Qwnable: caller is not the owner" //処理失敗時の呼び出し元に対しての文字
    );
    _;　//修飾されている関数が呼び出される場所。
}
```
OpenZeppelin の実装には、所有権の概念を実装しているコントラクトも存在しており、<br>ここでは、そのふるまいの一部を再現した。
OpenZeppelin を利用するようにしてみる。
```bash
$ npm install @openzeppelin/contracts #2022/5/30現在
```
contract/Greeter.sol の最初の部分を以下のように変更
```js solidity
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OZGreeter is Ownable{
    string private _greeting = "Hello, World!";

    function greet() external view returns(string memory){
        return _greeting;
    }

    function setGreeting(string calldata greeting) external onlyOwner {
        _greeting = greeting;
    }
}
```
---
