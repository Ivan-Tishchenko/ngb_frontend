import React from 'react';
import TICKET_icon from '../../img/TICKET.png';
import XP_icon from '../../img/XP.png';
import TON_icon from '../../img/TON.png';
import './balance.css';

const Balance = () => {
  return (
    <div className='balances'>
      <div className='xp balance'>
        <img src={XP_icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>1234</p>
      </div>

      <div className='dividing-line'></div>
      
      <div className='ton balance'>
        <img src={TON_icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>1234</p>
      </div>
      
      <div className='dividing-line'></div>
      
      <div className='tickets balance'>
        <img src={TICKET_icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>1234</p>
      </div>
    </div>
  )
}

export default Balance