import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { selectLoading, selectLoadingBid } from '../../redux/user/userSelectors.js';
import {ReactComponent as Gamepade} from '../../img/gamepad.svg';

import './loader.css';

const Lodaer = () => {
  const loading = useSelector(selectLoading);
  const loadingBid = useSelector(selectLoadingBid);

  const [phase, setPhase] = useState('hidden'); // 'entering', 'spinning', 'exiting'

  useEffect(() => {
    if (loading && phase === 'hidden') {
      setPhase('entering');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleEnterEnd = () => {
    if (loading) {
      setPhase('spinning');
    } else {
      setPhase('exiting');
    }
  };

  const handleExitEnd = () => {
    setPhase('hidden');
  };
    
  return (
    <>
    {phase !== 'hidden' && 
        <div className='loader_backdrop'>
          <div className={`loader ${phase}`} onAnimationEnd={() => {
            if (phase === 'entering') handleEnterEnd();
            if (phase === 'exiting') handleExitEnd();
          }}>
            <div className='loader_circle' ></div>
            <Gamepade className={`${phase === 'spinning' ? 'spinner' : ''} loader_logo`} />
          </div>
        </div>
    }
    {loadingBid &&
        <div className='loading_bid'>
        </div>
    }
    </>
  )
}

export default Lodaer