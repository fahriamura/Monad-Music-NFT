// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MusicNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    struct MusicMetadata {
        string title;
        string artist;
        string genre;
        uint256 duration; // in seconds
        string audioIPFSHash;
        string coverIPFSHash;
        uint256 mintedAt;
        bool isActive;
    }

    mapping(uint256 => MusicMetadata) public musicData;
    mapping(address => uint256[]) public userTokens;
    
    uint256 public mintPrice = 0.01 ether; // Mint price in MON
    uint256 public maxSupply = 10000;
    
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

    constructor() ERC721("MonadMusicNFT", "MMN") {}

    function mintMusicNFT(
        address to,
        string memory title,
        string memory artist,
        string memory genre,
        uint256 duration,
        string memory audioIPFSHash,
        string memory coverIPFSHash,
        string memory tokenURI
    ) public payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(_tokenIdCounter.current() < maxSupply, "Max supply reached");
        require(bytes(audioIPFSHash).length > 0, "Audio IPFS hash required");
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        
        musicData[tokenId] = MusicMetadata({
            title: title,
            artist: artist,
            genre: genre,
            duration: duration,
            audioIPFSHash: audioIPFSHash,
            coverIPFSHash: coverIPFSHash,
            mintedAt: block.timestamp,
            isActive: true
        });
        
        userTokens[to].push(tokenId);
        
        emit MusicNFTMinted(tokenId, to, title, artist, audioIPFSHash);
    }

    function playMusic(uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(musicData[tokenId].isActive, "Music is not active");
        
        emit MusicPlayed(tokenId, msg.sender, block.timestamp);
    }

    function getUserTokens(address user) public view returns (uint256[] memory) {
        return userTokens[user];
    }

    function getMusicData(uint256 tokenId) public view returns (MusicMetadata memory) {
        require(_exists(tokenId), "Token does not exist");
        return musicData[tokenId];
    }

    function getAllUserMusic(address user) public view returns (MusicMetadata[] memory) {
        uint256[] memory tokens = userTokens[user];
        MusicMetadata[] memory musicList = new MusicMetadata[](tokens.length);
        
        for (uint256 i = 0; i < tokens.length; i++) {
            musicList[i] = musicData[tokens[i]];
        }
        
        return musicList;
    }

    function updateMusicStatus(uint256 tokenId, bool isActive) public {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        musicData[tokenId].isActive = isActive;
    }

    function setMintPrice(uint256 _mintPrice) public onlyOwner {
        mintPrice = _mintPrice;
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    // Override functions for ERC721URIStorage
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}