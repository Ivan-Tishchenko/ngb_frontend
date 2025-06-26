import React from 'react';
import TICKET_icon from '../../img/TICKET.png';
import XP_icon from '../../img/XP.png';
import TON_icon from '../../img/TON.png';
import './balance.css';
import { useSelector } from 'react-redux';
import { selectBallance, selectTickets, selectXpPoints } from '../../redux/userSelectors';

const Balance = () => {
  const xpPoints = useSelector(selectXpPoints);
  const balance = useSelector(selectBallance);
  const tickets = useSelector(selectTickets);

  return (
    <div className='balances'>
      <div className='xp balance'>
        <img src={XP_icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>{xpPoints}</p>
      </div>

      <div className='dividing-line'></div>
      
      <div className='ton balance'>
        <img src={TON_icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>{balance}</p>
      </div>
      
      <div className='dividing-line'></div>
      
      <div className='tickets balance'>
        <img src={TICKET_icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>{tickets}</p>
      </div>
    </div>
  )
}

export default Balance