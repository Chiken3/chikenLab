pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; //この中にERC721.sol がインポートされている。
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTkey is ERC721 {
    constructor() ERC721("NFTkey", "NFTK") {
    }
}