// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// Here TokenFactory is an ERC721(NFT Based) smart contract which represents a collection of NFT tokens, this nft collection has an owner(user)
// As of now each user can deploy only one contract in their name
// Every instance of the contract TokenFcatory requires two special property i) baseURI ii) name of the user iii) Unique identifier of the nft collection (integer)
// Only the owner who will be deploying this contract can mint tokens of this nft collection

struct G1Point {
    uint256 x;
    uint256 y;
}

struct DleqProof {
    uint256 f;
    uint256 e;
}

/// @notice A 32-byte encrypted ciphertext
struct Ciphertext {
    G1Point random;
    uint256 cipher;
    /// DLEQ part
    G1Point random2;
    DleqProof dleq;
}

struct ReencryptedCipher {
    G1Point random;
    uint256 cipher;
}

interface IEncryptionClient {
    /// @notice Callback to client contract when medusa posts a result
    /// @dev Implement in client contracts of medusa
    /// @param requestId The id of the original request
    /// @param _cipher the reencryption result
    function oracleResult(uint256 requestId, Ciphertext calldata _cipher) external;
}

interface IEncryptionOracle {
    /// @notice submit a ciphertext that can be retrieved at the given link and
    /// has been created by this encryptor address. The ciphertext proof is checked
    /// and if correct, being signalled to Medusa.
    function submitCiphertext(
        Ciphertext calldata _cipher,
        bytes calldata _link,
        address _encryptor
    ) external returns (uint256);

    /// @notice Request reencryption of a cipher text for a user
    /// @dev msg.sender must be The "owner" or submitter of the ciphertext or the oracle will not reply
    ///  _cipherId the id of the ciphertext to reencrypt
    ///  _publicKey the public key of the recipient
    /// @return the reencryption request id
    function requestReencryption(
        uint256 _cipherId,
        G1Point calldata _publickey
    ) external returns (uint256);
}

error CallbackNotAuthorized();

contract TokenFactory is IEncryptionClient, ERC721Enumerable, Ownable {
    /**
     * @dev _baseTokenURI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`.
     */

    /// @notice The Encryption Oracle Instance
    address public medusaOracleAddress = 0xb0dd3eB2374b21b6efAcf41A16e25Ed8114734E0;
    IEncryptionOracle public oracle;

    /// mapping recording the price of each token referenced by its cipher ID
    mapping(uint256 => uint256) itemToPrice;

    // Token Factory Characteristics
    bytes32 _baseTokenURI;

    // Details of Owner Captured from Sign up page + while deploying
    struct ownerDetailsType {
        // Name of Owner
        bytes32 _ownerName;
        //Address of Owner
        address payable _ownerAddress;
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
        address payable ownerAddress,
        uint256 ownerAge,
        bytes32 ownerBloodGroup,
        bytes32 ownerAllergies,
        bytes32 ownerMedication,
        bytes32 ownerAbout,
        uint256 uid
    ) ERC721(getFinalString("Token Factory", uid), getFinalString("TF", uid)) {
        oracle = IEncryptionOracle(medusaOracleAddress);

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
    mapping(uint => TokenDetail) public id_TokenDetailMapping; // Mapping of Id with Details
    mapping(uint => mapping(address => bool)) _allowedAddresesFor_ReEncryption;

    struct TokenDetail {
        address payable _addressOfOwner;
        uint256 _tokenId;
        string _dataDescription;
        string _dataUrl;
    }

    /**
     * @dev mint allows a user to mint 1 NFT token per transaction .
     */

    // Submit file -> returns cypherId
    function mint(
        string memory dataDescription,
        string memory dataUrl
    ) public payable onlyWhenNotPaused onlyOwner returns (uint256) {
        require(msg.sender == ownerDetails._ownerAddress);
        require(tokenIds < maxTokenIds, "Exceed maximum TokwnFactory supply");

        tokenIds += 1;
        _safeMint(msg.sender, tokenIds);

        // Medusa

        TokenDetail memory _newTokenDetail = TokenDetail({
            _addressOfOwner: ownerDetails._ownerAddress,
            _tokenId: tokenIds,
            _dataDescription: dataDescription,
            _dataUrl: dataUrl
        });

        id_TokenDetailMapping[tokenIds] = _newTokenDetail;
        _allowedAddresesFor_ReEncryption[tokenIds][ownerDetails._ownerAddress] = true;

        return tokenIds;
    }

    //Events
    event NewReencryptionRequest(
        address indexed buyer,
        address indexed seller,
        uint256 requestId,
        uint256 cipherId
    );
    event EntryIntoDecryptionProcess(uint256 indexed requestId, Ciphertext ciphertext);

    //Modifiers
    modifier onlyOracle() {
        if (msg.sender != address(oracle)) {
            revert CallbackNotAuthorized();
        }
        _;
    }

    /// oracleResult gets called when the Medusa network successfully reencrypted
    /// the ciphertext to the given public key called in the previous method.
    /// This contract here simply emits an event so the client can listen on it and
    /// pick up on the cipher and locally decrypt.
    function oracleResult(uint256 requestId, Ciphertext calldata cipher) external onlyOracle {
        emit EntryIntoDecryptionProcess(requestId, cipher);
    }

    //Generate a reencryption request -> returns requestId
    // function buyTokenId(uint256 targetTokenId) external payable returns (uint256) {
    //     require(targetTokenId > 0 && targetTokenId <= tokenIds);
    //     require(_allowedAddresesFor_ReEncryption[targetTokenId][msg.sender] == true);

    //     uint256 cipherId = id_TokenDetailMapping[targetTokenId]._cipherId;
    //     uint256 requestId = oracle.requestReencryption(cipherId, buyerPublicKey); // Medusa

    //     emit NewReencryptionRequest(msg.sender, ownerDetails._ownerAddress, requestId, cipherId);

    //     ownerDetails._ownerAddress.transfer(msg.value); // Receive msg.value in smart contract address and pay msg.value to the owner

    //     return requestId;
    // }

    function getOwnerDetails() public view returns (ownerDetailsType memory) {
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
