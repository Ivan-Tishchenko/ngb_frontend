import React from 'react';
import './bidResult.css';

const BidResult = ({result, profit}) => {

  return (<>
    <div className={`bid_result_background ${result}`}></div>
    <div className='result_block'>
        <div className='bid_result'>{result}</div>
        <div className='bid_profit'>{profit}</div>
    </div>
  </>
  )
}

export default BidResult