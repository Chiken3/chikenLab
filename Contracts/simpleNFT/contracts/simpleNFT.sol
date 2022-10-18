// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract simpleNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
  mapping(uint => string) public tokenName;

    constructor(string memory name, string memory symbol) 
        ERC721(name, symbol)
    {}

    function createKey(string memory name, string memory tokenURI)
        public
        returns (uint256)
    {
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        tokenName[newTokenId] = name;
        _tokenIds.increment();
        return newTokenId;
    }

    function getTokenName(uint256 tokenId) external view returns (string memory) {
        return tokenName[tokenId];
    }
}
