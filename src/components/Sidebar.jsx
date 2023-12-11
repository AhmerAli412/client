import React, { useState } from "react";
import "../components/Sidebar.css";
import bg from "../bg.png";
import { BiSearch, BiMenu, BiArrowBack } from "boxicons";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Slider from "./Slider";
import Leaderboard from "./Leaderboard";
import Games from "./Games";
import Chatbot from "./Chatbot";
import { Link } from "react-router-dom";
import Pricing from "./Pricing";
import Footer from "./Footer";
import Banner from "./Banner";
import Collections from "./Collections";
import Stats from "./Stats";
import Testimonials from "./Testimonials";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearchBoxClick = () => {
    setIsSidebarOpen(false);
  };

  const handleModeSwitch = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <nav className={isSidebarOpen ? "sidebar" : "sidebar close"}>
        <header>
          <div className="image-text">
            <span className="image">
              <img src={bg} alt="" />
            </span>

            <div className="text logo-text">
              <span className="name">Inceptia</span>
              <span className="profession">Play to Earn</span>
            </div>
          </div>

          <i
            className={
              
              isSidebarOpen
                ? "bx bx-chevron-right toggle"
                : "bx bx-chevron-left toggle"
            }
            onClick={handleSidebarToggle}
          ></i>
        </header>

        <div className="menu-bar">
          <div className="menu">
            <li className="search-box" onClick={handleSearchBoxClick}>
              {/* <BiSearch size={32} color="#ff0000" className="search-icon" /> */}

              <i className="bx bx-search icon "></i>
              <input className="search-place placeholder-white " type="text" placeholder="Search..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <Link to="/games">
                <box-icon class="icon" color="white" name='game'></box-icon>
                  <span className="text nav-text">Games</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/leaderboard">
                <box-icon class="icon" color="white" name='line-chart'></box-icon>
                  <span className="text nav-text">Leaderboard</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/faq">
                <box-icon class="icon" color="white" name='help-circle' ></box-icon>
                  <span className="text nav-text">FAQ section</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/pricing">
                <box-icon class="icon" color="white" name='bolt-circle'></box-icon>
                  <span className="text nav-text">Pricing</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/updateNFT">
                <box-icon class="icon" color="white" name='sort-up'></box-icon>
                  <span className="text nav-text">Update NFT</span>
                </Link>
              </li>

              <li className="nav-link">
                <Link to="/swapping">
                <box-icon class="icon" color="white" name='wallet'></box-icon>
                  <span className="text nav-text">Wallets</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="bottom-content">
            {/* <li className="">
              <a href="#">
                <i className="bx bx-log-out icon"></i>
                <span className="text nav-text">Logout</span>
              </a>
            </li> */}

            {/* <li className="mode" onClick={handleModeSwitch}>
              <div className="sun-moon">
                <i className="bx bx-moon icon moon"></i>
                <i className="bx bx-sun icon sun"></i>
              </div>
              <span className="mode-text text">
                {isDarkMode ? "Light mode" : "Dark mode"}
              </span>

              <div className="toggle-switch">
                <span
                  className="switch"
                ></span>
              </div>
            </li> */}
          </div>
        </div>
      </nav>

      <section class="home">
        <div class="textt">
          <Navbar />
        </div>
        <Hero />
        <Slider />
    <Collections/>
   

      
<Banner/>
<Collections/>
<Stats/>
<Testimonials/>
{/* <Pricing/> */}
      <Footer/>
      {/* <Techs/> */}
        {/* <Games /> */}
        {/* <Leaderboard /> */}
        {/* <Chatbot/> */}
      </section>
    </>
  );
}

export default Sidebar;
