import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import {
  inceptiaContractAddress,
  inceptiaAbi,
  rewardsContractAddress,
  rewardsAbi,
} from "../contract/index";
import { ethers } from "ethers";
import Footer from "./Footer";

function Profile() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [rewardContract, setRewardContract] = useState(null);
  const [inceptiaContract, setInceptiaContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [contractData, setContractData] = useState(null);
  const [ethBalance, setEthBalance] = useState("");
  const [erc20Balance, setErc20Balance] = useState("");
  const [level, setLevel] = useState(0); // Initialize the level to 1
  const [timeObject, setTimeObject] = useState(null);

  const [mintedTokenURI, setMintedTokenURI] = useState(null);

  const connectWallet = async () => {
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
        const rewardContract = new ethers.Contract(
          rewardsContractAddress,
          rewardsAbi,
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
        setRewardContract(rewardContract);
        console.log(rewardContract);
        setInceptiaContract(inceptiaContract);

        // Fetch Ethereum balance here
        const ethBalance = await provider.getBalance(account);
        const formattedEthBalance = ethers.utils.formatEther(ethBalance);
        const ethBalanceWithFourDecimals =
          parseFloat(formattedEthBalance).toFixed(4);
        setEthBalance(ethBalanceWithFourDecimals);
        // Fetch ERC20 token balance here
        const erc20Balance = await inceptiaContract.balanceOf(account);
        const erc20BalanceInteger = parseInt(
          ethers.utils.formatUnits(erc20Balance, 18),
          10
        ); // Assuming 18 decimal places
        setErc20Balance(erc20BalanceInteger);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    const getActiveBooster = async () => {
      try {
        if (rewardContract && account) {
          console.log("Getting active boosters");
          const booster = await rewardContract.getActiveBooster(account);
          console.log();
          console.log(parseInt(booster["expireTime"]));

          const activationTime = parseInt(booster["activationTimestamp"]);
          const expireTime = parseInt(booster["expireTime"]);
          const currentTimeInSeconds = Math.floor(Date.now() / 1000);
          console.log(currentTimeInSeconds);
          const remainingTime = expireTime - currentTimeInSeconds;
          console.log("remaining Time", remainingTime);
          // Convert the BigInt value to a JavaScript Date object

          const timeObj = convertSecondsToDHMS(remainingTime);
          console.log("remaining days hourse minutes seconds", timeObj);
          setTimeObject(timeObj);
        }
      } catch (error) {
        console.error("Error getting active boosters:", error);
      }
    };

    if (rewardContract && account) {
      getActiveBooster();
    }
  }, [rewardContract, account]);

  // Countdown timer
  useEffect(() => {
    let intervalId;
    if (timeObject) {
      intervalId = setInterval(() => {
        const { days, hours, minutes, seconds } = timeObject;

        if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
          clearInterval(intervalId);
        } else {
          let updatedDays = days;
          let updatedHours = hours;
          let updatedMinutes = minutes;
          let updatedSeconds = seconds - 1;

          if (updatedSeconds < 0) {
            updatedMinutes -= 1;
            updatedSeconds = 59;
          }

          if (updatedMinutes < 0) {
            updatedHours -= 1;
            updatedMinutes = 59;
          }

          if (updatedHours < 0) {
            updatedDays -= 1;
            updatedHours = 23;
          }

          const updatedTimeObject = {
            days: Math.max(0, updatedDays),
            hours: Math.max(0, updatedHours),
            minutes: Math.max(0, updatedMinutes),
            seconds: Math.max(0, updatedSeconds),
          };

          setTimeObject(updatedTimeObject);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timeObject]);

  useEffect(() => {
    // Retrieve the minted NFT URI from localStorage when the component mounts
    const storedMintedTokenURI = localStorage.getItem("mintedTokenURI");
    if (storedMintedTokenURI) {
      setMintedTokenURI(storedMintedTokenURI);
    }
  }, []);

  useEffect(() => {
    console.log("Getting user profile data");
    connectWallet();
  }, []);

 
  // Define the coin thresholds for each level
  const levelThresholds = [100, 150, 160, 170, 200, 290];

  useEffect(() => {
    // Calculate the level based on the erc20 balance and thresholds
    for (let i = 0; i < levelThresholds.length; i++) {
      if (erc20Balance < levelThresholds[i]) {
        setLevel(i);
        break; // Stop checking once the level is set
      }
    }
  }, [erc20Balance]);

  function convertSecondsToDHMS(seconds) {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);

    return {
      days: d,
      hours: h,
      minutes: m,
      seconds: s,
    };
  }

  console.log(erc20Balance)

  return (
    <>
      <Navbar />
      <div
        className="mt-8"
        style={{ backgroundColor: "#1a1c1f", color: "white" }}
      >
        <div className=" mx-auto">
          <div className="main-body">
            <div
              className="mt-0"
              style={{ backgroundColor: "#1a1c1f", color: "white" }}
            >
              <div
                className="flex flex-col md:flex-row   md:space-x-6"
                style={{ backgroundColor: "#1a1c1f", color: "white" }}
              >
                <div className="md:w-1/3">
                  <div
                    className="bg-white rounded-lg shadow-md mb-3"
                    style={{ backgroundColor: "#24262b", color: "white" }}
                  >
                    <div className="flex flex-col items-center justify-center p-6">
                      {mintedTokenURI && (
                        <img
                          src={mintedTokenURI}
                          alt="Updated NFT"
                          className="mb-3 w-1/2 rounded-full h-48"
                        />
                      )}

                      <div className="text-center">
                        <h4 className="text-xl font-medium">
                          Level {level + 1}
                        </h4>{" "}
                        {/* Add 1 to level for 1-based indexing */}
                        <input
                          type="range"
                          min="0"
                          max={levelThresholds.length - 1} // Adjust the max based on the number of levels
                          value={level}
                          className="range"
                          step="1"
                        />
                        <div className="w-full flex justify-between text-xs px-2">
                          {levelThresholds.map((threshold, index) => (
                            <span key={index}>{index + 1}</span>
                          ))}
                        </div>
                        {level >= 5 ? ( // Check if the user's level is 2 or greater
                          <>
                            <Link to="/updateNFT">
                              <button
                                className="bg-blue-500 text-white rounded-full px-4 py-2 mt-3 mr-3 hover-bg-blue-600"
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(50,168,56,1) 0%, rgba(50,168,56,1) 50%, rgba(87,194,33,1) 50%, rgba(87,194,33,1) 100%)",
                                }}
                              >
                                Get Upgrade
                              </button>
                            </Link>

                            <Link to="/marketplace">
                              <button
                                className="bg-white text-white-500 border border-green-500 rounded-full px-4 py-2 mt-3 hover-bg-green-50"
                                style={{
                                  background:
                                    "linear-gradient(90deg, rgba(50,168,56,1) 0%, rgba(50,168,56,1) 50%, rgba(87,194,33,1) 50%, rgba(87,194,33,1) 100%)",
                                }}
                              >
                                Sell Account
                              </button>
                            </Link>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-blue-500 text-white rounded-full px-4 py-2 mt-3 mr-3"
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(50,168,56,1) 0%, rgba(50,168,56,1) 50%, rgba(87,194,33,1) 50%, rgba(87,194,33,1) 100%)",
                              }}
                              disabled
                            >
                              Get Upgrade
                            </button>
                            <button
                              className="bg-white text-white-500 border border-green-500 rounded-full px-4 py-2 mt-3"
                              style={{
                                background:
                                  "linear-gradient(90deg, rgba(50,168,56,1) 0%, rgba(50,168,56,1) 50%, rgba(87,194,33,1) 50%, rgba(87,194,33,1) 100%)",
                              }}
                              disabled
                            >
                              Sell Account
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="bg-white rounded-lg shadow-md mb-3"
                    style={{ backgroundColor: "#24262b", color: "white" }}
                  >
                    <div className="p-6">
                      <h5 className="mb-3 font-medium">Games Played</h5>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-2" style={{ listStyleType: "none" }}>
                          <span
                            className="mr-2"
                            style={{
                              display: "inline-block",
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              background:
                                "url('https://o.remove.bg/downloads/722619c3-ea76-40ea-9062-fc0fa24f680c/attachment_130083113-removebg-preview.png') center / contain no-repeat",
                            }}
                          ></span>
                          Memory Game
                        </li>
                        <li className="mb-2" style={{ listStyleType: "none" }}>
                          <span
                            className="mr-2"
                            style={{
                              display: "inline-block",
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              background:
                                "url('https://o.remove.bg/downloads/722619c3-ea76-40ea-9062-fc0fa24f680c/attachment_130083113-removebg-preview.png') center / contain no-repeat",
                            }}
                          ></span>
                          2048 Game
                        </li>
                        <li className="mb-2" style={{ listStyleType: "none" }}>
                          <span
                            className="mr-2"
                            style={{
                              display: "inline-block",
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              background:
                                "url('https://o.remove.bg/downloads/722619c3-ea76-40ea-9062-fc0fa24f680c/attachment_130083113-removebg-preview.png') center / contain no-repeat",
                            }}
                          ></span>
                          Shuffl Numbers
                        </li>
                        <li className="mb-2" style={{ listStyleType: "none" }}>
                          <span
                            className="mr-2"
                            style={{
                              display: "inline-block",
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              background:
                                "url('https://o.remove.bg/downloads/722619c3-ea76-40ea-9062-fc0fa24f680c/attachment_130083113-removebg-preview.png') center / contain no-repeat",
                            }}
                          ></span>
                          Pending
                        </li>
                        <li className="mb-2" style={{ listStyleType: "none" }}>
                          <span
                            className="mr-2"
                            style={{
                              display: "inline-block",
                              width: "1.5rem",
                              height: "1.5rem",
                              borderRadius: "50%",
                              background:
                                "url('https://o.remove.bg/downloads/722619c3-ea76-40ea-9062-fc0fa24f680c/attachment_130083113-removebg-preview.png') center / contain no-repeat",
                            }}
                          ></span>
                          Bulls Eye
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <div
                    className="bg-white rounded-lg shadow-md p-6 mb-3"
                    style={{ backgroundColor: "#24262b", color: "white" }}
                  >
                    <h5
                      className="text-lg font-medium mb-4"
                      style={{ backgroundColor: "#24262b", color: "white" }}
                    >
                      Personal Statistics & Information
                    </h5>
                    <div className="flex flex-col">
                      <h6
                        className="text-lg font-medium mb-4"
                        style={{ backgroundColor: "#24262b", color: "white" }}
                      >
                        Booster Time Left
                      </h6>
                      <div className="grid grid-flow-col gap-5 text-center auto-cols-max mt-4 mb-4">
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          {timeObject ? (
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": timeObject["days"] }}
                              ></span>
                            </span>
                          ) : (
                            <span className="countdown font-mono text-5xl">
                              <span style={{ "--value": 0 }}></span>
                            </span>
                          )}
                          days
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          {timeObject ? (
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": timeObject["hours"] }}
                              ></span>
                            </span>
                          ) : (
                            <span className="countdown font-mono text-5xl">
                              <span style={{ "--value": 0 }}></span>
                            </span>
                          )}
                          hours
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          {timeObject ? (
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": timeObject["minutes"] }}
                              ></span>
                            </span>
                          ) : (
                            <span className="countdown font-mono text-5xl">
                              <span style={{ "--value": 0 }}></span>
                            </span>
                          )}
                          min
                        </div>
                        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
                          {timeObject ? (
                            <span className="countdown font-mono text-5xl">
                              <span
                                style={{ "--value": timeObject["seconds"] }}
                              ></span>
                            </span>
                          ) : (
                            <span className="countdown font-mono text-5xl">
                              <span style={{ "--value": 0 }}></span>
                            </span>
                          )}
                          sec
                        </div>
                      </div>

                      <div className="stats shadow space-x-3 overflow-x-auto md:flex w-full">
                        <div className="stat place-items-center">
                          <div className="stat-title">Coins Earned</div>
                          <div className="stat-value">{erc20Balance}</div>
                          <div className="stat-desc">
                            From January 1st to February 1st
                          </div>
                        </div>

                        <div className="stat place-items-center">
                          <div className="stat-title">Total Ethereum</div>
                          <div className="stat-value text-green-500">
                            {ethBalance}
                          </div>
                          <div className="stat-desc text-green-500">
                            ↗︎ 40 (2%)
                          </div>
                        </div>

                        <div className="stat place-items-center">
                          <div className="stat-title">Loss Coins</div>
                          <div className="stat-value">1,200</div>
                          <div className="stat-desc">↘︎ 90 (14%)</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-white rounded-lg shadow-md p-6"
                    style={{ backgroundColor: "#24262b", color: "white" }}
                  >
                    <h5 className="text-lg font-medium mb-4">
                      Games Progress and Levels
                    </h5>
                    <div className="flex flex-wrap">
                      <div className="w-full mb-2">
                        <span className="inline-block w-1/5 font-semibold text-gray-400">
                          Memory Game
                        </span>
                        <div className="inline-block w-3/5 h-3 ml-2 rounded-full bg-gray-300">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width: "80%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-full mb-2">
                        <span className="inline-block w-1/5 font-semibold text-gray-400">
                          Shuffle Numbers
                        </span>
                        <div className="inline-block w-3/5 h-3 ml-2 rounded-full bg-gray-300">
                          <div
                            className="h-full rounded-full bg-green-500"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-full mb-2">
                        <span className="inline-block w-1/5 font-semibold text-gray-400">
                          2048 Game
                        </span>
                        <div className="inline-block w-3/5 h-3 ml-2 rounded-full bg-gray-300">
                          <div
                            className="h-full rounded-full bg-yellow-500"
                            style={{ width: "70%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-full mb-2">
                        <span className="inline-block w-1/5 font-semibold text-gray-400">
                          Game 4
                        </span>
                        <div className="inline-block w-3/5 h-3 ml-2 rounded-full bg-gray-300">
                          <div
                            className="h-full rounded-full bg-purple-500"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-full mb-2">
                        <span className="inline-block w-1/5 font-semibold text-gray-400">
                          Bulls Eye
                        </span>
                        <div className="inline-block w-3/5 h-3 ml-2 rounded-full bg-gray-300">
                          <div
                            className="h-full rounded-full bg-red-500"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="w-full mb-2">
                        <span className="inline-block w-1/5 font-semibold text-gray-400">
                          Game 6
                        </span>
                        <div className="inline-block w-3/5 h-3 ml-2 rounded-full bg-gray-300">
                          <div
                            className="h-full rounded-full bg-teal-500"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <>
  <Navbar />
  <div className="mt-8 bg-gray-900 text-white">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row md:space-x-6">
        <div className="md:w-1/3 mb-4 md:mb-0">
          <div className="bg-white rounded-lg shadow-md p-6 bg-gray-800">
            {mintedTokenURI && (
              <img src={mintedTokenURI} alt="Updated NFT" className="mb-3 w-1/2 rounded-full mx-auto" />
            )}
            <div className="text-center">
              <h5 className="text-xl font-medium">Username</h5>
              <h4 className="text-xl font-medium">Level</h4>
              <input
                type="range"
                min="0"
                max="100"
                value="25"
                className="range w-full"
                step="25"
              />
              <div className="w-full flex justify-between text-xs px-2">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
              </div>
              <Link to="/updateNFT">
                <button className="btn-primary mt-3 mx-auto">Get Upgrade</button>
              </Link>
              <Link to="/marketplace">
                <button className="btn-secondary mt-3 mx-auto">Sell Account</button>
              </Link>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 bg-gray-800">
            <h5 className="mb-3 font-medium">Games Played</h5>
            <ul className="list-none">
            
            </ul>
          </div>
        </div>
        <div className="md:w-2/3">
        
        </div>
      </div>
    </div>
  </div>
</> */}
<Footer/>
    </>
  );
}
export default Profile;
