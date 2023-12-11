// import React, { useState, useEffect } from "react";
// import $ from "jquery";
// import { Link } from "react-router-dom";
// import '../components/Navbar.css'
// // import React from 'react';
// import { SignedIn, SignedOut, SignInButton, SignInWithMetamaskButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';

// function Navbar() {
//   const { user } = useUser();
//   const [activeTab, setActiveTab] = useState(null);

//   useEffect(() => {
//     // Set active tab based on current location
//     const path = window.location.pathname.split("/").pop();
//     const target = $(`#navbarSupportedContent ul li a[href="${path}"]`);
//     setActiveTab(target.parent().index());
//   }, []);

//   useEffect(() => {
//     // Initialize responsive navbar animation
//     function test() {
//       const tabsNewAnim = $("#navbarSupportedContent");
//       const selectorNewAnim = tabsNewAnim.find("li").length;
//       const activeItemNewAnim = tabsNewAnim.find(".active");
//       if (!activeItemNewAnim.length) return; // Return if active item is not found
//       const activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
//       const activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
//       const itemPosNewAnimTop = activeItemNewAnim.position();
//       const itemPosNewAnimLeft = activeItemNewAnim.position();
//       $(".hori-selector").css({
//         top: `${itemPosNewAnimTop?.top}px`, // Add the safe navigation operator to check for undefined values
//         left: `${itemPosNewAnimLeft?.left}px`, // Add the safe navigation operator to check for undefined values
//         height: `${activeWidthNewAnimHeight}px`,
//         width: `${activeWidthNewAnimWidth}px`,
//       });
//       $("#navbarSupportedContent").on("click", "li", function (e) {
//         $("#navbarSupportedContent ul li").removeClass("active");
//         $(this).addClass("active");
//         const activeWidthNewAnimHeight = $(this).innerHeight();
//         const activeWidthNewAnimWidth = $(this).innerWidth();
//         const itemPosNewAnimTop = $(this).position();
//         const itemPosNewAnimLeft = $(this).position();
//         $(".hori-selector").css({
//           top: `${itemPosNewAnimTop?.top}px`, // Add the safe navigation operator to check for undefined values
//           left: `${itemPosNewAnimLeft?.left}px`, // Add the safe navigation operator to check for undefined values
//           height: `${activeWidthNewAnimHeight}px`,
//           width: `${activeWidthNewAnimWidth}px`,
//         });
//       });
//     }
  
//     setTimeout(() => {
//       test();
//     });
  
//     $(window).on("resize", function () {
//       setTimeout(() => {
//         test();
//       }, 500);
//     });
  
