# Solidity

CriptZombie　全体像

```solidity
pragma solidity ^0.4.19;

contract ZombieFactory {

    event NewZombie(uint zombieId, string name, uint dna); // イベントをここで宣言するのだ

    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;

    struct Zombie {
        string name;
        uint dna;
    }

    Zombie[] public zombies;

    function _createZombie(string _name, uint _dna) private {
        zombies.push(Zombie(_name, _dna));
        event NewZombie(uint zombieId, string name, uint dna); uint id = zombies.push(Zombie(_name, _dna)) - 1;
        NewZombie(id, _name, _dna);//ここでイベントを発生させるのだ
    }

    function _generateRandomDna(string _str) private view returns (uint) {
        uint rand = uint(keccak256(_str));
        return rand % dnaModulus;
    }

    function createRandomZombie(string _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }

}
```



---

```solidity
pragma solidity //　1. solidityのバージョン

contract SampleContract{
	uint dnaDigits = 100;//以下の部分がブロックチェーンに記載
	uint dnaModulus = 10 ** dnaDigits;
	struct Cat {
		string name;
		uint dna;
	}//構造体の書き方
	
	Cat[] public cats; //パブリックなCat構造体の配列cats。
	function eat(string _name, uint _amount) {

	}//関数宣言
	
	struct Person {
		uint age;
		string name;
	}
	Person[] public people;
	//インスタンス生成
	Person satoshi = Person(24,"Satoshi");
	//それを配列に格納
	people.push(satoshi);
	//一行で書くと
	people.push(Person(14,"Alice"));
	
	string greeting = "What's up dog";
	function sayHello() public returns (string) {
  		return greeting;
	}
}//　2. ここにコントラクトを作成
```

* **符号なし整数：uint**

  符号なし整数のデータ型で、負数でないことを示している。intは符号付整数を示す。

* **数式演算**

  Solidityの数式は他のプログラムと全く同じ

  「+」「-」「*」「/」「%」「 **(指数)」

* **構造体 struct**

  構造体を使えば、複数のプロパティを持つ複雑なデータ型を作成することができる。

* **配列**

  Solidityには２種類の配列がある。固定長と可変長の配列の２つ。

  構造体の配列も作れる。

  配列をpublicで宣言すれば、Solidityが自動でgetterメソッドを作成する。
  publicにすれば、他のコントラクトもこの配列を読み込めるが書き込めない。

* **関数宣言**

  ```solidity
  function eat(string _name, uint _amount) {
  
  }
  eat("hamburgers", 10);
  ```

  ※ グローバル変数と区別をつける為、関数パラメータ変数名はアンダースコア（_）をつけるのが通例（必須ではない）

* **関数：戻り値**

  ```solidity
  string greeting = "What's up dog";
  
  function sayHello() public returns (string) {
    return greeting;
  }
  ```

  Solidityは関数の宣言に戻り値の型を含む。

  **関数の修飾子**

  ```solidity
  function sayHello() public view returns (string) {}
  function _multiply(uint a, uint b) private pure returns (uint) {
    return a * b;
  }
  ```

  このケースでは**view**関数を宣言できる。これはつまりデータの読み取り専用で編集できない。

  Solidityには**pure**関数がある。これを使うとアプリ内のデータにすらアクセスできない。

* **Keccak256と型キャスト**

  ```solidity
  keccak256("aaaab"); //keccak256
  uint8 a = 5;
  uint b = 6;
  // 正しく動作させるために、bをuint8に型キャストさせる：
  uint8 c = a * uint8(b); 
  ```

* **イベント**

  **Events** は、ブロックチェーンで何かが生じたときに、コントラクトがアプリのフロントエンドに伝えることができるものだ。しかも特定のイベントを'listening'状態にして、何かあった時にアクションを起こすこともできるのだ。

  ```solidity
  event IntAdd(uint x, uint y, uint result);
  function add(uint _x, uint _y) public {
  	uint result = _x+ _y;
  	IntAdd(_x, _y, result);//関数呼び出しを通知
  	return result;
  }
  ```

