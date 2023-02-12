// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "./TokenFactory.sol";

// Here TokenFactory is an ERC721(NFT Based) smart contract which represents a collection of NFT tokens, this nft collection has an owner(user)
// As of now each user can deploy only one contract in their name
// Every instance of the contract TokenFcatory requires two special property i) baseURI ii) name of the user iii) Unique identifier of the nft collection (integer)
// Only the owner who will be deploying this contract can mint tokens of this nft collection

contract ParentStorage {

    // Array to store the addresses of all TokenFactory Contracts (TokenFactory is an nft collection)
    address[] public TokenFactoryStorage;

    uint256 public uid = 1;
    // mapping of address of deployed TokenFactory Contract with the owner's public address
    mapping(address => address) public accessMapping1;
    mapping(address => address) public accessMapping2;
    mapping(address => uint) public deployedFromAddress;

    // Event to log the deployment of an TokenFactory Contract
    event LogNFTDeployment(address address_new_TokenFactory);

    // Function to deploy the TokenFactory Contract in the name of the user
    function deployNFT(
        bytes32 baseURI,
        bytes32 ownerName,
        uint256 ownerAge,
        bytes32 ownerBloodGroup,
        bytes32 ownerAllergies,
        bytes32 ownerMedication,
        bytes32 ownerAbout
    ) public {
        require(deployedFromAddress[msg.sender] == 0);

        // Create an instance of the TokenFactory Contract
        TokenFactory new_TokenFactory = new TokenFactory(
            baseURI,
            ownerName,
            msg.sender,
            ownerAge,
            ownerBloodGroup,
            ownerAllergies,
            ownerMedication,
            ownerAbout,
            uid
        );

        uid = uid + 1;

        // Add the address of the newly deployed TokenFactory Contract to the mapping
        TokenFactoryStorage.push(address(new_TokenFactory));

        // do the access mapping
        accessMapping1[address(new_TokenFactory)] = msg.sender;
        accessMapping2[msg.sender] = address(new_TokenFactory);
        deployedFromAddress[msg.sender] += 1;

        // Log the deployment of the TokenFactory Contract
        emit LogNFTDeployment(address(new_TokenFactory));
    }

    function getAddresses() public view returns (address[] memory) {
        return TokenFactoryStorage;
    }
}
