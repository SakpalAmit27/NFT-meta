// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTSTORE is ERC721URIStorage{

    address payable public marketplaceOwner;
    uint256 public listingFeePercent = 20; 
    uint256 private currentTokenId; 
    uint256 private totalItemsSold;


    struct NFTListing{
        uint256 tokenId; 
        address payable owner; 
        address payable seller; 
        uint256 price;
    }

    mapping (uint256 => NFTListing) private tokenIdListing;

    modifier onlyOwner{
        require(msg.sender == marketplaceOwner,"Only owner can call this function");

    }

    constructor()ERC721("MetaVault","NFTS"){
        marketplaceOwner = payable(msg.sender); 
    }
    
    
}


