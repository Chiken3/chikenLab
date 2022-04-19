# Ethereum

###  Web3 のユースケース

* [**DeFi**](https://defiprime.com/)**プロトコル** (AaveやMakerDAOなど) 

  スマート・コントラクトにより運営される貸付／借入サービスを可能にする。スマート・コントラクトによって仲介者が排除されるため、リスクは大幅に高くなるが、より高い利回りと利益率を実現する。

* **NFTを使用したPlay-to-Earnゲーム**

  ユーザーが収入を得る手段を提供する。ゲームの収益を、恵まれないユーザーを対象とした[**奨学金の資金として活用するNPO**](https://nftscholarship.org/)も登場している。

* **NFTスマート・コントラクトを使用して作品を販売**

  例えばアート作品の販売時には、仲介者ではなく、アーティストが自ら設定した契約条項に基づいて、支払いを受けられる。

### timescajure

https://zoom-blc.com/solidity-time-logic

### 信用度の高い情報源

* **( https://ethereum.org/ja/ )**

### Ethereumのウォレットの選択

* MetaMask (Webベース)
* Jaxx (モバイル＆デスクトップ)
* MyEtherWallet (Web)
* Emerald Wallet (デスクトップ)

---



### コントラクトを作る

* Ethereumのコントラクトは、資産を制御するプログラムで、EVMと呼ばれる仮想マシン内で実行される。コントラクトを作成するのは特別なトランザクション。

* コントラクトがブロックチェーン上に作成されると、ウォレットのようにイーサリアムアドレスを持つ。

* 誰かがコントラクトアドレスにトランザクションを送信すると、そのトランザクションの入力としてEVMでコントラクトが実行される。

* コントラクトアドレスに送信されたトランザクションはイーサまたはデータ、あるいは両方持つことができる。

* トランザクションにイーサが含まれている場合は、コントラクト残高にそのイーサが預け入れられている。

* トランザクションにデータが含まれている場合、データはコントラクト内で名前付き関数を指定して呼び出し、その関数に引数を渡すことができる。

コントラクト履歴表示：https://ropsten.etherscan.io/

---



### Solidity

Solidityコンパイラは、様々なフレームワークの一部としてスタンドアローンの実行可能ファイルとして提供されており、統合開発環境（Integrated Development Environment : IDE）に包含されています。

* オンラインコンパイラ「Remix」
* コマンドラインコンパイラ「solc」

**ここでは「Remix」と呼ばれるIDEを使用する**

https://remix.ethereum.org/

ファウセットコントラクトには独自のアドレスがあることに注意

Faucet at 0x5616ce1902Cd09d17f38e18a2135b30851fb2d2C



https://cryptozombies.io/jp/lesson/1/chapter/1

---



### Ethereumのクライアント環境を構築

Ethereumの仕様は、「イエローペーパー」と呼ばれる英語と数式を組み合わせた論文に記載

Ethereumの3つのオリジナルの実装(Go, Python, C++)のうちGoでかかれた実装がある。
今回は通称 Go Ethereum(Geth)で環境を構築する。

Ethereumを使った開発において、

* **メインネット上で動作するフルノード**
* **テストネットノード**
* **Ganacheなどのローカルプライベートブロックチェーン**
* **Infuraなどのサービスプロバイダが提供するクラウドベースのイーサリアムクライアント**

を使用してほとんどの作業ができる。

今回はローカルプライベートブロックチェーンのクライアントで開発する。
https://geth.ethereum.org/docs/interface/private-network

### Go-Ethereum (Geth)

**Gothは様々な方法でインストールできる。**
参照(https://geth.ethereum.org/docs/install-and-build/installing-geth)

今回はUbuntuのインストールパターンをまとめる。

* **PPAの介してUbuntuにインストールする。**

  ```bash
  #!/bin/bash
  sudo apt update
  sudo apt upgrade -y
  sudo apt install -y apt-file
  sudo apt-file update
  
  sudo apt -get update
  sudo add-apt-repository -y ppa:ethereum/ethereum
  sudo apt-get update
  sudo apt-get install ethereum
  geth --help
  
  ```

  

* **ソースからGethビルドする**

  ```bash
  #!/bin/bash
  git clone https://github.com/ethereum/go-ethereum
  cd go-ethereum
  make geth
  ./build/bin/geth version #動作確認
  ```

  

> 「リモートクライアント」と「ウォレット」という用語は同じ意味で使用されていますが、いくつかの違いがある。通常リモートクライアントはウォレットのトランザクション機能に加えてAPI(web3.js APIなど)も提供します。

> > イーサリアムの「リモートウォレット」の概念をライトクライアント( light client : ビットコインのSimplified Payment Verification クライアントに類似している ) と混同しないように注意

> ライトクライアントは、ブロックヘッダーを検証し、マークルプルーフを使用しブロックチェーンにトランザクションが含まれていることを検証する。

> リモートクライアントは、ブロックヘッダー及びトランザクションを検証しない。
> リモートクライアントはフルクライアントを完全に信頼し、ブロックチェーンへのアクセスを許可します。そのため、重要なセキュリティと匿名性の保証が大きく失われる。
> 自身でフルクライアントをたてて使用することで、この問題はいくらか軽減する。

---

## Ethereum プライベートネットに接続する。 

* **プライベート・ネットワーク**：

  一つの組織のみに管理されたノードのみが参加することが可能なネットワークです。ネットワークは自身の管理下に置くことが可能になり、中央集権的なP2Pシステムが可能になります。

  プライベート・ネットワークは、自分自身のみのネットワークなので容易にEtherの採掘が可能ですし、安全性も高いネットワークです。そのため、Ethereumの動作を調べたり、分散型アプリケーション（Dapp）の開発作業など個人的な作業を行うには、プライベート・ネットワークを立ち上げてそこでいろいろ弄ってみると便利です。

##### genesisブロック作成からgethの起動まで

```bash
#!/bin/bash
cd
mkdir eth_private_net
cd eth_private_net
touch myGenesis.json
echo "{
  "config": {
    "chainId": 15,
    "homesteadBlock": 0,
    "eip150Block": 0,
    "eip155Block": 0,
    "eip158Block": 0,
    "byzantiumBlock": 0,
    "constantinopleBlock": 0,
    "petersburgBlock": 0,
    "istanbulBlock": 0,
    "berlinBlock": 0
  },
  "nonce": "0x0000000000000042",
  "timestamp": "0x0",
  "parentHash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "extraData": "",
  "gasLimit": "0x8000000",
  "difficulty": "0x4000",
  "mixhash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "coinbase": "0x3333333333333333333333333333333333333333",
  "alloc": {}
}" >> myGenesis.json

# genesis block init
geth --datadir ~/eth_private_net init ~/eth_private_net/myGenesis.json 
# geth start
geth --networkid "15" --nodiscover --datadir "~/eth_private_net" console 2>> ~/eth_private_net/geth_err.log
```

> * `--datadir` :本オプションはgethの動作時のブロックチェーンデータや各種ログの出力先を指定します。genesisブロックの初期化で指定したディレクトリと同一のものを指定してください。
> * `--networkid "15"` ：本オプションで任意の正の整数のIDを指定することで、ライブ・ネットとは異なるネットワークを立ち上げることが可能です（ここでは15を指定）。genesisブロックの初期化で指定した`chainid`と同一の値を指定する必要があります。
> * `--nodiscover` ：Gethはデフォルトで自動的に（同じネットワークID）のEthereumネットワークのノード（Peer）を探し接続を試みます。プライベート・ネットでは未知のノードとの接続を避けるため、このオプションで自動Peer探索機能を無効にします。
> * `console`：Gethには採掘やトランザクションの生成などを対話的に進めることができるコンソールが用意されています。`console`サブ・コマンドを指定することで、Gethの起動時に同時にコンソール立ち上げることが可能です。なお、`console`サブ・コマンドを付加せずに、Gethのプロセスをバックグラウンドで起動させておき、後からそのプロセスのコンソールを起動する事も可能です（下記TIP参照）。

```bash
$ # バックグラウンド起動について

$ # consoleサブ・コマンドを付加せず、かつ最後に"&"を付加、バックグラウンドで起動します。
$ # この場合、起動時にはコンソールは立ち上がりません。
$ geth --networkid "15" --nodiscover --datadir "~/eth_private_net" 2>> ~/eth_private_net/geth_err.log &
$
$ # attachサブ・コマンドを用いて先に立ち上げたプロセスのコンソールを立ち上げます。
$ # ここで、ipc:以降に先に立ち上げたgethプロセスのデータ用ディレクトリ以下のgeth.ipcファイル（実際はソケット）のパスを指定します。
$ geth --datadir "~/eth_private_net" attach ipc:~/eth_data/geth.ipc
```

---

## etherの採掘

Gethのコンソール上で新規のアカウントを作成します。

Ethereumには **EOA**（Externally Owned Account) と**Contract** の２種類のアカウントがある。

```bash
> personal.newAccount("password")
"0x9278df10c383e2845351e2ee2ade2d365a97ff9c"
> eth.accounts
["0x9278df10c383e2845351e2ee2ade2d365a97ff9c", "0x2272146283a19cee63b6a886b91c89f85ae703db"]
>eth.coinbase #マイニング報酬を受け取るEOAアドレスを表示etherbaseとも言う
"0x9278df10c383e2845351e2ee2ade2d365a97ff9c"
#>miner.setEtherbase(eth.accounts[1]) #etherbaseの変更例
> miner.start()
> miner.stop()
> eth.blockNumber
> eth.getBalance(eth.accounts[0])
> web3.fromWei(eth.getBalance(eth.accounts[0]),"ether")
```

### etherの送金

```bash
> personal.unlockAccount(eth.accounts[0]) //アカウントのロック解除。パスワードを求められるので、適宜パスワードを入力する。
> eth.sendTransaction({from: eth.accounts[0], to: eth.accounts[1], value: web3.toWei(5, "ether")}) //送金の実行。実行結果としてトランザクションIDが返される。
"0x86a9ec537c3dbc2744051774c025571048346970461609ea62e07aacac794904"

```

### スマートコントラクト

Solidityコンパイラのインストール

```bash
#!/bin/bash 
sudo add-apt-repository ppa:ethereum/ethereum
sudo apt-get update
sudo apt-get install solc
solc --version
```

スマートコントラクト実行までの流れ

1. Solidity言語でスマートコントラクトの内容を記述したコントラクト・コードをプログラミングする。
2. コントラクト・コードのコンパイル
3. 「Contract」アカウントを生成
   1. コンパイル済みのコードをトランザクションに付加してネットワークに送信する。そのトランザクションを受信した採掘者は、トランザクションをブロックチェーンに登録する。これにより「Contract」アカウントが生成されそのアドレスが発行される。
4. スマートコントラクトへのアクセスと実行
   1. スマートコントラクトを実行したいユーザーはContractアカウントへトランザクションを発行することによりスマートコントラクトを実行する。

###### コントラクトの例

```solidity
pragma solidity ^0.4.0;
contract SingleNumRegister {
    uint storedData;
    function set(uint x) public{
        storedData = x;
    }
    function get() public constant returns (uint retVal){
        return storedData;
    }
}
```

```bash
$ solc --abi --bin SingleNumRegister.sol
```

#### 「Contract」アカウントを生成

```javascript
var bin ="0x608060405234801561001057600080fd5b50610150806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806360fe47b11461003b5780636d4ce63c14610057575b600080fd5b610055600480360381019061005091906100c3565b610075565b005b61005f61007f565b60405161006c91906100ff565b60405180910390f35b8060008190555050565b60008054905090565b600080fd5b6000819050919050565b6100a08161008d565b81146100ab57600080fd5b50565b6000813590506100bd81610097565b92915050565b6000602082840312156100d9576100d8610088565b5b60006100e7848285016100ae565b91505092915050565b6100f98161008d565b82525050565b600060208201905061011460008301846100f0565b9291505056fea2646970667358221220d6f7ec3dcefec348acce311a2650e8bf57e96c4004b664209478157eddfc890064736f6c634300080b0033"

var abi = [{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"retVal","type":"uint256"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"x","type":"uint256"}],"name":"set","outputs":[],"stateMutability":"nonpayable","type":"function"}]
var contract = eth.contract(abi)
personal.unlockAccount(eth.accounts[0]) //使用するEOAをアンロックしておく
var myContract = contract.new({ from: eth.accounts[0], data: bin})
```

`myContract`の内容を表示

```javascript
> myContract
{
  abi: [{
      inputs: [],
      name: "get",
      outputs: [{...}],
      stateMutability: "nonpayable",
      type: "function"
  }, {
      inputs: [{...}],
      name: "set",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function"
  }],
  address: undefined, //ここにアドレスが表示されればEthereum上に記録された "0x57e6f089880b87437fde0e80a9e7bdaded73e5d2"
  transactionHash: "0x007e925106512db27cbb2182f0f79019dd43b3956bc64558d40aeff3459a2b46"
}
```



#### 「Contract」アカウントへのアクセス

スマートコントラクトを利用してもらうためには、以下の2種類の情報を他のユーザーに伝える必要があります。

* Contractのアドレス

* ContractのABI (Application Binary Interface)

  ABIとはContractの取り扱い説明書のようなものです。例えば、このContractがどのような名前の関数が定義されているか、それぞれの関数にアクセスするために、どのような型のパラメータを渡す必要があるか、関数の実行結果はどのような型のデータが返るか、などの情報が含まれたものです。

  ```
  > myContract.abi
  [{
        constant: false,
        inputs: [{...}],
        name: "set",
        outputs: [],
        payable: false,
        stateMutability: "nonpayable",
        type: "function"
    }, {
        constant: true,
        inputs: [],
        name: "get",
        outputs: [{...}],
        payable: false,
        stateMutability: "view",
        type: "function"
    }]
  ```

  #####  Contractアカウントへアクセス

  ```javascript
  //eth.contract(ABI_DEF).at(ADDRESS);
  > var cnt = eth.contract(myContract.abi).at(myContract.address);
  > personal.unlockAccount(eth.accounts[0]) //使用するEOAをアンロックしておく
  > cnt.set.sendTransaction(6,{from:eth.accounts[0]})
  "0x0607d6c6142d31ccdde3e452a1b08c4ed4ad2cb901e5269b75d80a4330ee1e55"
  ```

  1. トークンの作成
     OpenZeppelin
  2. トークンの送信
     
  3. トークンのTimeLock
  4. Userロール実装(トークンの棄却を不可能にする)
  5. Solidityでのオラクルインターフェイス(マスタリングp277)
  6. キャンディハウスのAPI動作

#### Contractの開発環境(IDE)

デスクトップ上の開発環境(https://ethereum.org/ja/developers/docs/ides/)

* **Remix Desktop**
  Releasesを参照する。今回はremix-ide_1.3.3_amd64.debをダウンロード

  ```bash
  sudo apt install ./remix-ide_1.3.3_amd64.deb 
  ```

  

## トークンを作る

## token timelock

## Ethereum smart contract to web API

https://betterprogramming.pub/how-to-call-apis-from-ethereum-smart-contracts-e2f1500198c7


## ERC721のトークンを作る

https://zenn.dev/razokulover/scraps/5ad38e06db0d55

ERC721:スマートコントラクト内でNon-Fungible Tokenを扱えるようにしたものです。

**ERC721規格について**:
	実装が必要なメソッドリストは以下になる。

```solidity
contract ERC721 {
  event Transfer(address indexed _from, address indexed _to, uint256 _tokenId);
  event Approval(address indexed _owner, address indexed _approved, uint256 _tokenId);
  event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
  
  function balanceOf(address _owner) public view returns (uint256 _balance);
  function ownerOf(uint256 _tokenId) public view returns (address _owner);
  function transfer(address _to, uint256 _tokenId) public;
  function approve(address _to, uint256 _tokenId) public;
  function takeOwnership(uint256 _tokenId) public;
}
```

トークン・コントラクト実装の際、初めにすべきはインターフェイスをSolidityファイルにコピー/インポートすることである。(import "./erc721.sol")すると我々のコントラクトはそれを継承し、関数定義で各メソッドをオーバーライドする。
Solidityではコントラクトを以下のように複数コントラクト継承可能 :

```solidity
contract SatoshiNakamoto is NiciSzabo, HalFinney{
	//SatoshiNakamotoはNickSzaboとHalFinneyを継承している。
}
```



#### hardhat

#### truffle compile

```
$ truffle compile
```

https://zenn.dev/shunp110/articles/3bc9e8a75095dd

##### timeLock constract

transaction hash:    0xa44e1251ac0eb10904f5a4149682e093bb4bd953b034a9a6424f55218a9439c5
contract address:    0x34bAfA8A571D6fF92DC259700ecA63A2e4508872

### TokenURI設定
ERC721ではトークンを発行する際にTokenURIの設定が必要

JSONファイルのURLを設定することでトークンの画像や情報を登録できる。



https://github.com/ethereum/EIPs/issues/1257

https://partners.candyhouse.co/

https://doc.candyhouse.co/ja/SesameAPI

block.timestamp https://ethereum.stackexchange.com/questions/58278/setting-time-requirements-in-solidity

## DApp

DAppは、大部分またはすべてが非中央集権化されたアプリケーション。
非中央集権化できるのは

* バックエンドソフトウェア（スマートコントラクトなど）
* フロントエンドソフトウェア
* データストレージ
* メッセージ通信
* 名前解決



--------



### **暗号化**

#### KeyWord

* 暗号 (http://bit.ly/2DcwNhn)
* トラップドア関数 (http://bit.ly/2zeZV3c)
* 素因数分解 (http://bit.ly/2ACJjnV)
* 離散対数 (http://bit.ly/2Q7mZYI)
* 楕円曲線暗号 (http://bit.ly/2zfeKCP)
* 暗号学的ハッシュ関数 (http://bit.ly/2Q79qZp)
* ハッシュ関数 (http://bit.ly/2CR26gD)
* Ethereum Wiki (http://bit.ly/2JsZHKu)
* SHA-3  (FIPS-202 SHA-3 , Keccak-256)
* ICAP (Internet Content Adaptation Protocol)
* IBAN (International Bank Account Number)
* EIP-55 (Ethereum Improvement Proposal 55)

 

### ウォレット

#### 2種類のウォレット

* **非決定性ウォレット**

​	生成された鍵は互いに関連していない。鍵束( JBOK , Just a Bunch of Key )　とも言われている。
​	バックアップをとる必要があり、コストが多くかかる、取扱が面倒など、推奨されない。
​	バックアップの為にニーモニックシードを用いる業界標準のHDウォレットを使用するのが良い

* **決定性ウォレット**

​	生成された鍵は互いに**関連している**。
​	すべての鍵はシード(seed)と呼ばれる１つのマスターキーから生成
​	シードがあれば生成したすべての鍵を復元できる。
​	ニーモニックコードワードからウォレットを作り直せる



### トランザクション

トランザクションは、外部所有アカウントから発信された署名付きのメッセージです。
トランザクションはイーサリアムネットワーク上でシリアライズされる。
シリアライズされたバイナリで以下を読み込む

**ナンス**
	メッセージの再利用を防ぐために使用されるシーケンス番号。(発信元EOAから発行)

**ガスリミット**
	トランザクション発行者が払っても構わないと考えるガスの価格(価格は wei ) 

**受診者**
	宛先となるイーサリアムアドレス

**バリュー**
	宛先に送信するイーサの量

**データ**
	可変長バイナリデータのペイロード

**v, r, s**

​	発信元EOAのECDSAデジタル署名の３つの要素



**特別なトランザクション：コントラクト作成ついて**

コントラクト作成トランザクションは、ゼロアドレスと呼ばれる特殊なアドレスに送信される。
コントラクト登録トランザクションのtoフィールドには、アドレス**0x0**が含まれる。

#### 署名と送信の分離

オフライン署名　

* ZeroMQ (0MQ)

---



### トークン

トークンは重複する多くの異なる機能を果たすようにプログラミングできます。
ex) : 投票権やアクセス権リソースの所有権を同時に意味することができる。

トークンの表現例↓

* **通貨**
* **リソース**
  シェアリングエコノミーまたはリソースシェアリング環境で獲得または生産されたリソースを表します。例えば、ストレージまたはCPUトークンが、ネットワーク上で共有できるリソースを表す。
* **アセット**
  内在的または外材的、有形、無形の資産の所有権を表します。例えば、金、不動産、自動車、石油、エネルギー、MMOGアイテムなど
* **アクセス**
  アクセス権を表し、ディスカッションフォーラム、専用Webサイト、ホテルの部屋、レンタカーなどのデジタルまたは物理的財産へのアクセスを許可する。
* **エクイティ**
  デジタルな組織（DAO[非中央集権型自立組織] ）や法人の持分を表す。
* **投票**
  デジタルシステムまたは法的システムにおける投票権を表す。
* **収集品**
  デジタル収集品または物理的な収集品を表す。
* **アイデンティティ**
  デジタルアイデンティティ(アバターなど)または法的アイデンティティ(国民IDなど)を表す
* **証明**
  行政当局、または、非中央集権型の評価システムによる証明書または事実(ex : 結婚記録、出生証明、大学の学位)を証明
* **ユーティリティ**
  トークンを利用して、サービスにアクセスしたり、サービス料を払える。

#### トークンと内在性

ブロックチェーンベースのトークンを用いることの最も重要な効果の一つは、外在性資産を内在性資産に変換し、それによってカウンターパーティリスクを取り除くことができることです。
Ex : 企業の株式（外在性）からDAOや類似の（内在性）組織における株式または投票トークンへの移行。



#### トークンのエクイティ

「すべてのものをトークン化する。」には制限が多い。
新しいプロジェクトにおいて、トークンの役割を明確にすることから始める。

多くのトークンにさしたる価値しかないのは、１つのバス会社、１つのコインランドリー、１つの商店街、１つのホテル、または１つの会社の店舗など、極めて狭い範囲でしか使用できないためです。

イーサリアムのような汎用プラットフォームにサービスを展開する利点の１つは、スマートコントラクト（またはトークンの有用性）をプロジェクト間で結びつけることができ、流動性とトークンの有用性が高まること。

#### トークン標準  

* ERC(Ethereum Request for Comments)20
* ERC223
* ERC777
* ERC721
* **ERC1257**

トークン標準は、実装上**最低限**満たすべき仕様。自由に機能を追加できる。

標準の主な目的はコントラクト感の**相互運用性**を促進すること

標準に規定されている関数をどのように実装するかはアナタ次第。
コントラクトの内部機能は標準には関係ない。

#### トークンインターフェイス標準への拡張

トークン標準は機能が制限された最小限のインターフェースを提供する。
アプリケーションに必要な拡張実装を作成されている。
Ex : 

* **所有権の管理**
* **バーニング**
* **ミンティング**
* **クラウドファンディング**
* **キャップ**
* **リカバリバックドア**
* **ホワイトリスティング**
* **ブラックリスティング**

---



### オラクル

##### オラクルの設計パターン

すべてのオラクルは定義上、いくつかの重要な機能を提供する。**↓**

* オフチェーンソースからデータを収集
* 署名されたメッセージ付きでデータをオンチェーンに転送
* データをスマートコントラクトのストレージに入れることで利用可能な状態にする。

一度スマートコントラクトのストレージ内にあるデータが利用可能になると、
オラクルスマートコントラクトの「取得」関数を呼び出すメッセージコールを介して、
他のスマートコントラクトはデータにアクセスすることができる。

オラクルのストレージを「参照」することで、
イーサリアムノードやネットワーク接続型クライアントから
直接アクセスすることができます。

**オラクルのセットアップ方法**
主要３つ **↓**

* リクエスト-レスポンス型
* 出版-購読型
* 即時読み込み型

##### データ認証

DAppによって照会されるデータソースに信頼が足りると仮定しても未解決な問題が残る。
オラクルとリクエスト - レスポンス型の仕組みが別個に運営される場合、この仕組みをどのように信用することができるのかという問題がある。

データ転送中の改ざんなどに対してオフチェーンメソッドが返されてたデータの整合性を検証できることが重要になる。
**真正性の証明**と**TEE(Trust Execution Environment)**はデータ認証の一般的な手法。

**Oraclize** (https://www.oraclize.it/) は、様々な真正性の証明を利用するオラクルサービスの例。

**TLSNotary証明**はイーサリアムメインネットワークからのデータ照会の為の現在利用可能な証明書の一つになる。TLSNotary証明を使用すると、クライアントはクライアントとサーバー間で起きたHTTPS Webトラフィックを第三者に証拠として提供することができる。

Town Crier (https://www.town-crier.org/) は、TEEアプローチに基づいた、認証されたデータを提供するオラクルシステム。ハードウェアベースの安全な独立領域を利用してデータが改ざんされていないことを保証します。

##### 計算オラクル

* cryptlet

* TrueBit(https://www.truebit.io)

##### 非中央集権型オラクル

* ChainLink (https://www.smartcontract.com/link)

----



### 非中央集権型アプリケーション(DApp)

非中央集権型アプリケーション (decentralized application)DAppについて

スマートコントラクトは、アプリケーションの制御ロジックと支払い機能を分散化させる手段。
そしてWeb3 DAppは、アプリケーションのすべての側面（ストレージ、メッセージング、ネーミングなど）を分散化していく。(p281 図)

参考としてcode/auction_dapp (http://www.bit.ly/2DcmjyA)にオークションプラットフォームがある。

#### DAppとは何か

DAppは、大部分またはすべてが非中央集権化されたアプリケーション
以下が非中央集権化できるアプリケーションの要素

* バックエンドソフトウェア (アプリケーションロジック)
* フロントエンドソフトウェア
* データストレージ
* メッセージ通信
* 名前解決

これらの要素は中央集権的にも非中央集権的にもなり得る。
DAppとして作成することには、典型的な中央集権的なアーキテクチャでは提供できない多くの利点があります。

* **耐久性**

  ビジネスロジックはスマートコントラクトによって制御されるため
  DAppのバックエンドは完全に分散化、ブロックチェーン上で管理される。
  中央集権的に管理されるサーバーにデプロイされるアプリケーションとは異なり、
  DAppにダウンタイムはなく、イーサリアムが可動する限り利用可能

* **透明性**

  DAppはチェーン上に展開されるため、誰もがそのコードを検査し、
  DAppの動作に強い確信を持つことができる。
  DAppとの操作ログはブロックチェーン上に永遠に記録される。

* **検閲耐性**

  ユーザーがイーサリアムのノードにアクセスできる限り
  (そして必要であれば自身でノードを立てている限り)
  ユーザーはいつでも中央集権的な管理者からの干渉なしにDAppと通信できる。
  サービス提供者も、スマートコントラクトの作成者自身でさえも、一度スマートコントラクトがネットワーク上にデプロイされるとコードを変更できない。

#### バックエンド（スマートコントラクト）

DAppでは、ビジネスロジック（プログラムコード）とアプリケーションに関連する状態を格納する為に、スマートコントラクトが使用される。

スマートコントラクトは、通常のアプリケーションにおけるサーバーサイド（バックエンドとも呼ばれる）のコンポーネントを置き換えるものであると理解できる。

主な違いの１つは、
スマートコントラクトで実行される計算は非常に大きなコストがかかる為、
可能な限り小さく抑える必要があることです。

したがって、
アプリケーションのどの部分が
信用に足る非中央集権型のプラットフォームを必要とするのか
見極めることが必要。

イーサリアムのスマートコントラクトを使用すると、
スマートコントラクトのネットワークが自身の状態変数の読み書きを行い、
相互にデータの呼び出しや受け渡しができるようなアーキテクチャを構築できる。

スマートコントラクトの複雑さはブロックガスリミットによってのみ制限を受ける。
スマートコントラクトをデプロイすると、そのスマートコントラクトのビジネスロジックは、
将来、多くの開発者が使用できるようになる。

スマートコントラクトは一度デプロイされるとコードの変更が不可能になる。
アクセス可能な SELFDESTRUCT オペコードがプログラムされていれば、
スマートコントラクト自体を**削除**することはできる。が、
いかなる方法でも**変更**はできない。

DAppサイズもスマートコントラクトアーキテクチャ設計の主な検討事項の１つである。
デプロイする際に多額の費用がかからないようオフチェーンで計算したり、
外部データソースを使用する場合もある。
ただし、DAppのコアとなるビジネスロジックを外部データ(中央集権的に管理されたサーバーからのデータなど)に依存させるとDAppのユーザーは外部のリソースを信頼する必要があるという点に注意が必要になる。

#### フロントエンド(Web ユーザーインターフェイス)

DAppのビジネスロジックは EVM, Solidityなどが必要。

DAppのクライアントサイドのインターフェイスは標準のWebテクノロジー(HTML, JavaScriptなど)

メッセージの署名、トランザクションの送信、キーの管理などのイーサリアムとの通信は、多くの場合、MetaMaskなどの拡張機能を備えたWebブラウザを介して行われる。

モバイルDAppを作成することも可能ですが、キーを管理する機能を備えたライトクライアントとして機能するモバイルクライアントが存在しないため、モバイルDAppのフロントエントを作成するときに役立つリソースはない。

通常フロントエンドはweb3.jsというJavaScriptライブラリを介してイーサリアムに接続しますが、web3.jsはフロントエンドのリソースと一緒にWebサーバーによってブラウザに提供される。

#### データストレージ

ガス費用がある、ブロックガスリミットもあるスマートコントラクトは大量のデータの保管や処理には適していない。

ほとんどのDAppはオフチェーンのデータストレージサービスを利用している。

データストレージプラットフォームは(典型的なクラウドデータベースのように)中央集権型的に管理される可能性があるので、**IPFS**やイーサリアムの**Swarm**プラットフォームなどのP2Pプラットフォームに格納することで非中央集権的に管理することができる。

##### IPFS

IPFS(InterPlanetary File System) とは、P2Pネットワーク内のピア間で保存されているオブジェクトを配信する、非中央集権型のコンテントアドレッサブルストレージストレージシステム。

「コンテントアドレッサブル(content addressable)」とは、コンテンツ（ファイル）の各部分のハッシュ値を算出し、ハッシュがそのファイルを識別するために使用されることを意味します。このハッシュを使うことで、任意のIPFSノードから任意のファイルを取り出すことができる。

IPFSは、Webアプリケーション配信用のプロトコルとしてHTTPを置き換えることを目指している。
IPFSの詳細については、https://ipfs.ioを参照。

##### Swarm

Swarmは、IPFSに類似したコンテントアドレッサブルP2Pストレージシステムです。
イーサリアムファンデーションによって、Gethツールの一部として作成されました。
IPFS同様Swarmノードによって配布、複製されるファイルを格納できる。ハッシュを使い
ファイルを参照する。(https://swarm-gateways.net/bzz:/theswarm.eth/)

#### 非中央集権型メッセージ通信プロトコル

**Whisper** (https://bit.ly/2CSls5h)  [Gethツールの一部のP2Pメッセージングプロトコル]

#### 

#### 基本的なDAppの例：オークションDApp

オークションDAppでは、ユーザーは家、車、商標などの特定の資産を表す「Deed (証書)」トークンを登録することができる。トークンが登録されると、トークンの所有権はオークションDAppに移転され、売りに出せるようになる。

登録されたトークンをリスト化し、他のユーザーが入札することができる。各オークションでは、ユーザーはそれぞれのオークションの為に特別に用意されたチャットルームに参加できます。オークションが完了すると証書トークンの所有権がオークションの落札者に移転する。

* **↓**オークションDAppの主なコンポーネント **(p286 図)**
* ERC721ノンファンジブル「Deed (証書)」トークン(DeedRepository) を実装するスマートコントラクト
  * 証書を売却するオークション (AuctionRepository) を実装するスマートコントラクト
  
* Vue / Vuetify JavaScriptフレームワークを使用したWebフロントエンド
  
* イーサリアムチェーンに (MetaMaskまたは他のクライアント経由で) 接続するためのweb3.jsライブラリ
  
* 画像などのリソースを保存するSwarmクライアント
  
* すべての参加者が使用できるオークションごとのチャットルームを作成するWhisperクライアント

> (https://bit.ly/2DcmjyA)

> AuctionRepositoryコントラクト(https://bit.ly/2Ia0o9i)

#### オークションDAppのさらなる非中央集権化

DAppを非中央集権化して耐久性をもたせる方法は２つある

* すべてのアプリケーションコードをSwarmまたはIPFSに格納する。
* ENSを使用してDAppに名前で参照してアクセスする。

##### オークションDAppのSwamへの格納

DApp自体のフロントエンド全体をSwarmに格納し、Webサーバーを運用する代わりにSwarmノードから直接実行することができます。

> 以下ENS とSwarmについての使い方説明を省略( p294〜 )

----

### イーサリアム仮想マシン(EVM)

イーサリアムプロトコルの中心にはイーサリアム仮想マシン
EVM（Ethereum Virtual Machine）がある。

EVMは計算機処理エンジンであり、.NET Framework の仮想マシンや Javaなどの他のバイトコードでコンパイルされたプログラミング言語のインタプリタと大きく異なるわけではない。

EVMはイーサリアムの構成要素の一つで、スマートコントラクトをデプロイあるいは、実行する。

EVMスタックベースのアーキテクチャを持っており、一時的な値はすべてスタックに格納されます。EVMは256ビットのワードサイズで動作する。アドレスを指定してアクセスが可能ないくつかのデータコンポーネントも持っている。

> EVMのアーキテクチャと実行コンテクスト

#### バイトコードの逆アセンブル

高級言語としてのSolidityがEVM上でどのように動作するかを理解する上で、
EVMのバイトコードを逆アセンブルすることは良い方法です。

使用できる逆アセンブラ

* Porosity : 広く使われているオープンソースの逆コンパイラ
* Ethersplay : 逆アセンブラ「Binary Ninja」のEVMプラグイン
* IDA-Evm : 逆アセンブラ「IDA」のEVMプラグイン

#### ガス

**ガス**はイーサリアムにおける基本単位で、イーサリアムのブロックチェーンでアクションを実行する為に必要な、計算リソースとストレージリソースを測定するためのものです。

---

### コンセンサス

* Ethash : イーサリアムのPoWアルゴリズム
* Casper : イーサリアムのPoSアルゴリズム
  * Casper FFG : 「Casper the Friendly Finality Gadget」
  * Casper CBC :「The Friendly GHOST/Correct - by - Construction」

#### コンセンサスの原則

コンセンサスアルゴリズムの原則と前提は、いくつかの質問によってより理解できる。

* 誰がどのように過去と変更できるか（不変性）
* 誰がどのように将来を変更できるか（ファイナリティ）
* そのような変更を行う為のコストはいくらか
* そのような変更を行う権限がどのように非中央集権化しているか
* 何かが変更されたとき、誰がどうやってそのことを知るか



