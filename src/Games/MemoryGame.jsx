import "./Memory.css";
import Images from "../Images";
import { shuffle } from "lodash";
import { useEffect, useState } from "react";
import {
  rewardsAbi,
  rewardsContractAddress,
  inceptiaAbi,
  inceptiaContractAddress,
} from "../contract/index";
import { ethers } from "ethers";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

// Separate Card component
function Card({ card, index, flippedToFront, onClick }) {
  const [isGameOver, setIsGameOver] = useState(false);
  const handleClick = () => {
    if (!isGameOver) {
      onClick(index);
    }
  };
  return (
    <div
      className={`card-outer ${flippedToFront ? "flipped" : ""}`}
      onClick={() => onClick(index)}
    >
      <div className="card">
        <div className="front">
          <img src={card} alt="" />
        </div>
        <div className="back" />
      </div>
    </div>
  );
}

function MemoryGame(props) {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    inceptiaContract: null,
  });
  const [cards, setCards] = useState(shuffle([...Images, ...Images]));
  const [clicks, setClicks] = useState(0);
  const [isGameWon, setIsGameWon] = useState(false);
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [balance, setBalance] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [account, setAccount] = useState("None");
  const { user } = useUser();
  const [score, setScore] = useState(null);
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [timer, setTimer] = useState(30); // 30-second timer
  const [isGameOver, setIsGameOver] = useState(false);

  // Separate function to reset the game
  function resetGame() {
    // setCards(shuffle([...Images, ...Images]));
    setFoundPairs([]);
    setIsGameWon(false);
    setClicks(0);
  }

  // Example in Game 1 component
async function handleGameWon() {
  console.log("Game 1 - userId:", user.id);

  try {
    const response = await fetch('https://inceptia.onrender.com/incrementWinCount', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: user.id, gameNumber: 1 }),
    });

    const data = await response.json();
    console.log("Game 1 - Server Response:", data);
  } catch (error) {
    console.error('Game 1 - Error updating win count on the server:', error);
  }

  // Open the modal
  openModal();
}

  async function closeModal() {
    await handleCalculateRewards();
    setIsOpen(false);
    resetGame();
  }

  function openModal() {
    console.log(isOpen);
    setIsOpen(true);
  }

  console.log(user)

  function handleAddCoin() {
    window.ethereum
      .request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: "0xc6C32539B7250600b25360c681516f3081731A6E",
            symbol: "INC",
            decimals: 18,
          },
        },
      })
      .then((success) => {
        if (success) {
          console.log("Token added to MetaMask");
        } else {
          console.error("Token could not be added to MetaMask");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCalculateRewards = async () => {
    try {
      const rewardAmountWei = ethers.utils.parseUnits("1", 0); // 1 token in wei

      // Call the contract's calculateRewards function
      const transaction = await state.contract.calculateRewards(
        rewardAmountWei,
        1
      );
      // Wait for the transaction to be mined
      await transaction.wait();

      // After the rewards calculation, show the balance modal
      setShowBalanceModal(true);
    } catch (error) {
      console.error("Error calculating rewards:", error);
    }
  };

  const handleGetInceptiaBalance = async () => {
    try {
      let balance = await state.inceptiaContract.balanceOf(account[0]);
      let userBalance = ethers.BigNumber.from(balance).toString();
      userBalance = ethers.utils.formatEther(userBalance);
      setBalance(userBalance);
    } catch (error) {
      console.error("Error getting Inceptia balance:", error);
    }
  };

  const closeBalanceModal = () => {
    // Close the balance modal and reset game state
    setShowBalanceModal(false);
    resetGame();
  };

  async function flipCard(index) {
    // Check if the clicked card is already active, and ignore the click if it is
    if (activeCards.includes(index)) {
      return;
    }

    if (activeCards.length === 0) {
      setActiveCards([index]);
    } else if (activeCards.length === 1) {
      const firstIndex = activeCards[0];
      const secondsIndex = index;
      if (cards[firstIndex] === cards[secondsIndex]) {
        // foundPairs.length + 2 === cards.length
        if (foundPairs.length <= 1) {
          setIsGameWon(true);
          await handleGameWon();
        }
        setFoundPairs([...foundPairs, firstIndex, secondsIndex]);
      }
      setActiveCards([...activeCards, index]);
    } else if (activeCards.length === 2) {
      setActiveCards([index]);
    }
    setClicks(clicks + 1);
  }

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = rewardsContractAddress;
      const contractABI = rewardsAbi;

      try {
        const { ethereum } = window;

        if (ethereum) {
          const account = await ethereum.request({
            method: "eth_requestAccounts",
          });

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

          setState({ provider, signer, contract, inceptiaContract });
          const balance = await inceptiaContract.balanceOf(account[0]);
          let userBalance = ethers.BigNumber.from(balance).toString();
          userBalance = ethers.utils.formatEther(userBalance);
          setBalance(userBalance);
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    };
    connectWallet();
  }, []);

  useEffect(() => {
    if (timer > 0 && !isGameWon && !isGameOver) {
      const timerId = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearInterval(timerId);
    } else if (timer === 0 && !isGameWon && !isGameOver) {
      // Player lost the game
      setIsGameOver(true);
      alert("You lost the game");
      // Optionally, you can add additional logic here to disable further gameplay.
    }
  }, [timer, isGameWon, isGameOver]);

  return (
    <div>
      <Navbar/>
      {/* <button onClick={openModal}>Show modal</button> */}
      <div className="board">
        {cards.map((card, index) => {
          const flippedToFront =
            activeCards.includes(index) || foundPairs.includes(index);
          return (
            <Card
              key={index}
              card={card}
              index={index}
              flippedToFront={flippedToFront}
              onClick={flipCard}
              isGameOver={isGameOver}
            />
          );
        })}
      </div>
      <div className="statsy mt-28">
        Clicks: {clicks} &nbsp;&nbsp;&nbsp; Found pairs: {foundPairs.length / 2}
        <br />
        Time left: {timer} seconds
      </div>
      <div className="mt-5">
        {balance !== null && (
          <div className="bal">
            <p>Balance is {balance} INCEPTIA</p>
          </div>
        )}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Payment successful
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You have won the game your score is {score}.{" "}
                    </p>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Got it, thanks!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Transition appear show={showBalanceModal} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeBalanceModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Balance Information
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <p>Balance is {balance} INCEPTIA</p>
                    </p>
                  </div>

                  <div className="mt-4">
                    <Link to="/" className="block text-center">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        onClick={closeBalanceModal}
                      >
                        Got it, thanks!
                      </button>
                    </Link>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Footer/>
    </div>
  );
}

export default MemoryGame;
