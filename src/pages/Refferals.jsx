import React, { useEffect, useState } from 'react';
import XPicon from '../img/XP.png';
import GEMicon from '../img/DIAMOND.png';
import COPYicon from '../img/COPY.png';
import './refferals.css';
import { useSelector } from 'react-redux';
import { selectReffCode } from '../redux/user/userSelectors.js';
import axios from 'axios';


const Refferals = () => {
  const [refferals, setRefferals] = useState([]);
  const [active, setActive] = useState(1);

  const reffCode = useSelector(selectReffCode);

  useEffect(()=> {
    const getRefferals = async (code) => {
      const userRefferals = await axios.get(`${process.env.REACT_APP_API_URL}api/users/user/refferals`, {params: {reffcode: code}});
      setRefferals(userRefferals.data);
    }

    getRefferals(reffCode);
  }, [reffCode])

  return (
    <div className='refferals_page'>
      <div className='reff_sistem_info'>
        <h1 className='refferal_system_info_header'>Реферальная система</h1>
        <div className='reff_sistem_info_block'>
          <ul className='points_info_block'>
            <li className='points_info'>
              <img src={XPicon} alt="XP points icon" />
              150
            </li>
            <li className='points_info'>
              <img src={XPicon} alt="XP points icon" />
              200 +
              <img src={GEMicon} alt="gem icon" />
              50

            </li>
            <li className='points_info'>
              <img src={XPicon} alt="XP points icon" />
              50
            </li>
            <li className='points_info'>
              <img src={XPicon} alt="XP points icon" />
              25
            </li>
          </ul>
          <ul className='refferal_info_block'>
            <li className='refferal_info'>
              за вашего друга
            </li>
            <li className='refferal_info'>
              за вашего друга с Telegram Premium
            </li>
            <li className='refferal_info'>
              за вашего друга 2-го уровня реф. системы
            </li>
            <li className='refferal_info'>
              за вашего друга 3-го уровня реф. системы
            </li>
          </ul>
        </div>
      </div>
      <div className="invite_block" >
        <button className='invite invite_button' >Пригласить друга</button>
        <button className='copy invite_button'><img src={COPYicon} alt='copy icon'/></button>
      </div>
      <div className='refferals_block' >
        <div className='reff_count_block'>
          <h2>Список приглашенных друзей:</h2>
          <p>приглашено рефералов</p>
          <b>5</b>
        </div>
        <div className='refferals_list'>
          <div className='reff_level_switcher'>
            <button className={`refferal_level ${active === 1 ? "active" : ""}`} onClick={()=> setActive(1)}>1 уровень</button>
            <button className={`refferal_level ${active === 2 ? "active" : ""}`} onClick={()=> setActive(2)}>2 уровень</button>
            <button className={`refferal_level ${active === 3 ? "active" : ""}`} onClick={()=> setActive(3)}>3 уровень</button>
          </div>
          {
            refferals.map(refferal => <div className='refferal'>{refferal.refferalUsername}</div> )
          }
        </div>
      </div>
    </div>
  )
}

export default Refferals