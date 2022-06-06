# openzepplin ERC721 を元にNFTを作り,拡張する。
1. OpenZepplelin が作成している ERC721 を動かしてみる
<br>
https://docs.openzeppelin.com/contracts/4.x/erc721

```bash
$ truffle init
```
contract/NFTkey.sol
```js solidity
pragma solidity ^0.8.0;

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


