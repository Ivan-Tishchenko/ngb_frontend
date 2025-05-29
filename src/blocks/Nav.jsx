import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import home_icon from '../img/home.png';
import comunity_icon from '../img/comunity.png';
import mining_icon from '../img/mining.png';
import task_icon from '../img/task.png';
import './navigation.css';

const Nav = () => {
    const navRef = useRef(null);
    const location = useLocation();

    useEffect(() => {
    const nav = navRef.current;
    const active = nav.querySelector('.navigate.active');
    if (nav && active) {
        const navRect = nav.getBoundingClientRect();
        const activeRect = active.getBoundingClientRect();

        const cX = activeRect.left + activeRect.width / 2 - navRect.left - 2370;
    
       nav.style.setProperty('--hole-x', `${cX}px`);
    }
}, [location]);


  return (
    <>
        
        <nav className='nav_bar' ref={navRef}>
            <div className='mask_nav_background'>
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
            </div>
        </nav>
    </>
  )
}

export default Nav