import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  InceptiaSwap,
  InceptiaSwapContractAddress,
  inceptiaContractAddress,
  inceptiaAbi,
} from "../../contract/index";
import "./Swapping.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const Swapping = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [inceptiaContract, setInceptiaContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [amountToSwap, setAmountToSwap] = useState("");
  const [transactionHash, setTransactionHash] = useState("");
  const [loading, setLoading] = useState(false);
  const [exchangeType, setExchangeType] = useState("ethToToken"); // Default to ETH to token
  const [ethBalance, setEthBalance] = useState(""); // Ethereum balance
  const [erc20Balance, setErc20Balance] = useState("");

  const connectWallet = async () => {
    const contractAddress = inceptiaContractAddress;
    const contractABI = InceptiaSwap;

    try {
      const { ethereum } = window;

      if (ethereum) {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        const account = accounts[0];

        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        );
        const inceptiaContract = new ethers.Contract(
          inceptiaContractAddress,
          inceptiaAbi,
          signer
        );

        setAccount(account);
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
        console.log(contract);
        setInceptiaContract(inceptiaContract);

        // Fetch Ethereum balance here
        const ethBalance = await provider.getBalance(account);
        const formattedEthBalance = ethers.utils.formatEther(ethBalance);
        setEthBalance(formattedEthBalance);

        // Fetch ERC20 token balance here
        const erc20Balance = await inceptiaContract.balanceOf(account);
        const formattedErc20Balance = ethers.utils.formatEther(erc20Balance);
        setErc20Balance(formattedErc20Balance);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  // Function to fetch Ethereum balance
  const fetchEthBalance = async () => {
    if (account && provider) {
      const balance = await provider.getBalance(account);
      const formattedBalance = ethers.utils.formatEther(balance);
      setEthBalance(formattedBalance);
    }
  };

  // Function to fetch ERC20 token balance
  const fetchErc20Balance = async () => {
    if (account && inceptiaContract) {
      const balance = await inceptiaContract.balanceOf(account);
      let userBalance = ethers.BigNumber.from(balance).toString();
      userBalance = ethers.utils.formatEther(userBalance);
      setErc20Balance(userBalance);
    }
  };

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (account) {
      fetchEthBalance();
      fetchErc20Balance();
    }
  }, [account]);

  const swapEtherToToken = async () => {
    if (contract && amountToSwap && account) {
      try {
        setLoading(true); // Show loading indicator
        const amountInWei = ethers.utils.parseEther(amountToSwap);
        console.log();
        // Call the contract function
        const tx = await contract.swapEtherToToken(inceptiaContractAddress, {
          value: amountInWei,
          gasLimit: ethers.utils.hexlify(250000),
        });

        // Wait for the transaction to be mined
        await tx.wait();

        setTransactionHash(tx.hash);
        setLoading(false); // Hide loading indicator
      } catch (error) {
        console.error(error);
        setLoading(false); // Hide loading indicator and show error
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="w-full max-w-md bg-inherit p-6 rounded-lg shadow-md">
          <h1 className="text-3xl font-semibold text-center mb-4">
            ERC20 Token Swap
          </h1>
          <p className="text-center">Connected Account: {account}</p>

          {/* Ethereum Balance */}
          <div className="my-4 p-4 rounded-lg bg-gray-800">
            <p className="text-white text-center text-xl">Ethereum Balance</p>
            <p className="text-2xl text-center text-green-500">
              {ethBalance} ETH
            </p>
          </div>

          {/* ERC20 Token Balance */}
          <div className="my-4 p-4 rounded-lg bg-gray-800">
            <p className="text-white text-center text-xl">
              ERC20 Token Balance
            </p>
            <p className="text-2xl text-center text-green-500">
              {erc20Balance} Tokens
            </p>
          </div>
          <div className="flex justify-center my-4">
            <button
              onClick={() =>
                window.open(
                  "https://app.uniswap.org/swap?inputCurrency=ETH&outputCurrency=0x569023db9f002fBBfCeac0762d0a6E22Aa6cE2e4",
                  "_blank"
                )
              }
              className={`mr-2 px-4 py-2 rounded-lg ${
                exchangeType === "ethToToken"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              ETH to Token
            </button>
            <button
              onClick={() => {
                setExchangeType("tokenToEth");
                window.open(
                  "https://app.uniswap.org/swap?inputCurrency=0x569023db9f002fBBfCeac0762d0a6E22Aa6cE2e4&outputCurrency=ETH",
                  "_blank"
                );
              }}
              className={`px-4 py-2 rounded-lg ${
                exchangeType === "tokenToEth"
                  ? "bg-green-500 text-white"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              Token to ETH
            </button>
          </div>

          <div className="flex flex-col items-center"></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Swapping;
