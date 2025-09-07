import React, {useEffect, useState, useRef} from 'react';
import User from 'blocks/User';
import './App.css';
import Nav from 'blocks/Nav';
import Bids from './pages/Bids'
import { Route, Routes } from 'react-router-dom';
import Mine from 'pages/Mine';
import Quests from 'pages/Quests';
import Refferals from 'pages/Refferals';
import Lodaer from 'pages/animations/Lodaer';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { useDispatch } from 'react-redux';
import setUser from './redux/user/actions/setUser.js';

import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const APP_URL = "https://dufenshmirts.info/";



function App() {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    // WebSocket (Binance)
    socketRef.current = new WebSocket('wss://stream.binance.com:9443/ws/tonusdt@trade');

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrice(data.p); 
    };

    socketRef.current.onerror = (error) => {
      console.error('error WebSocket:', error);
    };

    socketRef.current.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      socketRef.current.close();
    };
  }, []);

  const [ init, setInit ] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        //await loadAll(engine);
        //await loadFull(engine);
        await loadSlim(engine);
        //await loadBasic(engine);
    }).then(() => {
        setInit(true);
    });
  }, []);

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

    dispatch(setUser(window.Telegram?.WebApp?.initDataUnsafe?.user));

    return 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const particlesLoaded = (container) => {
        console.log(container);
    };

  return (
    <>
    { init && <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={{
                background: {
                    color: {
                        value: "#00000000",
                    },
                },
                fpsLimit: 120,
                interactivity: {
                    events: {
                        onClick: {
                            enable: true,
                            mode: "push",
                        },
                        onHover: {
                            enable: true,
                            mode: "repulse",
                        },
                        resize: true,
                    },
                    modes: {
                        push: {
                            quantity: 2,
                        },
                        repulse: {
                            distance: 80,
                            duration: 1,
                        },
                    },
                },
                particles: {
                    color: {
                        value: "#fdf170a7",
                    },
                    move: {
                        direction: "top",
                        enable: true,
                        outModes: {
                            default: "out",
                        },
                        random: false,
                        speed: 1,
                        straight: false,
                    },
                    number: {
                        density: {
                            enable: true,
                            area: 800,
                        },
                        value: 700,
                    },
                    opacity: {
                        value: 0.5,
                    },
                    shape: {
                        type: "circle",
                    },
                    size: {
                        value: { min: 1, max: 4 },
                    },
                },
                detectRetina: true,
            }}
        />
    }
      <TonConnectUIProvider manifestUrl={`${APP_URL}/tonconnect-manifest.json`}>
        <User />

        <Lodaer />

        <Routes>
          <Route path="/bids" element={<Bids price={price} /> }/>
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
