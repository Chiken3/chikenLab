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

```
