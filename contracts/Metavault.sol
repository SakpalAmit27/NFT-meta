=// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

// Importing OpenZeppelin's standard ERC721 contract with URI storage extension
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

// Define the contract, inheriting ERC721URIStorage functionality
contract NFTMarketplace is ERC721URIStorage {
    
    // State variables for marketplace setup
    address payable public marketplaceOwner;     // Marketplace owner's address
    uint256 public listingFeePercent = 20;       // Default listing fee percentage
    uint256 private currentTokenId;              // Tracks token ID count
    uint256 private totalItemsSold;              // Tracks total NFTs sold

    // Struct for listing each NFT item with details
    struct NFTListing {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
    }

    // Mapping to store each NFT listing by its unique token ID
    mapping(uint256 => NFTListing) private tokenIdListing;

    // Modifier to restrict certain functions to the marketplace owner
    modifier onlyOwner {
        require(msg.sender == marketplaceOwner, "Only owner can call this function");
        _;
    }

    // Constructor: Initializes contract with owner and sets NFT name and symbol
    constructor() ERC721("MetaVault", "NFTS") {
        marketplaceOwner = payable(msg.sender); 
    }

    // Allows the marketplace owner to update the listing fee percentage
    function updateListingFeePercent(uint256 updatedListingFeePercent) public onlyOwner {
        listingFeePercent = updatedListingFeePercent;
    }

    // View function to retrieve the listing fee percentage
    function getListingFeePercent() public view returns (uint256) {
        return listingFeePercent;
    }
    
    // View function to get the current token ID
    function getCurrentTokenId() public view returns (uint256) {
        return currentTokenId;
    }

    // Retrieves the NFT listing details for a given token ID
    function getNFTListing(uint256 _tokenId) public view returns (NFTListing memory) {
        return tokenIdListing[_tokenId];
    }

    // Function to create (mint) a new NFT with URI and set price for listing
    function createToken(string memory _tokenURI, uint256 _price) public returns (uint256) {
        require(_price > 0, "Price must be greater than zero");

        // Increment token ID and assign to newTokenId
        currentTokenId++;
        uint256 newTokenId = currentTokenId;

        // Mint new NFT and set URI
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);

        // Create NFT listing for sale
        _createNFTListing(newTokenId, _price);
        
        return newTokenId;
    }

    // Private function to set up a new NFT listing in the marketplace
    function _createNFTListing(uint256 _tokenId, uint256 _price) private {
        tokenIdListing[_tokenId] = NFTListing({
            tokenId: _tokenId,
            owner: payable(address(0)),    // Initially no owner in marketplace
            seller: payable(msg.sender),   // Seller is the creator
            price: _price
        });
    }

    // Function to execute a sale for a given token ID, transferring ownership
    function executeSale(uint256 tokenId) public payable {
        NFTListing storage listing = tokenIdListing[tokenId];  // Retrieve listing
        uint256 price = listing.price;
        address payable seller = listing.seller;

        // Check if buyer has sent the required price
        require(msg.value == price, "Please submit the asking price to complete the purchase");

        // Update listing owner to buyer
        listing.owner = payable(msg.sender);

        // Increment sold items count
        totalItemsSold++;

        // Transfer NFT ownership from seller to buyer
        _transfer(seller, msg.sender, tokenId);

        // Calculate and distribute listing fee
        uint256 listingFee = (price * listingFeePercent) / 100;
        marketplaceOwner.transfer(listingFee);
        seller.transfer(msg.value - listingFee);  // Seller gets the remaining amount
    }

    // Function to retrieve all NFTs listed on the marketplace
    function getAllListedNFTs() public view returns (NFTListing[] memory) {
        uint256 totalNFTCount = currentTokenId;
        NFTListing[] memory listedNFTs = new NFTListing[](totalNFTCount);
        uint256 currentIndex = 0;

        // Loop through all token IDs to retrieve each listing
        for (uint256 i = 0; i < totalNFTCount; i++) {
            uint256 tokenId = i + 1;
            NFTListing storage listing = tokenIdListing[tokenId];
            listedNFTs[currentIndex] = listing;
            currentIndex++;
        }

        return listedNFTs;
    }

    // Function to get all NFTs owned by the caller (user)
    function getMyNFTs() public view returns (NFTListing[] memory) {
        uint256 totalNFTCount = currentTokenId;
        uint256 myNFTCount = 0;
        uint256 currentIndex = 0;

        // Count the NFTs owned by the caller
        for (uint256 i = 0; i < totalNFTCount; i++) {
            if (tokenIdListing[i + 1].owner == msg.sender || tokenIdListing[i + 1].seller == msg.sender) {
                myNFTCount++;
            }
        }

        // Create array for the caller's NFTs
        NFTListing[] memory myNFTs = new NFTListing[](myNFTCount);

        // Populate array with the caller's NFTs
        for (uint256 i = 0; i < totalNFTCount; i++) {
            if (tokenIdListing[i + 1].owner == msg.sender || tokenIdListing[i + 1].seller == msg.sender) {
                NFTListing storage listing = tokenIdListing[i + 1];
                myNFTs[currentIndex] = listing;
                currentIndex++;
            }
        }

        return myNFTs;
    }
}
