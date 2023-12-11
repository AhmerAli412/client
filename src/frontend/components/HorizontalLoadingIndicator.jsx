import React, { useState } from 'react';

const HorizontalLoadingIndicator = ({ loading, txHash }) => {
  const [progress, setProgress] = useState(0);

  // Function to simulate progress
  const simulateProgress = () => {
    const interval = setInterval(() => {
      // Fetch transaction progress using txHash
      // Update the progress state accordingly
      // For example, you can use ethers.js to get the transaction receipt and check the confirmation status
      // Here, we are simulating the progress by increasing it until it reaches 100
      if (progress < 100) {
        setProgress((prevProgress) => prevProgress + 1);
      } else {
        clearInterval(interval);
      }
    }, 100);
  };

  // Start simulating progress when loading is true
  if (loading) {
    simulateProgress();
  }

  return (
    <div style={{ width: '100%', height: '20px', backgroundColor: '#f0f0f0' }}>
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: '#4caf50',
        }}
      ></div>
    </div>
  );
};

export default HorizontalLoadingIndicator;
