pragma solidity ^0.8.11;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/presets/ERC721PresetMinterPauserAutoId.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is Context, ERC721Enumerable {
    constructor(
        string memory name,
        string memory symbol
    ) ERC721(name, symbol) {}
    function mint(address to) public virtual {
        _mint(to, totalSupply());
    }
    
}