//     $(".navbar-toggler").click(function () {
//       $(".navbar-collapse").slideToggle(300);
//       setTimeout(() => {
//         test();
//       });
//     });
//   }, []);
  

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   return (
//     <nav className="navbar navbar-expand-custom navbar-mainbg">
//       {/* <a className="navbar-brand navbar-logo" href="#">
//         Navbar
//       </a> */}
//       <button
//         className="navbar-toggler"
//         type="button"
//         aria-controls="navbarSupportedContent"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <i className="fas fa-bars text-white"></i>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarSupportedContent">
//         <ul className="navbar-nav ml-auto">
//           <div className="hori-selector">
//             <div className="left"></div>
//             <div className="right"></div>
//           </div>
//           <li className={`nav-item ${activeTab === 0 ? "active" : ""}`}>
//             <Link
//               className="nav-link"
//               to="/"
//               onClick={() => handleTabClick(0)}
//             >
//               <i className="fas fa-tachometer-alt"></i>Home
//             </Link>
//           </li>


//           <li className={`nav-item ${activeTab === 1 ? "active" : ""}`}>
//             <Link
//               className="nav-link"
//               to="/profile"
//               onClick={() =>
//                 handleTabClick(1)
//             }
//             >
//               <i className="far fa-user"></i>Profile
//             </Link>
//           </li>




//           <li className={`nav-item ${activeTab === 2 ? "active" : ""}`}>
//             <Link
//               className="nav-link"
//               to="/marketplace"
//               onClick={() => handleTabClick(2)}
//             >
//               <i className="fas fa-cog"></i>Marketplace
//             </Link>
//           </li>


//           <li className={`nav-item ${activeTab === 3 ? "active" : ""}`}>
//   <Link
//     className="nav-link"
//     to="/swapping"
//     onClick={() => handleTabClick(3)}
//   >
//     <i className="fas fa-exchange-alt"></i>Swapping
//   </Link>
// </li>
// <li className={`nav-item ${activeTab === 3 ? "active" : ""}`}>
//   <a
//     className="nav-link"
//     href="https://testnets.opensea.io/account"
//     target="_blank"
//     // onClick={() => handleTabClick(3)}
//   >
//     <i className="fas fa-exchange-alt">OpenSea</i>
//   </a>
// </li>
//           <li className="nav-item b">
//             <Link className="nav-link"
//              to="/claimNFT"
//              >
//               <i className="far fa-envelope"></i>ClaimNFT
//             </Link>
//           </li>

     


          

          




//           <div className="text-container1">
//   <SignedIn className="signed-in">
//   {user && user.web3Wallets && user.web3Wallets.length > 0 && (
//   <div className="flex-container">
//     <div className="address">
//       {user.web3Wallets[0].web3Wallet.substring(0, 8)}
//     </div>
//     <div className="user-account">{/* Add user account content here */}</div>
//   </div>
// )}
//     <UserButton afterSignOutUrl={window.location.href} />
//   </SignedIn>
//   <SignedOut>
//   <SignUpButton mode="modal" providers={["Google"]} />
//     {/* <SignInWithMetamaskButton mode='popup' /> */}
//   </SignedOut>
// </div>




  
//         </ul>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;






// import React, { useState, useEffect } from "react";
// import $ from "jquery";
// import { Link } from "react-router-dom";
// import { ethers } from "ethers";
// import '../components/Navbar.css'
// import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
// import {
//   inceptiaContractAddress,
//   inceptiaAbi,
//   rewardsContractAddress,
//   rewardsAbi,
// } from "../contract/index";

// function MetamaskForm({ onMetamaskConnect }) {
//   const [metamaskAddress, setMetamaskAddress] = useState('');
//   const [provider, setProvider] = useState(null);
//   const [signer, setSigner] = useState(null);
//   const [rewardContract, setRewardContract] = useState(null);
//   const [inceptiaContract, setInceptiaContract] = useState(null);
//   const [account, setAccount] = useState(null);
//   const [ethBalance, setEthBalance] = useState("");
//   const [erc20Balance, setErc20Balance] = useState("");

 
//   const handleMetamaskConnect = async () => {
//     try {
//       const { ethereum } = window;

//       if (ethereum) {
//         const accounts = await ethereum.request({
//           method: "eth_requestAccounts",
//         });

//         const account = accounts[0];

//         window.ethereum.on("chainChanged", () => {
//           window.location.reload();
//         });

//         window.ethereum.on("accountsChanged", () => {
//           window.location.reload();
//         });

//         const provider = new ethers.providers.Web3Provider(ethereum);
//         const signer = provider.getSigner();
//         const rewardContract = new ethers.Contract(
//           rewardsContractAddress,
//           rewardsAbi,
//           signer
//         );
//         const inceptiaContract = new ethers.Contract(
//           inceptiaContractAddress,
//           inceptiaAbi,
//           signer
//         );

//         setAccount(account);
//         setProvider(provider);
//         setSigner(signer);
//         setRewardContract(rewardContract);
//         console.log(rewardContract);
//         setInceptiaContract(inceptiaContract);

//         // Fetch Ethereum balance here
//         const ethBalance = await provider.getBalance(account);
//         const formattedEthBalance = ethers.utils.formatEther(ethBalance);
//         const ethBalanceWithFourDecimals =
//           parseFloat(formattedEthBalance).toFixed(4);
//         setEthBalance(ethBalanceWithFourDecimals);
//         // Fetch ERC20 token balance here
//         const erc20Balance = await inceptiaContract.balanceOf(account);
//         const erc20BalanceInteger = parseInt(
//           ethers.utils.formatUnits(erc20Balance, 18),
//           10
//         ); // Assuming 18 decimal places
//         setErc20Balance(erc20BalanceInteger);
//       } else {
//         alert("Please install MetaMask");
//       }
//     } catch (error) {
//       console.error("Error connecting wallet:", error);
//     }
//   };

//   console.log(erc20Balance)

//   return (
//     <div>
//       <label>Metamask Address:</label>
//       <input type="text" value={metamaskAddress} readOnly />
     
//       <button onClick={handleMetamaskConnect}>Connect to Metamask</button>
//     </div>
//   );
// }


// function Navbar({erc20Balance}) {
//   const { user } = useUser();
//   const [activeTab, setActiveTab] = useState(null);

//   useEffect(() => {
//     const path = window.location.pathname.split("/").pop();
//     const target = $(`#navbarSupportedContent ul li a[href="${path}"]`);
//     setActiveTab(target.parent().index());
//   }, []);

//   const handleTabClick = (index) => {
//     setActiveTab(index);
//   };

//   console.log(erc20Balance)

//   const handleMetamaskConnect = async (metamaskAddress, erc20Balance) => {
//     fetch('https://inceptia.onrender.com/saveUserData', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         userId: user.id,
//         firstName: user.firstName,
//         lastName: user.lastName,
//         metamaskAddress,
//         erc20Balance,
//       }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log('User data stored on the server:', data);
//       })
//       .catch((error) => {
//         console.error('Error storing user data:', error);
//       });
//   };








import React, { useState, useEffect } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';
import { inceptiaContractAddress, inceptiaAbi, rewardsContractAddress, rewardsAbi } from "../contract/index";
import '../components/Navbar.css';

function Navbar() {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState(null);
  const [metamaskAddress, setMetamaskAddress] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [rewardContract, setRewardContract] = useState(null);
  const [inceptiaContract, setInceptiaContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [ethBalance, setEthBalance] = useState("");
  const [erc20Balance, setErc20Balance] = useState("");

  useEffect(() => {
    const path = window.location.pathname.split("/").pop();
    const target = $(`#navbarSupportedContent ul li a[href="${path}"]`);
    setActiveTab(target.parent().index());
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  const handleMetamaskConnect = async () => {
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
        setInceptiaContract(inceptiaContract);
  
        const ethBalance = await provider.getBalance(account);
        const formattedEthBalance = ethers.utils.formatEther(ethBalance);
        const ethBalanceWithFourDecimals =
          parseFloat(formattedEthBalance).toFixed(4);
  
        const erc20Balance = await inceptiaContract.balanceOf(account);
        const erc20BalanceInteger = parseInt(
          ethers.utils.formatUnits(erc20Balance, 18),
          10
        );
  
        setEthBalance(ethBalanceWithFourDecimals);
        setErc20Balance(erc20BalanceInteger);
        setMetamaskAddress(account);
  
        // Return the values here
        return {
          metamaskAddress: account,
          erc20Balance: erc20BalanceInteger,
        };
      } else {
        alert("Please install MetaMask");
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
      throw error; // Rethrow the error to be caught in the calling function
    }
  };
  

  console.log(erc20Balance)

  const handleMetamaskConnectAndStoreUserData = async () => {
    try {
      const { metamaskAddress, erc20Balance } = await handleMetamaskConnect();
  
      fetch('https://inceptia.onrender.com/saveUserData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          metamaskAddress,
          erc20Balance,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('User data stored on the server:', data);
        })
        .catch((error) => {
          console.error('Error storing user data:', error);
        });
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };
  
  
  return (
    <nav className="navbar navbar-expand-custom navbar-mainbg">
      <button
        className="navbar-toggler"
        type="button"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fas fa-bars text-white"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ml-auto">
          <li className={`nav-item ${activeTab === 0 ? "active" : ""}`}>
            <Link className="nav-link" to="/" onClick={() => handleTabClick(0)}>
              <i className="fas fa-tachometer-alt"></i>Home
            </Link>
          </li>

          <li className={`nav-item ${activeTab === 1 ? "active" : ""}`}>
            <Link className="nav-link" to="/profile" onClick={() => handleTabClick(1)}>
              <i className="far fa-user"></i>Profile
            </Link>
          </li>

          <li className={`nav-item ${activeTab === 2 ? "active" : ""}`}>
            <Link className="nav-link" to="/marketplace" onClick={() => handleTabClick(2)}>
              <i className="fas fa-cog"></i>Marketplace
            </Link>
          </li>

          <li className="nav-item">
          
            {/* <input type="text" value={metamaskAddress} readOnly /> */}
            <a className="nav-item" onClick={handleMetamaskConnectAndStoreUserData}>Connect to Metamask</a>
          </li>

          {/* <li className={`nav-item ${activeTab === 3 ? "active" : ""}`}>
            <Link className="nav-link" to="/swapping" onClick={() => handleTabClick(3)}>
              <i className="fas fa-exchange-alt"></i>Swapping
            </Link>
          </li> */}

          <li className={`nav-item ${activeTab === 3 ? "active" : ""}`}>
            <a className="nav-link" href="https://testnets.opensea.io/account" target="_blank">
              <i className="fas fa-exchange-alt">OpenSea</i>
            </a>
          </li>

          <li className="nav-item b">
            <Link className="nav-link" to="/claimNFT">
              <i className="far fa-envelope"></i>ClaimNFT
            </Link>
          </li>

          <div className="text-container1">
            <SignedIn className="signed-in">
              {user && user.web3Wallets && user.web3Wallets.length > 0 && (
                <div className="flex-container">
                  <div className="address">{user.web3Wallets[0].web3Wallet.substring(0, 8)}</div>
                  <div className="user-account"></div>
                </div>
              )}
              <UserButton afterSignOutUrl={window.location.href} />
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="modal" providers={["Google"]} />
            </SignedOut>
          </div>

          <li className="nav-item">
            {/* <MetamaskForm onMetamaskConnect={handleMetamaskConnect} /> */}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;




