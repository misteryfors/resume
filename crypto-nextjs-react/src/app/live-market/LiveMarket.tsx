import './live-market.css';
import React from 'react';

export const LiveMarket:React.FC=()=>{
  return (
    <div className="main__live-market live-market">
      <p className="main__name">Live Market</p>
      <div className="live-market__grid">
        <p className="live-market__grid-item--atribute-name">Coin</p>
        <p className="live-market__grid-item--atribute-name">Change</p>
        <p className="live-market__grid-item--atribute-name">Martket Cap</p>
        <p className="live-market__grid-item--atribute-name">24h Volume</p>
        <p className="live-market__grid-item--atribute-name">Price</p>

        <p className="live-market__grid-item--coin-value">
          <img className="live-market__grid-item--coin-icon" src="./bitcoin-(btc).svg"/>
          <span className="live-market__grid-item--coin-name">Bitcoin</span>
        </p>
        <p className="live-market__grid-item--change-value">+12.00%</p>
        <p className="live-market__grid-item--standard-value">$3.560M</p>
        <p className="live-market__grid-item--standard-value">$65.20M</p>
        <p className="live-market__grid-item--standard-value">$48.032,32</p>
      </div>
    </div>
  )
}