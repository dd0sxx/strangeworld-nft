/// @title ERC-721 contract for the Lost Souls project by strangeworld.eth
/// @author dd0sxx

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract LostSouls is ERC721 {

    constructor() ERC721('Lost Souls', 'LOST_SOULS') {
       
    }

}