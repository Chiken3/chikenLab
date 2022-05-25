# Solidity と Ethereum による実践スマートコントラクト開発 まとめ

#### Solidity

Solidity では、**トランザクション (tx) の属性**として次の２つを定義している。

* gasPrice
  	トランザクションを作成した EOA が設定するガス価格 (ウェイ建て)。
* origin
  	トランザクションを作成した EOA のアドレス。
  	意外なことに、このアドレスが役立つことはめったになく危険なことが多い。	

トランザクション関連の属性を他にも定義しているが、
それらを抽象的なメッセージ (msg) という概念にまとめている。
メッセージは、コントラクトとそれらのコントラクトを呼び出せるもの (他のコントラクトなど) の間のやり取りを表す。
Solidity では、**メッセージ (msg) の属性**として次の4つを定義している。

* data
  	現在実行されている外部関数またはパブリック関数に送信されたデータの生バイト。
  	コールデータとも呼ばれる。

* sender
  	現在実行されている外部関数またはパブリック関数の呼び出し元のアドレス。

* sig

  ​	呼び出されている関数を特定するための、コールデータの最初の 4 バイト。関数IDとも呼ばれる。

* value

  ​	この関数に送信されているウェイの量

  

  また、**block の属性**として次の 6 つを定義している。

* number

  ​	新しいブロックを作成するたびに、この数が増える。最初の墓ロックはブロック 0

* timestamp

  ​	ブロックが作成された時刻 (UNIX エポック) 。そのエイリアスである now が使われることのもある。

* blockhash

  ​	連続的なブロック番号に加えて、各ブロックはハッシュ値に依って一意に識別される。
  ​	ハッシュ値は16進数である。現在のブロックのハッシュ値は入手できないが、ブロック番号を指定すれ	ば、直近の 256 ブロックまでならどのブロックのハッシュ値でも入手できる。

* difficulty

  ​	現在のブロックのマイニングの難易度。

* gaslimit

  ​	このブロックで消費できるガスの最大量。ブロックの作成者が設定する。

* coinbase

  ​	ブロック作成者のアドレス。



---



#### スマートコントラクトの時間表現

ほとんどのプログラミング言語では、プログラムを実行しているコンピュータが報告する時刻が使われる。
例) Node.js上のJavaScript プログラムは、実行時の現在の時刻を出力する。

```javascript
for(let i = 0; i < 10; i++){
   console.log(new Date()) 
}
```

このプログラムに相当する Solidity のコードは次のようになる。
```solidity
pragma solidity ^0.5.0;
contract TimeReporter {
	event TimeLog(uint256 time);
	
	function reportTime() public {
		for(uint8 i=0; i<10; i++) {
			emit TimeLog(block.timestamp);
		}
	}
}
```

この関数が生成するすべてのイベントの time 属性は全く同じものになる。 
time属性はブロックがブロックチェーンに追加された時刻を表し、block.timestampに基づいて設定される。
そのブロック内のどのトランザクションでも、block.timestamp 属性の値は同じになる。

---

### スマートコントラクトを開発するための準備

Ethereum client : Parity

#### Parity のインストール

Parity の github から参照
https://www.parity.io/technologies/ethereum/



1. 依存関係の構築

   ​	最新の安定した Rust バージョンが必要。
   ​	[rustup](https://rustup.rs/) を介してRustをインストールする。(インストール終了後shellの再起動を求められる)
   ​	他にも g++ , pkg-config , file , make , cmake のパッケージもインストールが必要

   ```bash
   $ rustup --version #Rustのtoolchainインストーラー確認
   $ rustc --version  #Rustを使えるようになったか確認(parityに合わせたrustのversionにする。必ずしも最新版で動かないparity目線の最新にする。)
   ```

   ​	

   



Memo

---

鍵の即時性

まずWeb2のOAuth2.0のシーケンス図を理解　図解

OAuth2.0ライブラリを実装しながら理解

鍵の権利移譲（渡される人が発生した場合OAuth2.0）のシーケンス図を書く

転々譲渡性か

オープンループかクローズドループ



木曜までにドキュメントを

関連鍵ユーティリティトークン



いあまるやつをけす 

家族分の概念

curlでOAuth認証 => 鍵を動かす

 メタマスク アプリ





DAO https://aragon.org/ 作ってみる

DeFi (Decentralizd Finance)

DEX (Decentralized Exchange)

DID (Decentralized Identity)

eKYC (電子個人確認)　　TRUSTDOCK[日本版]













