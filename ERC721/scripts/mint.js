const hre = require("hardhat");
const { encryptDataField } = require("@swisstronik/utils");

const sendShieldedTransaction = async (signer, destination, data, value) => {
  const rpcLink = hre.network.config.url;

  const [encryptedData] = await encryptDataField(rpcLink, data);

  return await signer.sendTransaction({
    from: signer.address,
    to: destination,
    data: encryptedData,
    value,
  });
};

async function main() {
  const contractAddress = "0xB5779105cfAcBe3F80df8aaA2eA17b784c195799"; 
  const recipientAddress = "0xF58a55bFA4c07D017640cF0e0477e99a534F2a46"; 

  const [signer] = await hre.ethers.getSigners();

  const contractFactory = await hre.ethers.getContractFactory("Hegel"); 
  const contract = contractFactory.attach(contractAddress);

  const functionName = "mint";
  const functionArgs = [recipientAddress]; 
  const txData = contract.interface.encodeFunctionData(functionName, functionArgs);

  try {
    console.log("One thousand years later...");

    const mintTx = await sendShieldedTransaction(
      signer,
      contractAddress,
      txData,
      0
    );

    await mintTx.wait();

    console.log("So good!");
    console.log("Receipt: ", mintTx);
  } catch (error) {
    console.error("Oh noooo: ", error);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});