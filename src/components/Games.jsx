import React, { useState, useEffect } from "react";
import "./Games.css";
import Hh from "./Hh";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import game1pi from "../img/game1pic.png";
import game2pi from "../img/game2pic.png";
import game3pi from "../img/game3pic.png";
import { ethers } from "ethers";
import {
  rewardsContractAddress,
  rewardsAbi,
  inceptiaContractAddress,
  inceptiaAbi,
} from "../contract/index";

const Games = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [inceptiaContract, setInceptiaContract] = useState(null);
  const [account, setAccount] = useState("");
  const [provider, setProvider] = useState("");
  const [signer, setSigner] = useState("");
  const navigate = useNavigate();
  const [transaction2, setTransaction2] = useState(false);
  const [transaction3, setTransaction3] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 100) {
        setIsVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

        const inceptiaContract = new ethers.Contract(
          inceptiaContractAddress,
          inceptiaAbi,
          signer
        );

        setAccount(account);
        setProvider(provider);
        setSigner(signer);
        setInceptiaContract(inceptiaContract);
        console.log(inceptiaContract);
        setInceptiaContract(inceptiaContract);
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  useEffect(() => {
    connectWallet();
  }, [account]);

  async function handlePlayGame(gameNo) {
    try {
      // Convert 10 INCEPTIA to wei
      let amountInInceptia = gameNo * 5;
      let amountInWei = ethers.utils.parseUnits(
        amountInInceptia.toString(),
        18
      );

      // Deduct tokens from the user
      const tx = await inceptiaContract.transfer(
        rewardsContractAddress,
        amountInWei
      );
      const receipt = await tx.wait();
      if (receipt.status == 1) {
        switch (gameNo) {
          case 2:
            setTransaction2(true);
            break;
          case 3:
            setTransaction3(true);
            navigate("/game2048");
            break;

          default:
            break;
        }
      }
      // Continue with the rest of your game logic
    } catch (error) {
      console.error("Error handling game:", error);
    }
  }

  return (
    <>
      <Navbar />
      <Hh />
      <div className="main">
        <div className="hero mb-0" style={{ backgroundColor: "#1a1c1f" }}>
          <div
            className={`hero-content flex-col lg:flex-row transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={game1pi}
              className="max-w-md rounded-lg shadow-2xl mr-8"
              width="500"
              height="700"
            />
            <div className="mt-20">
              <h5 className="text-3xl font-bold">
                "Memory Game": Your Ultimate Destination for Board Game
                Enthusiasts!
              </h5>
              <div>
                <ul className="steps steps-vertical">
                  <li
                    className="step-base-content"
                    style={{ color: "#57c221" }}
                  >
                    Chess is a classic strategy game that challenges players'
                    tactical prowess and foresight.
                  </li>
                  <li
                    className="step-base-content"
                    style={{ color: "#57c221" }}
                  >
                    Players race their four tokens from start.
                  </li>
                  <li
                    className="step-base-content"
                    style={{ color: "#57c221" }}
                  >
                    Checkmate your opponent's King, a feat achieved through
                    calculated moves and well-thought-out strategies.
                  </li>
                  <li
                    className="step-base-content"
                    style={{ color: "#57c221" }}
                  >
                    User can get INC rewards in return.
                  </li>
                  <li
                    className="step-base-content"
                    style={{ color: "#57c221" }}
                  >
                    User have to complete this game in specified time
                  </li>
                  <button
                    className="btn w-32"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(50,168,56,1) 0%, rgba(50,168,56,1) 50%, rgba(87,194,33,1) 50%, rgba(87,194,33,1) 100%)",
                      color: "#fff",
                    }}
                  >
                    <Link to="/memorygame">Play Now1</Link>
                  </button>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="hero" style={{ backgroundColor: "#1a1c1f" }}>
          <div
            className={`hero-content flex-col lg:flex-row-reverse transition-opacity duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={game3pi}
              className="max-w-md rounded-lg shadow-2xl mr-8"
              width="500"
              height="500"
            />
            <div>
              <h1 className="text-3xl font-bold">Shuffle Numbers</h1>
              <ul className="steps steps-vertical">
                <li
                  className="step step-base-content"
                  style={{ color: "#57c221" }}
                >
                  Ludo is a board game played with 2-4 players.
                </li>
                <li
                  className="step step-base-content"
                  style={{ color: "#57c221" }}
                >
                  Players race their four tokens from start.
                </li>
                <li
                  className="step step-base-content"
                  style={{ color: "#57c221" }}
                >
                  Tokens must make a full circuit of the board to reach the
                  finish line.
                </li>
                <li
                  className="step step-base-content"
                  style={{ color: "#57c221" }}
                >
                  User can get INC rewards in return.
                </li>
                <li
                  className="step step-base-content"
                  style={{ color: "#57c221" }}
                >
                  User have to complete this game in specified time
                </li>
                <button
                  className="btn w-32"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(50,168,56,1) 0%, rgba(50,168,56,1) 50%, rgba(87,194,33,1) 50%, rgba(87,194,33,1) 100%)",
                    color: "#fff",
                  }}
                  onClick={() => {
                    handlePlayGame(2);
                  }}
                >
                  <Link to="/board">Play Now2</Link>
                </button>{" "}
              </ul>
            </div>
          </div>
        </div>
        <div className="" style={{ backgroundColor: "#1a1c1f" }}>
          <div className="hero" style={{ backgroundColor: "#1a1c1f" }}>
            <div
              className={`hero-content flex-col lg:flex-row transition-opacity duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={game2pi}
                className="max-w-md rounded-lg shadow-2xl mr-8"
                width="500"
                height="500"
              />

              <div className="mt-8">
                <h5 className="text-3xl font-bold">
                  "2048 Game": Your Go-To Hub for Puzzle Game Enthusiasts!
                </h5>
                <div>
                  <ul className="steps steps-vertical">
                    <li
                      className="step step-neutral-content"
                      style={{ color: "#57c221" }}
                    >
                      2048 is an addictive sliding game that demands skillful
                      planning and quick thinking.
                    </li>
                    <li
                      className="step step-base-content"
                      style={{ color: "#57c221" }}
                    >
                      Players navigate numbered tiles on a grid, merging
                      matching tiles to create values.
                    </li>
                    <li
                      className="step step-base-content"
                      style={{ color: "#57c221" }}
                    >
                      The goal? Reach the elusive 2048 tile while strategically
                      avoiding gridlock.
                    </li>
                    <li
                      className="step step-base-content"
                      style={{ color: "#57c221" }}
                    >
                      User will got INC coins in reward
                    </li>
                    <li
                      className="step step-base-content"
                      style={{ color: "#57c221" }}
                    >
                      User have to complete this game in specified time
                    </li>
                    <button
                      className="btn w-32"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(50,168,56,1) 0%, rgba(50,168,56,1) 50%, rgba(87,194,33,1) 50%, rgba(87,194,33,1) 100%)",
                        color: "#fff",
                      }}
                      onClick={async () => {
                        await handlePlayGame(3).then();
                      }}
                    >
                      {transaction3 ? (
                        <Link to="/game2048">Play Now 3</Link>
                      ) : (
                        "Pay to play"
                      )}
                    </button>{" "}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Games;
