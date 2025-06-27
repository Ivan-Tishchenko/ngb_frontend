import Balance from './User/Balance';
import Wallet from './User/Wallet';
import Game from './User/Game';
import './user.css';
import React from 'react';

const User = () => {
  return (
   <>
    <header>
      <Balance />
    </header>
    <div className='user_buttons'>
      <Wallet />
      <Game />
    </div>
   </>
  )
}

export default User