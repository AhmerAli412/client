import React, { useState, useEffect } from "react";
import Tile from "./Tile";
import Cell from "./Cell";
import useEvent from "./hooks/useEvent";
import { Board } from "./helper";
import GameOverlay from "./GameOverlay";

import {
  rewardsAbi,
  rewardsContractAddress,
  inceptiaAbi,
  inceptiaContractAddress,
} from "../../contract/index";
import { ethers } from "ethers";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

const BoardView = () => {
  const [board, setBoard] = useState(new Board());
  const [gameOver, setGameOver] = useState(false);
  const [balance, setBalance] = useState("");
  const { user } = useUser();
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
    inceptiaContract: null,
  });
  const [account, setAccount] = useState("None");
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timer > 0 && !gameOver) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        clearInterval(timerInterval);
        if (!gameOver) {
          setGameOver(true);
          alert("Time's up! Game over.");
          handleCalculateRewards(); // Optionally calculate rewards when time's up
        }
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [timer, gameOver]);

  const handleKeyDown = (event) => {
    if (gameOver || board.hasWon()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      let direction = event.keyCode - 37;
      let boardClone = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardClone.move(direction);
      setBoard(newBoard);

      if (newBoard.score > 50) {
        setGameOver(true);
        alert("You won!");
        handleCalculateRewards();
      }
    }
  };

  useEvent("keydown", handleKeyDown);

  useEffect(() => {
    if (board.hasLost()) {
      setGameOver(true);
    }
  }, [board]);

  // const handleCalculateRewards = async () => {
  //   try {
  //     const transaction = await state.contract.calculateRewards(1, 1);
  //     // Wait for the transaction to be mined
  //     await transaction.wait();

  //     // After the rewards calculation, show the balance modal
  //     setShowBalanceModal(true);
  //   } catch (error) {
  //     console.error("Error calculating rewards:", error);
  //   }
  // };


  const handleCalculateRewards = async () => {
    try {
      if (state.contract) {
        const gameNumber = 3; // Assuming game 3
        const transaction = await state.contract.calculateRewards(gameNumber, 1);
        // Wait for the transaction to be mined
        await transaction.wait();
  
        // Send the win count increment request to the server
        const userId = user.id; // Assuming you have the user ID
        const winCountResponse = await fetch('https://inceptia.onrender.com/incrementWinCount', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, gameNumber }),
        });
  
        const winCountData = await winCountResponse.json();
        console.log("Server Response:", winCountData);
        
        // After the rewards calculation, show the balance modal
        setShowBalanceModal(true);
      } else {
        console.error("Contract not initialized");
      }
    } catch (error) {
      console.error("Error calculating rewards:", error);
    }
  };

  
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

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex}>
        {row.map((col, colIndex) => {
          return <Cell key={rowIndex * board.size + colIndex} />;
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return <Tile tile={tile} key={index} />;
    });

  const resetGame = () => {
    setBoard(new Board());
    setGameOver(false);
  };

  return (
    <div>
      <Navbar/>
      <div className="details-box">
        <div className="resetButton" onClick={resetGame}>
          New Game
        </div>
        <div className="score-box">
          <div className="score-header">Points</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div className="board">
        {cells}
        {tiles}
        {gameOver && <GameOverlay onRestart={resetGame} board={board} />}
      </div>

      <div className="timer">Time Remaining: {timer} seconds</div>
      <Footer/>
    </div>

  );
};

export default BoardView;
