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

const APP = "https://ngbfrontendtest.netlify.app/";

function App() {

  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setAppHeight();
    

    return 
  }, []);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.expand();
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
        </Routes>
      
        <Nav />
      </TonConnectUIProvider>
    </>
  );
}

export default App;
