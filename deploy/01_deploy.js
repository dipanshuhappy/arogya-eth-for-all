require("hardhat-deploy")
require("hardhat-deploy-ethers")
require("dotenv").config()


const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    //deploy ParentStorage
    const ParentStorage = await ethers.getContractFactory('ParentStorage', wallet);
    console.log('Deploying ParentStorage...');
    const parentStorage = await ParentStorage.deploy();
    await parentStorage.deployed()
    console.log('ParentStorage deployed to:', parentStorage.address);

    //deploy TokenFactory
    const baseURI ="demoInitial"
    const ownerName = "Sudeep"
    const ownerAddress = process.env.PUBLIC_KEY  // Put public address of your account in .env file 
    const uid = 0;
    const TokenFactory = await ethers.getContractFactory('TokenFactory', wallet);
    console.log('Deploying TokenFactory...');
    console.log(ownerAddress);
    const tokenFactory = await TokenFactory.deploy(baseURI, ownerName, ownerAddress, uid);
    await tokenFactory.deployed()
    console.log('TokenFactory deployed to:', tokenFactory.address);
}