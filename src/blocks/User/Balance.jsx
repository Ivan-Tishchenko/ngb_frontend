import React from 'react';
import icon from '../../img/icon.png';
import './balance.css';

const Balance = () => {
  return (
    <div className='balances'>
      <div className='xp balance'>
        <img src={icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>1234</p>
      </div>

      <div className='dividing-line'></div>
      
      <div className='ton balance'>
        <img src={icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>1234</p>
      </div>
      
      <div className='dividing-line'></div>
      
      <div className='tickets balance'>
        <img src={icon} alt="icon of this type balance" className='icon balance_icon' />
        <p className='balance_value'>1234</p>
      </div>
    </div>
  )
}

export default Balance