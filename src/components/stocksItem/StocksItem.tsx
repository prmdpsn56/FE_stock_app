import React,{useEffect} from "react";
import styles from './StocksItem.module.scss';
import AOS from "aos";
import "aos/dist/aos.css";

export const StocksItem = (props:any) => {
    useEffect(() => {
      return () => {
        AOS.init();
        AOS.refresh();
      };
    }, [])
    return (
        <div className={styles.stocksItem} data-aos="fade-up">
            <div>
                <h1>{props.code.toUpperCase()}</h1>
                <a href="www.microsoft.com" target="_blank">{props.website}</a>
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