import React, { useEffect, useState } from "react";
import "../components/Slider.css";

const Slider = () => {
  const images = [
    "https://bc.imgix.net/banner/a6/68/e9/167929759359439.png?auto=format&q=80&dpr=1&w=320",
    "https://bc.imgix.net/banner/b7/43/52/167903007661032.png?auto=format&q=80&dpr=1&w=320",
    "https://bc.imgix.net/banner/b9/20/bd/167903216435116.png?auto=format&q=80&dpr=1&w=320",
    "https://bc.imgix.net/banner/83/c5/44/166936355032979.png?auto=format&q=80&dpr=1&w=320"
  ];

  const [shuffledImages, setShuffledImages] = useState(images);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledImages((prevImages) => {
        const shuffled = [...prevImages];
        let currentIndex = shuffled.length;
        let randomIndex;

        while (currentIndex !== 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          [shuffled[currentIndex], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[currentIndex],
          ];
        }

        return shuffled;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="parent">
      <div className="images-row">
        {shuffledImages.map((src, index) => (
          <div className="image11" key={index}>
            <img src={src} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
