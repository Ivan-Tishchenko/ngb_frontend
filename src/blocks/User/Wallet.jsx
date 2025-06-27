import { useTonConnectUI } from '@tonconnect/ui-react';
import React from 'react';
import wallet_icon from '../../img/wallet.png';
import './wallet.css';

const Wallet = () => {
   const [tonConnectUI] = useTonConnectUI();

  const handleClick = () => {
    tonConnectUI.openModal(); // Открывает модальное окно подключения
  };

  return (
    <button onClick={handleClick} className='ton_connect'>
      <img src={wallet_icon} alt='wallet icon'/>
      Подключить кошелёк {">"}
    </button>
  )
}

export default Wallet