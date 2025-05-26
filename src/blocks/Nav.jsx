import React from 'react';
import { NavLink } from 'react-router-dom';
import home_icon from '../img/home.png';
import comunity_icon from '../img/comunity.png';
import mining_icon from '../img/mining.png';
import task_icon from '../img/task.png';
import './navigation.css';

const Nav = () => {
  return (
    <nav className='nav_bar'>
        <NavLink to="/bids" className='navigate ' >
            <img src={home_icon} alt='icon' className='icon navigate_icon' />
        </NavLink>
        
        <NavLink to="/mine" className='navigate ' >
            <img src={comunity_icon} alt='icon' className='icon navigate_icon' />
        </NavLink>
        
        <NavLink to="/quests" className='navigate ' >
            <img src={mining_icon} alt='icon' className='icon navigate_icon' />
        </NavLink>
        
        <NavLink to="/reff" className='navigate ' >
            <img src={task_icon} alt='icon' className='icon navigate_icon' />
        </NavLink>

    </nav>
  )
}

export default Nav