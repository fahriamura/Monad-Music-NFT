const { ethers } = require("hardhat");

async function main() {
  const contractAddress = "0x239F0991209Dc1DeA0FE4Ce765746988838f77BF"; // Replace with actual address
  
  console.log("🎵 Minting example Music NFT...");

  const [signer] = await ethers.getSigners();
  console.log("Minting with account:", signer.address);

  // Connect to deployed contract
  const MusicNFT = await ethers.getContractFactory("MusicNFT");
  const musicNFT = MusicNFT.attach(contractAddress);

  // Example music data
  const musicData = {
    title: "Monad Vibes",
    artist: "Crypto Composer",
    genre: "Electronic",
    duration: 180, // 3 minutes
    audioIPFSHash: "QmExampleAudioHash123",
    coverIPFSHash: "QmExampleCoverHash456"
  };

  // Create metadata
  const metadata = {
    name: musicData.title,
    description: `Music NFT by ${musicData.artist}`,
    image: `ipfs://${musicData.coverIPFSHash}`,
    attributes: [
      { trait_type: "Artist", value: musicData.artist },
      { trait_type: "Genre", value: musicData.genre },
      { trait_type: "Duration", value: `${musicData.duration} seconds` }
    ],
    animation_url: `ipfs://${musicData.audioIPFSHash}`
  };

  const tokenURI = `data:application/json;base64,${Buffer.from(JSON.stringify(metadata)).toString('base64')}`;

  // Get mint price
  const mintPrice = await musicNFT.mintPrice();
  console.log("Mint price:", ethers.formatEther(mintPrice), "MON");

  // Mint the NFT
  console.log("Minting NFT...");
  const tx = await musicNFT.mintMusicNFT(
    signer.address,
    musicData.title,
    musicData.artist,
    musicData.genre,
    musicData.duration,
    musicData.audioIPFSHash,
    musicData.coverIPFSHash,
    tokenURI,
    { value: mintPrice }
  );

  console.log("Transaction hash:", tx.hash);
  const receipt = await tx.wait();
  
  console.log("✅ Music NFT minted successfully!");
  console.log("Block number:", receipt.blockNumber);
  console.log("Gas used:", receipt.gasUsed.toString());

  // Get the token ID from events
  const event = receipt.logs.find(log => {
    try {
      const parsed = musicNFT.interface.parseLog(log);
      return parsed.name === "MusicNFTMinted";
    } catch {
      return false;
    }
  });

  if (event) {
    const parsed = musicNFT.interface.parseLog(event);
    console.log("Token ID:", parsed.args.tokenId.toString());
    console.log("Owner:", parsed.args.owner);
    console.log("Title:", parsed.args.title);
    console.log("Artist:", parsed.args.artist);
  }

  // Check user tokens
  const userTokens = await musicNFT.getUserTokens(signer.address);
  console.log("User's tokens:", userTokens.map(id => id.toString()));

  console.log("\n🎉 Example NFT minted successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });