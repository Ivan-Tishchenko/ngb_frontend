import React, {useEffect, useRef, useState} from 'react';
import GEMicon from "../img/DIAMOND.png";
import "./bids.css";

const Bids = () => {
  const socketRef = useRef(null);
  const [price, setPrice] = useState(null);

  const [info, setInfo] = useState(false);

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
  
  return (
    <section className='section bids_section'>

      {info &&
        <div className='info_modal_background' onClick={(event)=>{
          if(event.target === event.currentTarget) {
            setInfo(false)
          }
          }}>
          <div className='info_modal'>
            <h2>how its work?</h2>
            <p>text ...</p>
            <button onClick={()=> setInfo(false)}>OK</button> 
          </div>
        </div>}

      <div className='price_block'>
        <button className='info' onClick={()=>setInfo(true)}>?</button>
        <p className='text price_text'>toncoin price</p>
        <h1 className='price_text text price'>{price ? Number(price).toFixed(4) : "Loading..."}$</h1>
      </div>

      <div className='bids_block'>

        <div className='bids_open'>
          <button className='bid bid_up' ><span className='bid_symbol'>{"<"}</span>  up</button>
          <button className='bid bid_down'><span className='bid_symbol'>{">"}</span>  down</button>
        </div>

        <div className='bids_value'>

          <div className='bids_percent_buttons' >
            <button className='bid_count 25%'>25%</button>
            <button className='bid_count 50%'>50%</button>
            <button className='bid_count 100%'>100%</button>
          </div>

          <div className='bid_value_input'>
            <input type='number' className='bid_value input_value' name='bid_value' id='bid_value' />
            <img src={GEMicon} alt="ton icon" />
          </div>

        </div>

      </div>
    </section>
  )
}

export default Bids