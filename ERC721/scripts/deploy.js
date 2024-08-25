const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("Hegel");

  await contract.waitForDeployment();

  console.log(`Your NFT contract deployed to ${contract.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});