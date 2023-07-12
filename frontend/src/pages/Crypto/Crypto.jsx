import {useState,useEffect} from 'react'
import { getCrypto } from '../../api/external';
import Loader from '../../components/Loader/Loader';
import styles from './Crypto.module.css';
import Error from '../Error/Error';

function Crypto() {
    const [data,setData]=useState([]);

    useEffect(() => {
      // IIFE: immediately invoked function expression
      (async function cryptoApiCall(){
        const response = await getCrypto();
        setData(response)
      })()

      setData([]);
    },[])

    if(data.length === 0){
      return <Loader text="cryptocurrencies"/>
    }
    else if(data.code){
      return <Error errmessage={data.message}/>
    }

    const negativeStyle = {
      color: "#ea3943",
    };
    
    const positiveStyle = {
      color: "#16c784",
    };
  return (
    <table className={styles.table}>
      <tr>
        <th>#</th>
        <th>Coin</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>24h</th>
      </tr>
      {data.map((coin) => (
        <tr key={coin.id}>
          <td>{coin.market_cap_rank}</td>
          <td>
            <div className={styles.logo}>
              <img src={coin.image} alt={coin.symbol} width={40} height={40} /> {coin.name}
            </div>
          </td>
          <td>
            <div>{coin.symbol}</div>
          </td>
          <td>{coin.current_price}</td>
          <td
            style={
              coin.price_change_percentage_24h < 0
                ? negativeStyle
                : positiveStyle
            }
          >
            {coin.price_change_percentage_24h}
          </td>
        </tr>
      ))}
    </table>
  )
}

export default Crypto