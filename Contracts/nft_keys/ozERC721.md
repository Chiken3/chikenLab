# openzepplin ERC721 を元にNFTを作り,拡張する。
1. OpenZepplelin が作成している ERC721 を動かしてみる
<br>
https://docs.openzeppelin.com/contracts/4.x/erc721

```bash
$ truffle init
```
contract/NFTkey.sol
```js solidity
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; //この中にERC721.sol がインポートされている。
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTkey is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("NFTkey", "KYE") {}

    function awardKey(address player, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newKeyId = _tokenIds.current();
        _mint(player, newKeyId);
        _setTokenURI(newKeyId, tokenURI);

        _tokenIds.increment();
        return newKeyId;
    }
}
```


EIP-712 : 非代替トークン標準 https://eips.ethereum.org/EIPS/eip-721 <br>
簡単な要約として「 NFTの標準的なインターフェースまたは、証書(Deed)とも呼ばれる。 」とある。

EIP-712 は スマートコントラクト内のNFT用の標準APIの実装が可能。<br>
NFTを追跡及び、転送するための機能を提供する。

NFTが個人によって所有及び取引されているユースケースと、サードパーティーのブローカー/ウォレット/競売者への委託を検討している。

* 物理的財産   - 家, ユニークなアート
* 仮想的収集品 - デジタルアートなど
* 負 の財産    - 負債, 様々な責任

以下 ERC 721 の仕様

```js
interface ERC721 {
    // 所有権が何らかのメカニズムで変更されたときに発行される。
    // NFTが生成(from == 0)と破棄(to == 0)の際にもイベントが発生する
    // コントラクト作成時に任意の数のNFTを生成し割り当てることもできる。
    // 転送時に、そのNFTの承認済みアドレスは none にリセットされる。
    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);

    // NFT の承認済みアドレスが変更または再確認されたときに発する。
    // ゼロアドレスは、承認されたアドレスがないことを示します。
    // Transferイベントが発生した場合、NFT承認アドレスをnoneにリセットすることを示す。
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);

    // オーナーに対してオペレータが有効または無効になったときに発する。
    // オペレーターは、オーナーのすべてのNFTを管理することができます。
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);
    
    // @通知 オーナーに割り当てられたすべてのNFTをカウント
    // ゼロアドレスのNFTは無効である。
    // @param _owner 残高問い合わせアドレス
    // @return 所有者 '_owner'が所有するNFTの数
    function balanceOf(address _owner) external view returns (uint256);

    // @notice NFTの所有者を示す
    // @param _tokenId NFTの識別子
    // ゼロアドレスに割り当てられたNFTは無効とみなされ、クエリを投げる。
    // @return NFTの所有者のアドレス
    function ownerOf(uint256 _tokenId) external view returns (address);

    // @notice NFTの所有権をある住所から別の住所に移転する。
    // msg.sender`が現在の所有者、認可されたオペレータ、またはこのNFTの承認されたアドレスでない場合にスローされます。
    // from` が現在の所有者でない場合にスローされます。
    // to` がゼロのアドレスの場合にスローされます。
    //tokenId' が有効な NFT でない場合にスローされます。転送が完了すると、この関数は `_to` がスマートコントラクトであるかどうかをチェックします（コードサイズ > 0）。もしそうなら、`_to`に対して 'onERC721Received' を呼び出し、戻り値が 'bytes4(keccak256("onERC721Received(address,address,uint256,bytes))' でない場合は投げる。）
    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes data) external payable;
    
    // @notice NFTの所有権をある住所から別の住所に移転する。
    // この関数は、データ・パラメータを追加した他の関数と同じように動作します。 ただし、この関数は単にデータを""に設定するだけです。
    // @param _from NFTの現在の所有者
    // @param _to 新しい所有者
    // @param _tokenId 転送するNFT
    function safeTransferFrom(address _from, address _to, uint256 _tokenId) external payable;

    // @notice NFTの所有権を譲渡する -- _to がNFTを受信できることを確認するのは呼び出し側の責任であり、さもなければ永久にうしなわれる可能性がある。
    // msg.sender`が現在の所有者、承認されたオペレータ、またはこのNFTの承認されたアドレスでない場合にスローされます。
    // from` が現在の所有者でない場合にスローされる。
    // to` がゼロのアドレスの場合にスローされる。
    // tokenId` が有効な NFT でない場合にスローされる。
    // @param _from 現在のNFTの所有者
    // @param _to 新しい所有者
    // @param _tokenId 転送するNFT
    function transferFrom(address _from, address _to, uint256 _tokenId) external payable;

    // @notice お知らせNFTの承認済み住所の変更または再確認
    // ゼロアドレスは、承認されたアドレスがないことを示す。
    // msg.sender`が現在のNFTの所有者、または認可された者でない場合にスローされます。
    // @param _oparator Address to add to the set of authorized operators
    // @param _approved オペレータが承認された場合は true、承認を取り消す場合は false とする。
    //_tokenId 承認するNFT
    function approve(address _approved, uint256 _tokenId) external payable;

    // @param _approved オペレータが承認された場合は true、承認を取り消す場合は false とする。
    function setApprovalForAll(address _operator, bool _approved) external;

    function getApproved(uint256 _tokenId) external view returns (address);

    function isApprovedForAll(address _owner, address _operator) external view returns (bool);
}

interface ERC165 {
    function supportsInterface(bytes4 interfaceID) external view returns (bool);
}
```
