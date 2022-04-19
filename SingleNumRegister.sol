pragma solidity ^0.8.11;
contract SingleNumRegister {
    uint storedData;
    function set(uint x) public{
        storedData = x;
    }
    function get() public returns (uint retVal) {
        return storedData;
    }
}
