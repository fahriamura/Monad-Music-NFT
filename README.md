# 🎵 Monad Music NFT

Collect and play music through exclusive NFTs on the Monad Testnet! This project allows users to mint, store, and play music in the form of NFTs.

## ✨ Main Features

- 🎶 **Mint Music NFT**: Upload and mint your music as an NFT
- 🎧 **Music Player**: Play the NFT music you own
- 🖼️ **Cover Art**: Support cover images for each music
- 📊 **Complete Metadata**: Store artist, genre, duration, etc.
- 🔐 **Ownership Control**: Only NFT owners can play the music
- 💎 **IPFS Storage**: Music and images are stored on IPFS

## 🛠️ Technologies Used

- **Smart Contract**: Solidity ^0.8.19
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Blockchain**: Monad Testnet
- **Storage**: IPFS
- **Wallet**: MetaMask
- **Libraries**: 
  - OpenZeppelin Contracts
  - Ethers.js v6
  - Hardhat

## 🚀 Quick Start

### 1. Project Setup

```bash
# Clone or create a new directory
mkdir monad-music-nft
cd monad-music-nft

# Install dependencies
npm init -y
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts
```

### 2. Setup Hardhat

```bash
npx hardhat init
# Choose "Create a JavaScript project"
```

### 3. Deploy Contract

```bash
# Set environment variable for private key
export PRIVATE_KEY="your_private_key_here"

# Compile contract
npx hardhat compile

# Deploy to Monad Testnet
npx hardhat run scripts/deploy.js --network monadTestnet
```

### 4. Update Web App

After successful deployment, update `CONTRACT_ADDRESS` in the HTML file with the newly deployed contract address.

```javascript
const CONTRACT_ADDRESS = "0xYourContractAddressHere";
```

### 5. Setup Environment Files

Copy the example environment files to their respective locations:

```bash
cp .env.example .env
cp web/.env.json.example web/.env.json
```

Ensure you update these files with your specific configuration details.

## 📋 Project Structure

```
monad-music-nft/
├── contracts/
│   └── MusicNFT.sol          # Main smart contract
├── scripts/
│   ├── deploy.js             # Deployment script
│   └── mint-example.js       # Minting example
├── web/
│   └── index.html            # Frontend web app
├── hardhat.config.js         # Hardhat configuration
└── package.json
```

## 🔧 Monad Testnet Configuration

### Network Details
- **Chain ID**: 0x279F
- **RPC URL**: https://testnet-rpc.monad.xyz
- **Currency**: MON
- **Explorer**: https://testnet.monadexplorer.xyz

### Setup MetaMask
1. Open MetaMask
2. Click "Add Network"
3. Enter the Monad Testnet network details above
4. Get MON testnet from the faucet

## 💰 How to Get MON Testnet

1. Visit Monad Testnet Faucet
2. Enter your wallet address
3. Request MON testnet
4. Wait for transaction confirmation

## 🎵 How to Use

### Mint Music NFT

1. **Connect Wallet**: Click "Connect Wallet" and select MetaMask
2. **Switch Network**: Ensure you are connected to the Monad Testnet
3. **Fill Form**: Enter music details (title, artist, genre, duration)
4. **Upload Files**: Upload audio files (MP3, WAV, etc.) and cover art
5. **Mint**: Click "Mint Music NFT" and pay a fee of 0.01 MON
6. **Confirm**: Confirm the transaction in MetaMask

### Play Music NFT

1. **View Collection**: View your music NFT collection
2. **Click Play**: Click the play button (▶️) on the music you want to play
3. **Enjoy**: The music will play directly in the browser
4. **Controls**: Use the progress bar for navigation

## 📜 Smart Contract Functions

### Main Functions

```solidity
// Mint a new music NFT
function mintMusicNFT(
    address to,
    string memory title,
    string memory artist,
    string memory genre,
    uint256 duration,
    string memory audioIPFSHash,
    string memory coverIPFSHash,
    string memory tokenURI
) public payable

// Play music (owner only)
function playMusic(uint256 tokenId) public

// Get music data
function getMusicData(uint256 tokenId) public view returns (MusicMetadata memory)

// Get user's tokens
function getUserTokens(address user) public view returns (uint256[] memory)
```

### Events

```solidity
event MusicNFTMinted(
    uint256 indexed tokenId,
    address indexed owner,
    string title,
    string artist,
    string audioIPFSHash
);

event MusicPlayed(
    uint256 indexed tokenId,
    address indexed player,
    uint256 timestamp
);
```

## 🔐 Security Features

- **Ownership Control**: Only NFT owners can play music
- **Payment Validation**: Validate payment during minting
- **Supply Limit**: Maximum of 10,000 NFTs
- **IPFS Validation**: Validate IPFS hash before minting
- **Reentrancy Protection**: Using OpenZeppelin pattern

## 🌐 IPFS Integration

This project uses IPFS to store:
- **Audio Files**: Music files in MP3, WAV, etc.
- **Cover Art**: Cover images in JPG, PNG, etc.
- **Metadata**: NFT JSON metadata

### Upload to IPFS

For production implementation, you can use:
- Pinata
- Infura IPFS
- Web3.Storage
- NFT.Storage

## 🧪 Testing

```bash
# Run tests
npx hardhat test

# Test with network fork
npx hardhat test --network hardhat
```

## 📊 Contract Statistics

- **Mint Price**: 0.01 MON
- **Max Supply**: 10,000 NFTs
- **Gas Optimization**: Optimized for gas efficiency
- **Standard**: ERC721 + ERC721URIStorage

## �� Customization

### Change Mint Price

```solidity
// Only owner can change the price
function setMintPrice(uint256 _mintPrice) public onlyOwner {
    mintPrice = _mintPrice;
}
```

### Add New Genre

Edit the genre dropdown in the frontend:

```html
<option value="NewGenre">New Genre</option>
```

### Custom Styling

Adjust CSS in the HTML file to change the appearance:
- Theme colors
- Grid layout
- Animations
- Responsive design

## 🐛 Troubleshooting

### Common Issues

1. **"Insufficient funds"**
   - Ensure you have enough MON for gas fees
   - A minimum of 0.05 MON is recommended

2. **"Network not supported"**
   - Ensure MetaMask is connected to the Monad Testnet
   - Check chain ID: 1438466

3. **"Contract not found"**
   - Ensure CONTRACT_ADDRESS in the frontend is updated
   - Verify the contract is deployed correctly

4. **"File upload failed"**
   - IPFS upload implementation is needed for production
   - Currently using mock hash for demo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Create a Pull Request

## 📞 Support

## 🙏 Acknowledgments

- [Monad Network](https://monad.xyz) - High-performance blockchain
- [OpenZeppelin](https://openzeppelin.com) - Secure smart contract library  
- [IPFS](https://ipfs.io) - Decentralized storage
- [Ethers.js](https://ethers.org) - Ethereum library

---

**🎵 Happy Music NFT-ing on Monad! 🎵**
