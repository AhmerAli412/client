import React from 'react'
import Board from './Board'
import './Game2.css'
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton, useUser } from '@clerk/clerk-react';


const MainBoard = () => {

  const { user } = useUser();

  return (
    <div className='App'>
    <header className="App-header1">
   
    <Board userId={user.id} gameNumber={2} />

        </header>
    </div>
  )
}

export default MainBoard