* **Mapping(マッピング)**

  データを格納するときSolidityで使える方法の一つ。

  ```solidity
  // 金融系のアプリの場合、ユーザーのアカウントの残高にuintを格納する：
  mapping (address => uint) public accountBalance;
  // もしくは、ユーザーIdを基にユーザー名を参照・格納するために使用するぞ：
  mapping (uint => string) userIdToName;
  ```

* **Msg.sender**

  Solidityのグローバル変数の一つ。これを使用すると、その関数を呼び出したユーザー(またはスマートコントラクト)のaddressを参照できる。

  ```solidity
  mapping (address => uint) favoriteNumber;
  function setMyNumber(uint _myNumber) public {
  	// ここでは`favoriteNumber` mappingを更新して、`msg.sender`下に`_myNumber`を格納するぞ。
  	favoriteNumber[msg.sender] = _myNumber;
  }
  function whatIsMyNumber() public view returns(uint) {
    // 送信者のアドレスに格納されている値を受け取る
    // もし送信者が`setMyNumber`を呼び出さなかった場合は`0`だ
    ruturn favoriteNumber[msg.sender];
  }
  ```

* **Require**

  requireはある条件を満たさない場合はエラーを投げて実行を止めることができる。

  ```solidity
  function sayHiToVitalik(string _name) public returns (string) {
  	// まず_nameが"Vitalik"と同じかどうか比較する。真でなければエラーを吐いて終了させる。
    	//（注：Solidityはネイティブで文字列比較ができない。そこで文字列の比較を
    	// するためにkeccak256 を使ってハッシュ同士を比較する方法を使うのだ。
    	require(keccak256(_name) == keccak("Vitalik"));
    	//もし真ならば、関数を処理する
    	return "Hi!";
  }
  ```

  この`require` は条件次第で関数を実行したいときにかなり使える

* **継承**

  Solidityのコンストラクトの継承 DogeからBabyDogeへ継承例

  ```solidity
  contract Doge {
  	function catchphrase() public returns (string) {
  		return "So Wow CryptoDoge";
  	}
  }
  
  contract BabyDoge is Doge {
  	function anotherCatchphrase() public returns (string) {
  		return "Such Moon BabyDoge"
  	}
  }
  ```

  この場合、コンパイルしてBabyDogeを実行すれば、catchphrase()とanotherCatchphrase()の両方（それとDogeで定義した場合のpublic関数）にアクセスできる。

* **Import**

  ファイルがいくつかある場合で、別ファイルをインポートしたい場合、Solidityにはimport機能がある。

  ```solidity
  import "./somothercontract.sol";
  
  contract newContract is SomeOtherContract{
  	
  }
  ```

  このコントラクトと同じディレクトリ（`./`はそういう意味 )にimportしたいファイルがあれば、コンパイラがインポートする。

* **ストレージ vs メモリ**
  Storageはブロックチェーン上に永久に格納される変数。
  Memoryは一時的な変数で外部関数をコントラクトに呼び出す際に消去されるもの。
  状態変数（関数外で宣言された変数のこと）の場合はデフォルトでstorage,
  関数内で宣言された変数はmemoryとして設定されている。

  ```solidity
  contract SandwichFactory {
  	struct Sandwich {
  		string name;
  		string status;
  	}
  	
  	Sandwich[] sandwiches;
  	
  	function eatSandwich(uint _index) public {
  		// Sandwich mySandwich = sandwiches[_index];
      	// ^ かなり簡単に見えるが、この場合Solidityが明示的に`storage` や `memory`を
      	// 宣言するように警告が出るはずだ。
      	//そこで、storage と宣言
      	Sandwich storage mySandwich = sandwiches[_index];
      	mySandwich.status = "Eaten";
      
  	}
  }
  ```

* 