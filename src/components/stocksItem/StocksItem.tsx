import React,{useEffect} from "react";
import styles from './StocksItem.module.scss';
import AOS from "aos";
import "aos/dist/aos.css";
import { NavLink } from "react-router-dom";

export const StocksItem = (props:any) => {
    useEffect(() => {
      return () => {
        AOS.init();
        AOS.refresh();
      };
    }, [])
    return (
        <div className={styles.stocksItem}>
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