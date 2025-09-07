import React, {useEffect, useState} from 'react';
import GEMicon from "../img/DIAMOND.png";
import "./bids.css";
import { useDispatch, useSelector } from 'react-redux';
import { selectBallance, selectCurrentBid, selectUserId } from '../redux/user/userSelectors.js';
import openBid from '../redux/bid/actions/openBid.js';
import closeBid from '../redux/bid/actions/closeBid.js';
import { selectBidEndTime, selectBidStartPrice, selectBidType, selectBidValue } from '../redux/bid/bidSelectors.js';
import BidResult from './animations/BidResult';

const Bids = ({price}) => {
  const dispatch = useDispatch();

  const [info, setInfo] = useState(false);
  const [count, setCount] = useState(0)

  const currentBid = useSelector(selectCurrentBid);
  const endTime = useSelector(selectBidEndTime);
  const bidValue = useSelector(selectBidValue);
  const bidType = useSelector(selectBidType);
  const bidStartPrice = useSelector(selectBidStartPrice);
  
  const userId = useSelector(selectUserId);
  const ballance = useSelector(selectBallance);

  const total = 60; // секунд
  const [percent, setPercent] = useState(0);

  const [result, setResult] = useState(null);
  const [profit, setProfit] = useState(null);
  
  useEffect(() => {
    if(!currentBid){
      return;
    } else if(endTime - Date.now() <= 0) {
      setResult(((bidType === "+") && (bidStartPrice > price)) || ((bidType === "-") && (bidStartPrice < price)) ? "win" : "lose");
      setProfit(result === "win" ? `+${bidValue * 2}` : `-${bidValue}`);
      dispatch(closeBid(currentBid));
      setTimeout(() => {
        setResult(null);
        setProfit(null);
      }, 3000)
    } else {
      setTimeout(()=> {
        setResult(((bidType === "+") && (bidStartPrice > price)) || ((bidType === "-") && (bidStartPrice < price)) ? "win" : "lose");
        setProfit(result === "win" ? `+${bidValue * 2}` : `-${bidValue}`);
        dispatch(closeBid(currentBid));
        setTimeout(() => {
          setResult(null);
          setProfit(null);
        }, 3000)
      }, endTime - Date.now() + 5);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBid])

  useEffect(() => {
    if(!currentBid) {
      return;
    }
    const timer = setInterval(() => {
      const remainingSec = (endTime - Date.now()) / 1000;
      const p = (remainingSec / total) * 100;
      setPercent(Math.min(100, Math.max(0, p)));
    }, 100);

    return () => clearInterval(timer);
  }, [endTime, currentBid]);

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Текст скопирован!");
    } catch (err) {
      console.error("Ошибка копирования:", err);
    }
  };

  return (<>
    {result && <BidResult result={result} profit={profit} />}
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
      { !currentBid ? 
        <>
          <div className='bids_open'>
            <button className='bid bid_up' onClick={()=> {
              if(count < 0.5) {
                return;
              }
              dispatch(openBid({value: count, type: "+", userId}));
              setCount(0);
            }}><span className='bid_symbol'>{"<"}</span>  up</button>
            <button className='bid bid_down' onClick={()=> {
              if(count < 0.5) {
                return;
              }
              dispatch(openBid({value: count, type: "-", userId}));
              setCount(0);
            }}><span className='bid_symbol'>{">"}</span>  down</button>
          </div>

          <div className='bids_value'>

            <div className='bids_percent_buttons' >
              <button className='bid_count 25' onClick={()=>setCount(parseInt(ballance * 0.25))}>25%</button>
              <button className='bid_count 50' onClick={()=>setCount(parseInt(ballance * 0.5))}>50%</button>
              <button className='bid_count 100' onClick={()=>setCount(parseInt(ballance))}>100%</button>
            </div>

            <div className='bid_value_input'>
              <input
                type="number"
                className="bid_value input_value"
                name="bid_value"
                id="bid_value"
                value={count}
                onChange={(event) =>{
                  if(Number(event.target.value <= ballance)) {
                    setCount(Number(event.target.value))}
                  }
                } 
              />
              <img src={GEMicon} alt="ton icon" />
            </div>

          </div>
        </> 
      : 
        <div className={`current_bid_block ${(price > bidStartPrice && bidType === "+") || (price < bidStartPrice && bidType === "-") ? "win" : "lose"}`}>
          <div className='current_bid_procces_beckground' style={{ width: `${percent}%`, transition: "width 0.1s linear" }}></div>
          <div onClick={()=>handleCopy(currentBid)} className='bid_id' style={{ cursor: 'pointer', color: 'blue' }}>
      🔗 {currentBid}
          </div>
          <span className='bid_type'>{bidType === "+" ? "long" : "short"}</span>
          <span className='current_bid_value'>value: {bidValue}</span>
          <span className='bid_start_price'>{bidStartPrice}$</span>
        </div>
      }
      </div>
    </section>
    </>
  )
}

export default Bids