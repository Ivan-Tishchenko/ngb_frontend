import { useTonConnectUI, useTonAddress } from '@tonconnect/ui-react';
import React, {useEffect, useState} from 'react';
import wallet_icon from '../../img/wallet.png';
import './wallet.css';
import connectWallet from '../../redux/user/actions/connectWallet.js';
import { useDispatch } from 'react-redux';

const Wallet = () => {
  const dispatch = useDispatch();
  const [tonConnectUI] = useTonConnectUI();
  const userFriendlyAddress = useTonAddress(true);

  const [disconnect_modal, setModal] = useState(null);

  useEffect(() => {
    if (userFriendlyAddress) {
      dispatch(connectWallet(userFriendlyAddress));
    }
  }, [userFriendlyAddress, dispatch]);

  const copyAddress = () => {
    if (userFriendlyAddress) {
      navigator.clipboard.writeText(userFriendlyAddress);
      alert('Адрес скопирован!');
    }
  };

  const disconnect = () => {
    tonConnectUI.disconnect();
  };

  const handleClickOutside = (e) => {
    const modalElement = document.querySelector(".wallet_modal");
    if(modalElement && !modalElement.contains(e.target))  {
      setModal(false);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    }
  }

  const handleEscape = () => {
    setModal(false);
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEscape);
  }

  const handleClick = () => {
    console.log(disconnect_modal);
    if(!userFriendlyAddress) {
      tonConnectUI.openModal(); // Открывает модальное окно подключения
    } else if(!disconnect_modal) {
      setModal(true);
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
      }, 0);
    }
  };

  return (
    <div className='ton_connect_block'>
    <button onClick={handleClick} className='ton_connect'>
      {userFriendlyAddress ? <>{`${userFriendlyAddress.slice(0, 2)}...${userFriendlyAddress.slice(-5)}`}</> :
        <><img src={wallet_icon} alt='wallet icon'/>
      Подключить кошелёк {">"}</>
      }</button>
      { disconnect_modal && <div className='wallet_modal'>
          <button onClick={copyAddress} className='wallet_modal_button'>Скопировать адрес</button>
          <button onClick={disconnect} className='wallet_modal_button'>Отключить</button>
        </div> }
    </div>
  )
}

export default Wallet