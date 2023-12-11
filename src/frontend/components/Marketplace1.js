import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import Navigation from "./Navbar";
import Home from "./Home";
import Create from "./Create";
import TransactionHistory from "./TransactionHistory";
import MyListedItems from "./MyListedItems";
import MyPurchases from "./MyPurchases";
import MarketplaceAbi from "../contractsData/Marketplace.json";
import MarketplaceAddress from "../contractsData/Marketplace-address.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import "./index.css";
import "./App.css";
import ClaimNFT from "./ClaimNFT";
import UpdateNFT from "./UpdateNFT";
import { inceptiaContractAddress, inceptiaAbi } from "../../contract/index";
import Navbar from "../../components/Navbar";

function Marketplace1() {
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState(null);
  const [nft, setNFT] = useState({});
  const [marketplace, setMarketplace] = useState({});
  const [userNFTs, setUserNFTs] = useState([]);
  const [activePage, setActivePage] = useState("Home");
  const [inceptia, setInceptia] = useState(null);

  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        window.ethereum.on("chainChanged", (chainId) => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", async function (accounts) {
          setAccount(accounts[0]);
          await loadContracts(signer);
        });

        await loadContracts(signer);

        // Check local storage for previously created NFTs
        const storedNFTs = JSON.parse(localStorage.getItem("userNFTs")) || [];
        setUserNFTs(storedNFTs);
      } else {
        alert("MetaMask not found. Please install it to continue.");
      }
    };

    checkMetaMask();
  }, []);

  const loadContracts = async (signer) => {
    try {
      // Get deployed copies of contracts
      const marketplace = new ethers.Contract(
        MarketplaceAddress.address,
        MarketplaceAbi,
        signer
      );
      setMarketplace(marketplace);
      const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
      setNFT(nft);

      const inceptia = new ethers.Contract(
        inceptiaContractAddress,
        inceptiaAbi,
        signer
      );

      setInceptia(inceptia);
      setLoading(false);

      console.log(marketplace);
      console.log(nft);
    } catch (error) {
      console.error("Error loading contracts:", error);
    }
  };

  useEffect(() => {
    const saveNFTsToLocalStorage = () => {
      // Save the user's NFTs to local storage whenever the list changes
      localStorage.setItem("userNFTs", JSON.stringify(userNFTs));
    };

    saveNFTsToLocalStorage();
  }, [userNFTs]);

  const web3Handler = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      localStorage.setItem("metaMaskAccount", accounts[0]);

      loadContracts();
    } catch (error) {
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <div className="App">
      <Navigation
        web3Handler={web3Handler}
        account={account}
        setActivePage={setActivePage} // Pass setActivePage function down to Navigation
      />
      <div>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "80vh",
            }}
          >
            <p className="mx-3 my-0 text-white text-2xl">
              Awaiting MetaMask Connection...
            </p>
          </div>
        ) : (
          <>
            {activePage === "Home" && (
              <Home
                marketplace={marketplace}
                nft={nft}
                userNFTs={userNFTs}
                account={account}
                inceptia={inceptia}
              />
            )}
            {activePage === "Create" && (
              <Create marketplace={marketplace} nft={nft} />
            )}
            {activePage === "MyListedItems" && (
              <MyListedItems
                marketplace={marketplace}
                nft={nft}
                account={account}
              />
            )}
            {activePage === "MyPurchases" && (
              <MyPurchases
                marketplace={marketplace}
                nft={nft}
                account={account}
              />
            )}
            {activePage === "ClaimNFT" && (
              <ClaimNFT marketplace={marketplace} nft={nft} account={account} />
            )}
            {activePage === "UpdateNFT" && (
              <UpdateNFT
                marketplace={marketplace}
                nft={nft}
                account={account}
              />
            )}
            {activePage === "TransactionHistory" && (
              <TransactionHistory marketplace={marketplace} account={account} />
            )}
          </>
        )}
      </div>
      {/* <Navbar/> */}
    </div>
  );
}

export default Marketplace1;
