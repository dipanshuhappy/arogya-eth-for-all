// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Here TokenFactory is an ERC721(NFT Based) smart contract which represents a collection of NFT tokens, this nft collection has an owner(user)
// As of now each user can deploy only one contract in their name
// Every instance of the contract TokenFcatory requires two special property i) baseURI ii) name of the user iii) Unique identifier of the nft collection (integer)
// Only the owner who will be deploying this contract can mint tokens of this nft collection


contract TokenFactory is ERC721Enumerable, Ownable {
    // Token Fcatory Characteristics
    /**
     * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */

    // deals array contains all the buy deals this token Factory has recieved
    struct BuyDeal {
        string name; // name of the buyer who has requested data access
        address buyer; // address of the buyer who has requested data access
        uint256 amount; // amount of filecoin the buyer is willing to pay
        uint256 tokenId; // tokenId for which the request has come
    }
    BuyDeal[] public buyDealsArray;

    string _baseTokenURI;

    // Name of Owner
    string public _ownerName;

    //Address of Owner
    address public _ownerAddress;

    // Represents Id of Collection
    uint256 public _collectionId;

    // _paused is used to pause the contract in case of an emergency
    bool public _paused;

    // max number of Tokens minted in TokenFcatory
    uint256 public maxTokenIds = 100;

    // total number of tokenIds minted
    uint256 public tokenIds;

    modifier onlyWhenNotPaused() {
        require(!_paused, "Contract currently paused");
        _;
    }

    /**
     * @dev ERC721 constructor takes in a `name` and a `symbol` to the token collection.
     * Constructor for TokenFactory takes in the baseURI to set _baseTokenURI for the collection.
     */

    function concatenate(string memory a, string memory b) public pure returns (string memory) {
        return string(abi.encodePacked(a, " ", b));
    }

    function getFinalString(string memory a2, uint256 b2) public pure returns (string memory) {
        string memory new_b2 = Strings.toString(b2);
        return concatenate(a2, new_b2);
    }

    constructor(
        string memory baseURI,
        string memory ownerName,
        address ownerAddress,
        uint256 uid
    ) ERC721(getFinalString("Token Factory", uid), getFinalString("TF", uid)) {
        _baseTokenURI = baseURI;
        _ownerName = ownerName;
        _ownerAddress = ownerAddress;
        _collectionId = uid;

        transferOwnership(ownerAddress);
    }

    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // Token Characteristics (TokenDetail, buyDealsForTokenId )
    mapping(uint => BuyDeal[]) public buyDealsForTokenId; // buyDealsForTokenId[tokenId], contains all the BuyDeal Objects which have requested for tokenId
    mapping(uint => TokenDetail) public idDetailMap; // Mapping of Id with Details
    
    struct TokenDetail {
        string dataDescription;
        string dataCid;
        string dataUrl;
        uint256 tokenId;
    }

    /**
     * @dev mint allows a user to mint 1 NFT token per transaction .
     */
    function mint(
        string memory _dataDescription,
        string memory _dataCid,
        string memory _dataUrl
    ) public payable onlyWhenNotPaused onlyOwner {
        require(msg.sender == _ownerAddress);
        require(tokenIds < maxTokenIds, "Exceed maximum Crypto Devs supply");

        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
        TokenDetail memory _newTokenDetail = TokenDetail({
            dataDescription: _dataDescription,
            dataCid: _dataCid,
            dataUrl: _dataUrl,
            tokenId: tokenIds
        });
        idDetailMap[tokenIds] = _newTokenDetail;
    }

    /**
     * @dev _baseURI overides the Openzeppelin's ERC721 implementation which by default
     * returned an empty string for the baseURI
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    /**
     * @dev setPaused makes the contract paused or unpaused
     */
    function setPaused(bool val) public onlyOwner {
        _paused = val;
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}
