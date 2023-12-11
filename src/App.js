import React, { useState } from 'react';
import Sidebar from "./components/Sidebar";
import MemoryGame from "./Games/MemoryGame";
import Marketplace1 from "./frontend/components/Marketplace1";
import MainBoard from "./Games/Game2/MainBoard";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Profile from "./components/Profile";
import ClaimNFT from "./frontend/components/ClaimNFT";
import UpdateNFT from "./frontend/components/UpdateNFT";
import Leaderboard from "./components/Leaderboard";
import Games from "./components/Games";
import Faq from "./components/Faq";
import Pricing from "./components/Pricing";
import MyPurchases from "./frontend/components/MyPurchases";
import Swapping from "./frontend/components/Swapping";
import Game2048 from "./Games/Game2048";
import Page404 from "./components/Page404";
import DisplayMintedNFT from "./frontend/components/DisplayMintedNFT";

const App = () => {
  const [mintedTokenURI, setMintedTokenURI] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />} />
        <Route path="/memorygame" element={<MemoryGame />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/marketplace" element={<Marketplace1 />} />
        <Route path="/claimNFT" element={<ClaimNFT/>} />
        <Route path="/updateNFT" element={<UpdateNFT />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/games" element={<Games />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/swapping" element={<Swapping />} />
        <Route path="/board" element={<MainBoard />} />
        <Route path="/game2048" element={<Game2048/>} />
        <Route path="*" element={<Page404 />} />
        {/* <Route path="/display" element={<DisplayMintedNFT mintedTokenURI={mintedTokenURI}/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
