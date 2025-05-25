import Balance from './User/Balance';
import Wallet from './User/Wallet';
import Game from './User/Game';

import React from 'react'

const User = () => {
  return (
   <>
    <header>
      <Balance />
    </header>
      <Wallet />
      <Game />
   </>
  )
}

export default User