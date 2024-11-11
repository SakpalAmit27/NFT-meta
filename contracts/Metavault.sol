// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTSTORE is ERC721URIStorage {

    address payable public marketplaceOwner;
    uint256 public listingFeePercent = 20; 
    uint256 private currentTokenId; 
    uint256 private totalItemsSold;

    struct NFTListing {
        uint256 tokenId; 
        address payable owner; 
        address payable seller; 
        uint256 price;
    }

    mapping (uint256 => NFTListing) private tokenIdListing;

    modifier onlyOwner {
        require(msg.sender == marketplaceOwner, "Only owner can call this function");
        _;
    }

    constructor() ERC721("MetaVault", "NFTS") {
        marketplaceOwner = payable(msg.sender); 
    }

    function updateListingFeePercent(uint256 _listingFeePercent) public onlyOwner {
        listingFeePercent = _listingFeePercent;
    }

    function getListingFeePercent() public view returns (uint256) {
        return listingFeePercent;
    }
    
    function getCurrentTokenId() public view returns (uint256) {
        return currentTokenId;
    }

    function getNFTlisting(uint256 _tokenId) public view returns (NFTListing memory) {
        return tokenIdListing[_tokenId];
    }

    function createToken(string memory _tokenURIs, uint256 _price) public returns (uint256) {
        require(_price > 0, "Price must be greater than zero");

        currentTokenId++; 
        uint256 newTokenId = currentTokenId;
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURIs);

        _createNFTListing(newTokenId, _price);
        
        return newTokenId;
    } 

    function _createNFTListing(uint256 _tokenId, uint256 _price) private {
        tokenIdListing[_tokenId] = NFTListing({
            tokenId: _tokenId,
            owner: payable(address(0)),
            seller: payable(msg.sender),
            price: _price
        });
    }
}
