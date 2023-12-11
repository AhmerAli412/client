// import React from "react";
// import { Link } from "react-router-dom";
// import market from './market.png';

// const Navigation = ({ web3Handler, account, setActivePage }) => {
//     const handleClick = (page) => {
//       setActivePage(page); // Update the active page when a link is clicked
//     };

//     return (
//       <div className=" bg-[#161616fd] py-4 px-4 flex items-center justify-between" >
//         {/* ... (your existing code) */}
//         <div className="space-x-4">
//           <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('Home')}>Home</span>
//           <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('Create')}>Create</span>
//           <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('MyListedItems')}>My Listed Items</span>
//           <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('MyPurchases')}>My Purchases</span>
//           <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('ClaimNFT')}>Claim NFT</span>
//           <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('UpdateNFT')}>Update NFT</span>
//         </div>
//         {/* ... (your existing code) */}
//       </div>
//     );
//   };

//   export default Navigation;

// Navigation.js
import React from "react";
import { Link } from "react-router-dom";
import market from "./market.png";

const Navigation = ({ web3Handler, account, setActivePage }) => {
  const handleClick = (page) => {
    setActivePage(page);
  };

  return (
    <div className=" bg-[#24262b] py-4 px-4 flex items-center justify-between">
      <Link to="/" className="text-white flex items-center space-x-2">
        {/* <img src={market} alt="" className="w-8 h-8" /> */}
        <span className="text-xl ">Inceptia NFT Marketplace</span>
      </Link>
      <div className="space-x-4">
        <span
          className="cursor-pointer text-white hover:underline"
          onClick={() => handleClick("Home")}
        >
          Home
        </span>
        <span
          className="cursor-pointer text-white hover:underline"
          onClick={() => handleClick("Create")}
        >
          Create
        </span>
        <span
          className="cursor-pointer text-white hover:underline"
          onClick={() => handleClick("MyListedItems")}
        >
          My Listed Items
        </span>
        <span
          className="cursor-pointer text-white hover:underline"
          onClick={() => handleClick("MyPurchases")}
        >
          Owned NFTs
        </span>
        <span
          className="cursor-pointer text-white hover:underline"
          onClick={() => handleClick("TransactionHistory")}
        >
          Transaction History
        </span>
        {/* <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('ClaimNFT')}>Claim NFT</span>
        <span className="cursor-pointer text-white hover:underline" onClick={() => handleClick('UpdateNFT')}>Update NFT</span> */}
      </div>
      {account && (
        <a
          href={`https://etherscan.io/address/${account}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-sm btn-outline-light mx-4 text-white"
        >
          {account.slice(0, 5) + "..." + account.slice(38, 42)}
        </a>
      )}
      {!account && (
        <button
          onClick={web3Handler}
          className="bg-white text-green-600 hover:bg-gray-100 py-2 px-4 rounded border border-green-600 hover:border-transparent"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};

export default Navigation;
