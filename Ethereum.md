# Ethereum

### Ethereumのウォレットの選択

* MetaMask (Webベース)
* Jaxx (モバイル＆デスクトップ)
* MyEtherWallet (Web)
* Emerald Wallet (デスクトップ)

はじめにMetaMaskを使ってみる.

### コントラクトを作る

* Ethereumのコントラクトは、資産を制御するプログラムで、EVMと呼ばれる仮想マシン内で実行される。コントラクトを作成するのは特別なトランザクション。

* コントラクトがブロックチェーン上に作成されると、ウォレットのようにイーサリアムアドレスを持つ。

* 誰かがコントラクトアドレスにトランザクションを送信すると、そのトランザクションの入力としてEVMでコントラクトが実行される。

* コントラクトアドレスに送信されたトランザクションはイーサまたはデータ、あるいは両方持つことができる。

* トランザクションにイーサが含まれている場合は、コントラクト残高にそのイーサが預け入れられている。

* トランザクションにデータが含まれている場合、データはコントラクト内で名前付き関数を指定して呼び出し、その関数に引数を渡すことができる。

コントラクト履歴表示：https://ropsten.etherscan.io/

### Solidity

Solidityコンパイラは、様々なフレームワークの一部としてスタンドアローンの実行可能ファイルとして提供されており、統合開発環境（Integrated Development Environment : IDE）に包含されています。

**ここでは「Remix」と呼ばれるIDEを使用する**

https://remix.ethereum.org/

ファウセットコントラクトには独自のアドレスがあることに注意

Faucet at 0x5616ce1902Cd09d17f38e18a2135b30851fb2d2C



https://cryptozombies.io/jp/lesson/1/chapter/1

### Ethereumのクライアント環境を構築

Ethereumの仕様は、「イエローペーパー」と呼ばれる英語と数式の使用を組み合わせた論文に記載

今回はEthereumの3つのオリジナルの実装(Go, Python, C++)のうちGoでかかれた実装である通称Go Ethereum(Geth)で環境を構築する。

Ethereumを使った開発において、

* メインネット上で動作するフルノード、
* テストネットノード、
* Ganacheなどのローカルプライベートブロックチェーン、
* Infuraなどのサービスプロバイダが提供するクラウドベースのイーサリアムクライアント

を使用してほとんどの作業ができる。

今回はローカルプライベートブロックチェーンのクライアントで開発する。

https://geth.ethereum.org/docs/interface/private-network

### Go-Ethereum (Geth)

https://geth.ethereum.org/

リポジトリをクローン

```
$ git clone https://github.com/ethereum/go-ethereum
$ cd go-ethereum
$ make geth
$ ./build/bin/geth version #動作確認
```



> 「リモートクライアント」と「ウォレット」という用語は同じ意味で使用されていますが、いくつかの違いがある。通常リモートクライアントはウォレットのトランザクション機能に加えてAPI(web3.js APIなど)も提供します。

> > イーサリアムの「リモートウォレット」の概念をライトクライアント( light client : ビットコインのSimplified Payment Verification クライアントに類似している ) と混同しないように注意

> ライトクライアントは、ブロックヘッダーを検証し、マークルプルーフを使用しブロックチェーンにトランザクションが含まれていることを検証する。

> リモートクライアントは、ブロックヘッダー及びトランザクションを検証しない。
> リモートクライアントはフルクライアントを完全に信頼し、ブロックチェーンへのアクセスを許可します。そのため、重要なセキュリティと匿名性の保証が大きく失われる。
> 自身でフルクライアントをたてて使用することで、この問題はいくらか軽減する。




## ERC721のトークンを作る

ERC721:スマートコントラクト内でNon-Fungible Tokenを扱えるようにしたものです。

### TokenURI設定
ERC721ではトークンを発行する際にTokenURIの設定が必要

JSONファイルのURLを設定することでトークンの画像や情報を登録できる。



https://github.com/ethereum/EIPs/issues/1257

https://partners.candyhouse.co/

https://doc.candyhouse.co/ja/SesameAPI
