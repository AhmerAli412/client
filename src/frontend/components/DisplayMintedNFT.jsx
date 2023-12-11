import React from 'react';

const DisplayMintedNFT = ({ mintedTokenURI }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold text-white">Minted and Claimed NFT:</h3>
      <div className="p-4 rounded-lg shadow-lg">
        <img src={mintedTokenURI} alt="Minted NFT" className="mx-auto mt-4 rounded-lg" style={{ maxWidth: '50%', width: '50%' }} />
      </div>
    </div>
  );
};

export default DisplayMintedNFT;
