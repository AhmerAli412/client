import React from 'react'
import '../components/Hero.css'
import bg from '../bg.png'
import {Link} from 'react-router-dom'

const Hero = () => {
  return (
    <div>
        <div class="wrapper">

<div class="background-container">
    <div class="bg-1"></div>
    <div class="bg-2"></div>

</div>
<div class="about-container">
    


<div class="text-container">
        <h1 class="animate-bounce duration-1s delay-0s">Inceptia</h1>
        <p>Unlock a world of play-to-earn. Welcome to Inceptia, where gaming meets blockchain. Level up your NFTs, boost your rewards, and convert Inceptia Coins to ETH. Start gaming, start earning, start now.</p>
        <Link to="/games">Play Games</Link>
    </div>



    <div class="image-container">
        <img src={bg} alt=""/>
        
    </div>

   
    
</div>
</div>

    </div>
  )
}

export default Hero