const path = require("path");
const net = require("net");

const fs = require("fs");
let Web3 = require("web3");

const web3 = new Web3();
const ipcprovider = path.join(__dirname, "./", "geth/ethereum/geth.ipc");
web3.setProvider(ipcprovider, net);
web3.eth.transactionConfirmationBlocks = 1;

const PATH_TO_CONTRACTS = path.join(__dirname, "contracts");

const deployContract = async (
  account,
  contract,
  arguments,
  averageGasPrice,
  estimatedGas
) => {
  return new Promise((resolve, reject) => {
    contract
      .deploy({
        gas: estimatedGas,
        gasPrice: averageGasPrice,
        arguments,
      })
      .send({ from: account, gas: estimatedGas, gasPrice: averageGasPrice })
      .on("error", (error) => reject(error))
      .on("transactionHash", (trxHash) => {
        transactionHash = trxHash;
        console.log(`transaction Hash for deployment: ${trxHash}`);
      })
      .on("receipt", (receipt) =>
        console.log(`transaction receipt ${JSON.stringify(receipt)}`)
      )
      .then(function (newContractInstance) {
        resolve(newContractInstance);
      })
      .catch((err) => {
        console.log(`${err}`);
        reject();
      });
  });
};

const deployContracts = async () => {
  const pwd = "12345";

  let coinbase;
  try {
    accounts = await web3.eth.getAccounts();
    coinbase = accounts[1];
    console.log(`Unlocking coinbase-account: ${coinbase}`);
    await web3.eth.personal.unlockAccount(coinbase, pwd, 200 * 60 * 60);
  } catch (unlockAccountError) {
    console.log(
      `Unlocking coinbase-account: ${coinbase} failed: With following error: ${unlockAccountError}`
    );
    return;
  }

  try {
    const source = JSON.parse(
      fs
        .readFileSync(path.join(PATH_TO_CONTRACTS, "TestContract.json"))
        .toString()
    );

    const sampleContract = new web3.eth.Contract(
      source.contracts["TestContract"].abi,
      null,
      {
        data: `0x${source.contracts["TestContract"].bin}`,
      }
    );

    const arguments = ["A3d33D72870D21BfafEA4AAC1Ed71f6534Ea17FE"];
    const averageGasPrice = await web3.eth.getGasPrice();
    console.log(
      `🚀 ~ deployContracts ~ average gas price ~ ${averageGasPrice}`
    );

    const estimatedGas = await sampleContract
      .deploy({ arguments })
      .estimateGas();
    console.log(`🚀 ~ deployContracts ~ estimated gas ~ ${estimatedGas}`);

    const response = await deployContract(coinbase, sampleContract, arguments);

    console.log(`response: ${Object.entries(response.options)}`);
  } catch (error) {
    console.log(error);
  }
};

const sleep = (time) => {
  console.log(`Sleeping for ${time / 1000} seconds to give chain a head start`);
  return new Promise((resolve) => setTimeout(() => resolve(), time));
};

async function main() {
  await sleep(5000);
  await deployContracts();
}

main();
