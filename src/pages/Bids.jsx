import React from 'react';
import TON from "../img/TON.png";
import "./bids.css";

const Bids = () => {
  return (
    <section className='section bids_section'>
      <div className='price_block'>
        <button className='info' >?</button>
        <p className='text price_text'>toncoin price</p>
        <h1 className='price_text text price'>20,69$</h1>
      </div>

      <div className='bids_block'>

        <div className='bids_open'>
          <button className='bid bid_up' ><span className='bid_symbol'>{"<"}</span>  up</button>
          <button className='bid bid_down'><span className='bid_symbol'>{">"}</span>  down</button>
        </div>

        <div className='bids_value'>

          <button className='bid_count 25%'>25%</button>
          <button className='bid_count 50%'>50%</button>
          <button className='bid_count 100%'>100%</button>

          <div className='bid_value_input'>
            <input type='number' className='bid_value input_value'/>
            <img src={TON} alt="ton icon" />
          </div>

        </div>

      </div>
    </section>
  )
}

export default Bids