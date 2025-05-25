import React from 'react';
import { NavLink } from 'react-router-dom';
import icon from '../img/TICKET.png';
import './navigation.css';

const Nav = () => {
  return (
    <nav className='nav_bar'>
        <NavLink to="/bids" className='navigate ' >
            <img src={icon} alt='icon' className='icon navigate_icon' />
        </NavLink>
        
        <NavLink to="/mine" className='navigate ' >
            <img src={icon} alt='icon' className='icon navigate_icon' />
        </NavLink>
        
        <NavLink to="/quests" className='navigate ' >
            <img src={icon} alt='icon' className='icon navigate_icon' />
        </NavLink>
        
        <NavLink to="/reff" className='navigate ' >
            <img src={icon} alt='icon' className='icon navigate_icon' />
        </NavLink>

    </nav>
  )
}

export default Nav