# Ethereum

Ethereumのウォレットの選択

* MetaMask (Webベース)
* Jaxx (モバイル＆デスクトップ)
* MyEtherWallet (Web)
* Emerald Wallet (デスクトップ)

はじめにMetaMaskを使ってみる.

#### Solidityでコントラクトを作る

Solidityコンパイラは、様々なフレームワークの一部としてスタンドアローンの実行可能ファイルとして提供されており、統合開発環境（Integrated Development Environment : IDE）に包含されています。

ここでは「Remix」と呼ばれるIDEを使用する

#### Ethereumの環境を構築
今回はEthereumの3つのオリジナルの実装(Go, Python, C++)のうちGoでかかれた実装である通称Go Ethereum(Geth)で環境を構築する。<br>


## ERC721のトークンを作る

ERC721:スマートコントラクト内でNon-Fungible Tokenを扱えるようにしたものです。

### TokenURI設定
ERC721ではトークンを発行する際にTokenURIの設定が必要

JSONファイルのURLを設定することでトークンの画像や情報を登録できる。

