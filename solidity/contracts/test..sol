// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
import "@openzeppelin/contracts/utils/Counters.sol"; // Bộ đếm
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol"; // Tiêu chuẩn viết hợp đồng
import "@openzeppelin/contracts/token/ERC721/ERC721.sol"; // Để kế thừa _tokenURL
import "hardhat/console.sol";

contract NFTMarketplace1 is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    uint256 listingPrice = 0.00025 ether; // Giá tiền trả cho sàn
    address payable owner; // địa chỉ chủ chợ
    mapping(uint256 => MarketItem) private idToMarketItem;
    struct MarketItem {
        uint256 tokenId;
        string img;
        address payable seller; // địa chỉ thg bán
        address payable owner; // địa chỉ ng tạo ra
        uint256 price; // giá nft
        uint time;
        bool sold; //đã được bán hay chưa
        uint256 status;
        uint256 date;
        string name;
        string description;
    }
    event MarketItemCreated(
        //event
        uint256 indexed tokenId,
        string img,
        address seller,
        address owner,
        uint256 price,
        uint time,
        bool sold,
        uint256 status,
        uint256 date,
        string name,
        string description
    );

    constructor() ERC721("ThanhThuy", "TT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint _listingPrice) public payable {
        require(
            owner == msg.sender,
            "Only marketplace owner can update listing price."
        );
        listingPrice = _listingPrice; // điều chỉnh giá thuê sàn
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function changeTokenUri(
        uint256 tokenId,
        string memory token
    ) public payable {
        _setTokenURI(tokenId, string(bytes.concat(bytes(tokenURI(tokenId)), ";", bytes(token))));
    }

    function createToken(
        string memory tokenURI,
        string memory name,
        string memory img,
        string memory description
    ) public payable returns (uint) {
        _tokenIds.increment(); //tăng id
        uint256 newTokenId = _tokenIds.current(); //tạo id mới
        _mint(msg.sender, newTokenId); // tạo ra nft
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, name, img, description); // tạo item
        return newTokenId;
    }

    function createMarketItem(
        uint256 tokenId,
        string memory name,
        string memory img,
        string memory description
    ) private {
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            img,
            payable(address(0)),
            payable(msg.sender),
            0,
            block.timestamp,
            true,
            0,
            block.timestamp * 1000,
            name,
            description
        );
        _itemsSold.increment();
        emit MarketItemCreated(
            tokenId,
            img,
            address(0),
            msg.sender,
            0,
            block.timestamp,
            true,
            0,
            block.timestamp * 1000,
            name,
            description
        );
    }

    function updateToken(
        uint256 tokenId,
        string memory tokenURI,
        string memory img,
        string memory description
    ) public payable {
        changeTokenUri(tokenId, tokenURI);
        idToMarketItem[tokenId].img = img;
        idToMarketItem[tokenId].description = description;
    }

    function resellToken(
        uint256 tokenId,
        string memory tokenURI,
        string memory name,
        uint256 price,
        uint256 date,
        string memory description
    ) public payable {
        // bán lại sau khi mua
        require(
            idToMarketItem[tokenId].owner == msg.sender,
            "Only item owner can perform this operation"
        );
        require(
            date > block.timestamp * 1000,
            "Only item owner can perform this date"
        );
        require(
            msg.value == listingPrice,
            "Price must be equal to listing price"
        );
        require(
            idToMarketItem[tokenId].status == 0,
            "Price must be equal to status"
        );
        changeTokenUri(tokenId, tokenURI);
        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        idToMarketItem[tokenId].time = block.timestamp;
        idToMarketItem[tokenId].name = name;
        idToMarketItem[tokenId].date = date;
        idToMarketItem[tokenId].description = description;
        _itemsSold.decrement();
        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(
        uint256 tokenId,
        string memory tokenURI
    ) public payable {
        // mua item
        uint price = idToMarketItem[tokenId].price;
        address payable creator = idToMarketItem[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        require(
            idToMarketItem[tokenId].seller != payable(msg.sender),
            "Please submit the asking price in order to complete the purchase"
        );
        changeTokenUri(tokenId, tokenURI);
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        idToMarketItem[tokenId].time = block.timestamp;
        idToMarketItem[tokenId].status = 1;
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(creator).transfer(msg.value);
    }

    function deleteMarketSale(
        uint256 tokenId,
        string memory tokenURI,
        string memory description
    ) public payable {
        // thu hồi
        uint price = idToMarketItem[tokenId].price;
        address payable creator = idToMarketItem[tokenId].seller;
        require(
            msg.value == price,
            "Please submit the asking price in order to complete the purchase"
        );
        require(
            idToMarketItem[tokenId].seller == payable(msg.sender),
            "Please submit the asking price in order to complete the purchase"
        );
        changeTokenUri(tokenId, tokenURI);
        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));
        idToMarketItem[tokenId].time = block.timestamp;
        idToMarketItem[tokenId].status = 2;
        idToMarketItem[tokenId].description = description;
        _itemsSold.increment();
        _transfer(address(this), msg.sender, tokenId);
        payable(owner).transfer(listingPrice);
        payable(creator).transfer(msg.value);
    }

    function fetchMarketItemsAll() public view returns (MarketItem[] memory) {
        // lấy tất cả item có trên sàn
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMarketItemsUpComing()
        public
        view
        returns (MarketItem[] memory)
    {
        // lấy tất cả item có trên sàn
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                idToMarketItem[i + 1].time >= block.timestamp - 1 days &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == address(this) &&
                idToMarketItem[i + 1].time >= block.timestamp - 1 days &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        // lấy item của mình đã mua
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            // check if nft is mine
            if (
                idToMarketItem[i + 1].owner == msg.sender &&
                idToMarketItem[i + 1].status == 1
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == msg.sender &&
                idToMarketItem[i + 1].status == 1
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListedNew() public view returns (MarketItem[] memory) {
        // items tạo ra đang bán
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == msg.sender &&
                idToMarketItem[i + 1].status == 0
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == msg.sender &&
                idToMarketItem[i + 1].status == 0
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListedDelete()
        public
        view
        returns (MarketItem[] memory)
    {
        // items tạo ra đang bán
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == msg.sender &&
                idToMarketItem[i + 1].status == 2
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].owner == msg.sender &&
                idToMarketItem[i + 1].status == 2
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        // items tạo ra đang bán
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].seller == msg.sender &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].seller == msg.sender &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsListedDate() public view returns (MarketItem[] memory) {
        // items tạo ra đang bán
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].seller == msg.sender &&
                idToMarketItem[i + 1].date < block.timestamp * 1000
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].seller == msg.sender &&
                idToMarketItem[i + 1].date < block.timestamp * 1000
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchItemsSeller(
        address sellerAddress
    ) public view returns (MarketItem[] memory) {
        // items theo dia chi
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].seller == sellerAddress &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (
                idToMarketItem[i + 1].seller == sellerAddress &&
                idToMarketItem[i + 1].date > block.timestamp * 1000
            ) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    function fetchId(uint256 id) public view returns (MarketItem[] memory) {
        // items theo id
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].tokenId == id) {
                itemCount += 1;
            }
        }
        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].tokenId == id) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }
}
