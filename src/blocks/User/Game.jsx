import React from 'react';
import game from '../../img/game_icon.png';
import './game.css';

const Game = () => {
  return (
    <button className='game_button' onClick={()=>{}}>
      <img src={game} alt='game icon' className='game_icon' />
    </button>
  )
}

export default Game