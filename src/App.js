import React, {useEffect, useState} from 'react';
import User from 'blocks/User';
import './App.css';
import Nav from 'blocks/Nav';
import Bids from './pages/Bids'
import { Route, Routes } from 'react-router-dom';
import Mine from 'pages/Mine';
import Quests from 'pages/Quests';
import Refferals from 'pages/Refferals';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useDispatch } from 'react-redux';
import setUser from './redux/userActionsThunks.js';

const APP = "https://ngbfrontendtest.netlify.app/";



function App() {
  const [tg, setTg] = useState(null);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();


  let telegram = window.Telegram?.WebApp || { tg: {initDataUnsafe: {user: {
      id: 123,
      first_name: "va",
      last_name: "ti",
      username: "@vati5",
      is_premiun: false,
    },},},};
    

  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setAppHeight();

    dispatch(setUser(telegram.tg.initDataUnsafe.user));

    return 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready(); // Уведомляем Telegram, что WebApp готов
      setTg(webApp);
    }
  }, []);

  return (
    <>
      <TonConnectUIProvider manifestUrl={`https://${APP}/tonconnect-manifest.json`}>
        <User />

        <Routes>
          <Route path="/bids" element={<Bids /> }/>
          <Route path="/mine" element={<Mine /> }/>
          <Route path="/quests" element={<Quests /> }/>
          <Route path="/reff" element={<Refferals /> }/>
          <Route path="/" element={<>
          <div>test text </div>
          <div>{JSON.stringify(tg)}</div>
          <div>test text 2</div>
          {errors.map(err => <div key={err.key}>--{err.text}</div>)}
          <button onClick={()=>{setErrors([...errors, {text: JSON.stringify(window.Telegram), key: Math.random()}])}}>try</button>
          </>} />
        </Routes>
      
        <Nav />
      </TonConnectUIProvider>
    </>
  );
}

export default App;
