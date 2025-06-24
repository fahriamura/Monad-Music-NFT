const { ethers } = require("hardhat");

async function main() {
  console.log("🎵 Deploying MusicNFT contract to Monad Testnet...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Check balance
  const balance = await ethers.provider.getBalance(deployer.address);
  console.log("Account balance:", ethers.formatEther(balance), "MON");

  if (balance < ethers.parseEther("0.1")) {
    throw new Error("Insufficient balance for deployment. Need at least 0.1 MON");
  }

  // Deploy the contract
  const MusicNFT = await ethers.getContractFactory("MusicNFT");
  
  console.log("Deploying contract...");
  
  // Deploy with explicit gas settings
  const musicNFT = await MusicNFT.deploy({
    gasPrice: ethers.parseUnits("50", "gwei"), // 50 gwei - higher gas price
    gasLimit: 8000000 // 8M gas limit
  });
  
  await musicNFT.waitForDeployment();
  const contractAddress = await musicNFT.getAddress();
  
  console.log("✅ MusicNFT deployed to:", contractAddress);
  console.log("🔗 Transaction hash:", musicNFT.deploymentTransaction().hash);
  console.log("⛽ Gas used:", musicNFT.deploymentTransaction().gasLimit.toString());

  // Verify initial state
  console.log("\n📊 Contract Information:");
  const name = await musicNFT.name();
  const symbol = await musicNFT.symbol();
  const mintPrice = await musicNFT.mintPrice();
  const maxSupply = await musicNFT.maxSupply();
  const totalSupply = await musicNFT.totalSupply();

  console.log("Name:", name);
  console.log("Symbol:", symbol);
  console.log("Mint Price:", ethers.formatEther(mintPrice), "MON");
  console.log("Max Supply:", maxSupply.toString());
  console.log("Current Supply:", totalSupply.toString());

  // Save deployment info
  const deploymentInfo = {
    network: "monadTestnet",
    contractAddress: contractAddress,
    deployerAddress: deployer.address,
    transactionHash: musicNFT.deploymentTransaction().hash,
    blockNumber: musicNFT.deploymentTransaction().blockNumber,
    gasUsed: musicNFT.deploymentTransaction().gasLimit.toString(),
    timestamp: new Date().toISOString(),
    contractInfo: {
      name,
      symbol,
      mintPrice: ethers.formatEther(mintPrice),
      maxSupply: maxSupply.toString()
    }
  };

  console.log("\n📋 Deployment Summary:");
  console.log(JSON.stringify(deploymentInfo, null, 2));

  console.log("\n🌐 Explorer URL:");
  console.log(`https://testnet.monadexplorer.com//address/${contractAddress}`);

  console.log("\n📝 Next Steps:");
  console.log("1. Update CONTRACT_ADDRESS in the web app");
  console.log("2. Add contract address to your frontend");
  console.log("3. Test minting your first Music NFT!");
  
  return contractAddress;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then((address) => {
    console.log(`\n🎉 Deployment completed successfully!`);
    console.log(`Contract Address: ${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });