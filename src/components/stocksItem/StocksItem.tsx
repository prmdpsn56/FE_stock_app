import React,{useEffect} from "react";
import styles from './StocksItem.module.scss';
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";


interface StocksItems {
    code:string
    name:string
    ceo:string
    exchange:string
    turnover:string 
    website:string
    key:string
}

export const StocksItem:React.FC<StocksItems> = (props:StocksItems) => {
    const history = useHistory();
    useEffect(() => {
      return () => {
        AOS.init();
        AOS.refresh();
      };
    }, [])

    const redirect = () => {
        history.push("/info/"+props.code);
    }
    return (
        <div className={styles.stocksItem} onClick={redirect}>
            <div>
                <h1>{props.code.toUpperCase()}</h1>
                <NavLink to="www.microsoft.com" target="_blank">{props.website}</NavLink>
            </div>
            <div className={styles.info}> 
                <div className={styles.infoleft}>
                    <p>{props.name}</p>
                    <span>{props.exchange}</span>
                </div>
                <div className={styles.inforight}>
                    <span>{props.turnover}</span>
                    <p>CEO: {props.ceo}</p>
                </div>
            </div>
        </div>
)}