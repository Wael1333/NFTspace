// contracts/MyNFT.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/utils/Counters.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "../node_modules/hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds; //Every NFT have a unique ID
    Counters.Counter private _itemsSold; //this is to keep the track on how many tokens are getting sold

    uint256 listingPrice = 0.0015 ether;

    address payable owner; //whoever lunches this Model will own the market

    mapping(uint256 => MarketItem) private idMarketItem; // this is a structure in which it will contain all the details about every NFT

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
    }

    event idMarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold
    ); //whenever there is a buying or selling we need this event to handle that

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "only owner of the marketplace can change the listing price!"
        ); 
        ;  
    }

    constructor() ERC721("NFT Space Token", "NFTSPACE") {
        owner == payable(msg.sender);
    }

    //this function will allow people to pay me as they buy or sell but only the owner is able to update the listing of this pricing
    function updateListingPrice(
        uint256 _ListingPrice
    ) public payable onlyOwner {
        listingPrice = _ListingPrice;
    }

    //making sure that whoever is gonna buy know exactly the price of NFT thing bought

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    //Let create "CREATE NFT TOKEN NFT FUNCTION"
    function createToken(
        string memory tokenURI,
        uint256 price
    ) public payable returns (uint256) {
        _tokenIds.increment(); //whoever creates an nftit will increase
        uint256 newTokenId = _tokenIds.current(); //asigning the toekn id that got incremented to a new one that will be our nft

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(newTokenId, price);
        return newTokenId;
    }

    //Creating MARKET ITEMS
    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(msg.value == listingPrice, "Price must be equal to the listed");

        idMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender), //msg is for everybody who tries to call the function
            payable(address(this)), //this means the nft or the money belongs to the contract
            price,
            false //nft not sold so false
        );

        _transfer(msg.sender, address(this), tokenId); //tokenId have the entire data about that specesific nft and then we transfer it from owner to my smart contract

        emit idMarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            false
        ); //calling an even using emit
    }

    //FUNCTION for Resale Token selling the NFT

    function reSelltoken(uint256 tokenId, uint256 price) public payable {
        require(
            idMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this purchase"
        ); //when somone will call this function is to change a price so anybody can access it then according to the owner we cheack both ids if they match the resell happens

        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );

        idMarketItem[tokenId].sold = false;
        idMarketItem[tokenId].price = price;
        idMarketItem[tokenId].seller = payable(msg.sender);
        idMarketItem[tokenId].owner = payable(address(this));
        //when somone will resell the nft the contract becomes the owner

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    //Create MARKETSALES

    function createSales(uint256 tokenId) public payable {
        uint256 price = idMarketItem[tokenId].price;

        require(msg.value == price, "Please ensert the exact price available");

        idMarketItem[tokenId].owner = payable(msg.sender);
        idMarketItem[tokenId].sold = true;
        idMarketItem[tokenId].owner = payable(address(0));

        //updating the data now the owner is back to its form not the market and the NFT has been sold

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice); //i ll get the nft that i assigned or the fee
        payable(idMarketItem[tokenId].seller).transfer(msg.value); //the seller will get his exact price that he sold with
    }

    //GETTING unsold NFT data

    function fetchMarketItem() public view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount); //listing the unsold NFT DATA in this array
        for (uint256 i = 0; i < itemCount; i++) {
            if (idMarketItem[i + 1].owner == address(this)) {
                uint256 currentId = i + 1;

                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //PURCHASE ITEMS

    function fetchNFT() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    //SINGLE USER ITEMS

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint256 totalCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint256 i = 0; i < totalCount; i++) {
            if (idMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;

                MarketItem storage currentItem = idMarketItem [currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;

            } 
        }  
        return items;
    }
}
