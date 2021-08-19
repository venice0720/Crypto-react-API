import './Main.css';
import Coin from './Coin'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Main = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState('');
   
    useEffect(() => {
        const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=near%2Cdecentraland%2Czcash%2Cblockstack%2Ctelcoin%2Cyearn-finance%2Chelium%2Cenjincoin%2Cholotoken%2Chavven%2Cflow%2Csmooth-love-potion%2Cankr%2Cnano%2Cicon%2C0x%2Cbitcoin-gold%2Cbasic-attention-token%2Csiacoin%2Cdigibyte%2Cfantom%2Ctron%2Chedera-hashgraph%2Cmonero%2Cbittorrent-2%2Cpancakeswap-token%2Cshiba-inu%2Cethlend%2Ccompound-ether%2Cftx-token%2Cvechain%2Cterra-luna%2Cstellar%2Ctheta-token%2Ccryptoblades%2Cmatic-network%2Cethereum-classic%2Csolana%2Cchainlink%2Cwrapped-bitcoin%2Caxie-infinity%2Cuniswap%2Clitecoin%2Cpolkadot%2Cbitcoin-cash%2Cbitcoin%2Cetherium%2Cbinancecoin%2Ccardano%2Cripple%2Cdogecoin%2C&order=market_cap_desc&per_page=250&page=1&sparkline=false`
         axios
            .get(url)
            .then(res => {
              setCoins(res.data);
              console.log(res.data);
            })
            .catch(err => 
              console.log(err));
     
    });
  
   
    const handleChange = e => {
      setSearch(e.target.value);
    };
  
    const filteredCoins = coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase())||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
    return (
      <div className='coin-app'>
        <div className='coin-search'>
          <h1 className='coin-text'>Search a currency</h1>
          <form>
            <input
              className='coin-input'
              type='text'
              onChange={handleChange}
              placeholder='Search'
            />
          </form>
        </div>
        <div className="coin-main">
          {filteredCoins.map(coin => {
           return (
            <Coin
              key={coin.id}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
              image={coin.image}
              priceChange={coin.price_change_percentage_24h}
            />
          );
        })}
        </div>
      </div>
    );
  }

export default Main
