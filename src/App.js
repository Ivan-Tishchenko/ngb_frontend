import React, {useEffect} from 'react';
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
import setUser from './redux/user/actions/setUser.js';

const APP = "https://ngbfrontendtest.netlify.app/";



function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const webApp = window.Telegram.WebApp;
      webApp.ready(); // Уведомляем Telegram, что WebApp готов
    }

    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setAppHeight();

    dispatch(setUser({"id":6687958843,"first_name":"vati","last_name":"","username":"vati5","language_code":"ru","allows_write_to_pm":true,"photo_url":"https://t.me/i/userpic/320/Qjm5iRJL7965IDnGjczocZRtTiIi5Y7BoCaUdA0li1w.svg"}));

    return 
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <button onClick={()=>{
            dispatch(setUser({id: 6687958843}))
          }} >setuser</button>
          </>} />
        </Routes>
      
        <Nav />
      </TonConnectUIProvider>
    </>
  );
}

export default App;
