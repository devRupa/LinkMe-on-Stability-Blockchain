

// ================paid chain variables====================
const Tx = require('ethereumjs-tx').Transaction;

const chain='https://alphanet.stble.io';
const abiArray = [{ "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referee", "type": "address" }], "name": "NewReferral", "type": "event" }, { "inputs": [{ "internalType": "address", "name": "_referrer", "type": "address" }, { "internalType": "address", "name": "_referee", "type": "address" }], "name": "addReferral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "name": "childsOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_referrer", "type": "address" }], "name": "getRefereesReferees", "outputs": [{ "internalType": "address[]", "name": "", "type": "address[]" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUniqueAddressCount", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_address", "type": "address" }], "name": "isAddressPartOfReferralLinkages", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "parentOf", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "uniqueAddresses", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }]
const contractAddress = "";

const Web3 = require('web3');
const web3 = new Web3(chain);

const fromAddress = '';
const privKey = '';
const privateKeyBuffer = Buffer.from(privKey, 'hex');

const contract = new web3.eth.Contract(abiArray, contractAddress);
const common = require('ethereumjs-common');

const stableChain = common.default.forCustomChain(
    'mainnet',{
      name: 'gas',
      networkId: 20180427,
      chainId: 20180427
    },
    'petersburg'
)

// ============================free chain variables===================================
const ethers = require('ethers');

const freeChain='https://free.stble.io';
const freeAbiArray = [ { "inputs": [ { "internalType": "address", "name": "_referrer", "type": "address" }, { "internalType": "address", "name": "_referee", "type": "address" } ], "name": "addReferral", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "referrer", "type": "address" }, { "indexed": true, "internalType": "address", "name": "referee", "type": "address" } ], "name": "NewReferral", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "childsOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_referrer", "type": "address" } ], "name": "getRefereesReferees", "outputs": [ { "internalType": "address[]", "name": "", "type": "address[]" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getUniqueAddressCount", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_address", "type": "address" } ], "name": "isAddressPartOfReferralLinkages", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "parentOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "uniqueAddresses", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" } ];

const freeContractAddress ="";
const provider = new ethers.providers.JsonRpcProvider('https://free.stble.io', 20180427);

// ================Add referral on free chain ====================
exports.addReferralOnFreeChain = async function (parentAddress, childAddress) {

    var txHash = null;

    try {

        const readContract = new ethers.Contract(freeContractAddress, freeAbiArray, provider);
 
        let wallet = ethers.Wallet.createRandom(new ethers.providers.JsonRpcProvider(
            'https://free.stble.io',
            20180427
        ));
        let privKey = wallet._signingKey().privateKey;
        const signer = new ethers.Wallet(privKey, provider);
        const contract = new ethers.Contract(freeContractAddress, freeAbiArray, wallet);

        const transaction = {
            nonce: 0,
            to: freeContractAddress,
            gasLimit: 2100000,
            gasPrice: 0,
            data: contract.interface.encodeFunctionData('addReferral', [parentAddress, childAddress])
        };

        let txResponse = await signer.sendTransaction(transaction);
        console.log("tx", txResponse);
       
            txHash=txResponse.hash;

    } catch (e) {
        console.log(e);
    }
    return txHash;

}

// ================Add referral on paid chain ====================
exports.addReferralOnPaidChain = async function (parentAddress, childAddress) {
    var txHash = null;
    try {
        var gasPriceFromChain = await web3.eth.getGasPrice();

        console.log('Gasprice :' + gasPriceFromChain);
        const transactionObject = {
            from: fromAddress,
            gas: web3.utils.toHex(gasPriceFromChain),
            gasPrice: web3.utils.toHex(210000)
        };
        var myData = await contract.methods.addReferral(parentAddress, childAddress).encodeABI();

        var count = await web3.eth.getTransactionCount(fromAddress);

        var rawTransaction = {
            from: fromAddress,
            gasPrice:web3.utils.toHex(gasPriceFromChain),
            gasLimit:  web3.utils.toHex(2100000),
            to: contractAddress,
            data: myData,
            nonce: web3.utils.toHex(count)
        };

        var transaction = new Tx(rawTransaction, { common: stableChain });
        transaction.sign(privateKeyBuffer)
        //sending token
        var result = await web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'));
        console.log(result);
        if (result.status == true) {
            txHash = result.transactionHash;
        }

    } catch (e) {
        console.log(e);
    }
    return txHash;

}

exports.getUniqueAddressCount = async function () {

    try {
        var output = await contract.getUniqueAddressCount();
        console.log('data ' + output);
        return output;
    } catch (e) {
        console.log(e);
        return false;
    }

}

exports.getAllChildNodes = async function (parentAddress) {
    try {
        var output = await contract.getRefereesReferees(parentAddress);
        console.log('data ' + output);
        return output;
    } catch (e) {
        console.log(e);
        return false;
    }

}

exports.isAddressPartOfReferralLinkages = async function (parentAddress) {
    try {
        var output = await contract.isAddressPartOfReferralLinkages(parentAddress);
        console.log('data ' + output);
        return output;
    } catch (e) {
        console.log(e);
        return false;
    }

}
