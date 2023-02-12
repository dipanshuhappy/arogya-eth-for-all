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
    
    /**
     * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */
    
    // Second Phase -> MarketPlace Implementation in another contract 
    // // deals array contains all the buy deals this token Factory has recieved
    // struct BuyDeal {
    //     string name; // name of the buyer who has requested data access
    //     address buyer; // address of the buyer who has requested data access
    //     uint256 amount; // amount of filecoin the buyer is willing to pay
    //     uint256 tokenId; // tokenId for which the request has come
    // }
    // BuyDeal[] public buyDealsArray;

    // Token Factory Characteristics
    bytes32  _baseTokenURI;

    // Details of Owner Captured from Sign up page + while deploying
    struct ownerDetailsType{
        // Name of Owner
        bytes32 _ownerName;
        //Address of Owner
        address _ownerAddress;
        uint256 _ownerAge;
        bytes32 _ownerBloodGroup;
        bytes32 _ownerAllergies;
        bytes32 _ownerMedication;
        bytes32 _ownerAbout;
    }

    ownerDetailsType public ownerDetails;

    // Represents Id of Collection
    uint256 public _collectionId;

    // _paused is used to pause the contract in case of an emergency
    bool public _paused;

    // max number of Tokens minted in TokenFactory
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
        bytes32 baseURI,
        bytes32 ownerName,
        address ownerAddress,
        uint256 ownerAge,
        bytes32 ownerBloodGroup,
        bytes32 ownerAllergies,
        bytes32 ownerMedication,
        bytes32 ownerAbout,
        uint256 uid
    ) ERC721(getFinalString("Token Factory", uid), getFinalString("TF", uid)) {
        _baseTokenURI = baseURI;
        _collectionId = uid;

        ownerDetails = ownerDetailsType({
        _ownerName: ownerName,
        _ownerAddress: ownerAddress,
        _ownerAge: ownerAge,
        _ownerBloodGroup: ownerBloodGroup,
        _ownerAllergies: ownerAllergies,
        _ownerMedication: ownerMedication,
        _ownerAbout: ownerAbout
        });


        transferOwnership(ownerAddress);
    }

    function getContractBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }

    // Token Characteristics (TokenDetail, buyDealsForTokenId )

    // mapping(uint => BuyDeal[]) public buyDealsForTokenId; // buyDealsForTokenId[tokenId], contains all the BuyDeal Objects which have requested for tokenId
    mapping(uint => TokenDetail) public idDetailMap; // Mapping of Id with Details
    
    struct TokenDetail {
        address _addressOfOwner;
        string _dataDescription;
        string _dataCid;
        string _dataUrl;
        uint256 _tokenId;
    }

    /**
     * @dev mint allows a user to mint 1 NFT token per transaction .
     */
    function mint(
        string memory dataDescription,
        string memory dataCid,
        string memory dataUrl
    ) public payable onlyWhenNotPaused onlyOwner {
        require(msg.sender == ownerDetails._ownerAddress);
        require(tokenIds < maxTokenIds, "Exceed maximum TokwnFactory supply");

        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);
        TokenDetail memory _newTokenDetail = TokenDetail({
            _addressOfOwner: ownerDetails._ownerAddress,
            _dataDescription: dataDescription,
            _dataCid: dataCid,
            _dataUrl: dataUrl,
            _tokenId: tokenIds
        });
        idDetailMap[tokenIds] = _newTokenDetail;
    }
    
    function getOwnerDetails() public view returns(ownerDetailsType memory){
         return ownerDetails;
    }
    /**
     * @dev _baseURI overides the Openzeppelin's ERC721 implementation which by default
     * returned an empty string for the baseURI
     */
    // function _baseURI() internal view virtual override returns (string memory) {
    //     return _baseTokenURI;
    // }

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
