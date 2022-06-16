import React, {useEffect,useState} from "react";
import { useParams }  from "react-router-dom";
import styles from './Details.module.scss';
import {CompanyDetail} from '../../models/detail';
import {Stock} from '../../models/detail';
import { Modal } from '../modal/Modal';
// import  { DatesRangeInput} from 'semantic-ui-calendar-react';


export const Details = () => {
    const [modalState, setModalState] = useState(false);
    const [averagePrice, setAveragePrice] = useState(0);
    const [highestPrice, setHighestPrice] = useState(0);
    const [lowestPrice, setLowestPrice] = useState(0);
    let stockValues:number [] = [];
    let companyInfo: CompanyDetail = {
        _id: "62a6c35051b9dbc2cc2162d7",
        code: "msft11",
        name: "microsoft",
        ceo: "nadella",
        turnover: "220cs",
        website: "microsoft.com",
        exchange: "NASDAQ",
        createdAt: "2022-06-13T04:55:44.959Z",
        updatedAt: "2022-06-13T04:55:44.959Z",
        __v: 0,
        stocksValue: [
            {
                id: 3,
                code: "msft11",
                time: "2022-06-13T04:55:45.000Z",
                price: "2"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-06-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-06-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-07-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-01-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-07-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-10-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-06-13T04:55:45.000Z",
                price: "2"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-06-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-06-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-07-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-01-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-07-13T04:55:45.000Z",
                price: "24"
            },
            {
                id: 3,
                code: "msft11",
                time: "2022-10-13T04:55:45.000Z",
                price: "24"
            }
        ]
        }
    
    
    const stockPrices = () => {
        companyInfo.stocksValue.map((stock:Stock)=>{
            stockValues.push(+stock.price);
        })
    };

    const averagePriceFinder = () => {
        const sum = stockValues.reduce((partialSum, a) => partialSum + a, 0);
        setAveragePrice(sum/stockValues.length);
    }
    const highestPriceFinder = () => {
        setHighestPrice(Math.max(...stockValues));
    }
    const lowestPriceFinder = () => {
        setLowestPrice(Math.min(...stockValues));
    }

    useEffect(() => {
        stockPrices();
        averagePriceFinder();
        highestPriceFinder();
        lowestPriceFinder();
    }, []);

    const hideModal = () => {
        setModalState(false);
    }

    const showModal = () => {
        setModalState(true);
    }
    const params = useParams<{ code: string }>();
    let date = new Date(companyInfo.createdAt).toLocaleString();
    let stocks_List = companyInfo.stocksValue.map((stock:Stock)=> {
        let entryDate = new Date(stock.time).toLocaleString();
        return (<div className={styles.priceDetail}>
                <h3 className={styles.price}><span>Price  : </span>{stock.price}</h3>
                <h3 className={styles.date}><span>on</span> : {entryDate}</h3>
            </div>)
    })

    return (<div className='container'>
    <div className={styles.flex}>
        <div className={styles.details}> 
            <span className={styles.title}>{companyInfo.code.toUpperCase()}</span>
            <div className={styles.info}>    
                <h3><span>Company name</span> : {companyInfo.name.toUpperCase()}</h3>
                <h3><span>CEO</span> : {companyInfo.ceo}</h3>
                <h3><span>Turnover</span> : {companyInfo.turnover}</h3>
                <h3><span>Exchange</span> : {companyInfo.exchange}</h3>
                <h3><span>Registered on</span> : {date}</h3>
                <h3><span>Highest Value</span> : {highestPrice}$</h3>
                <h3><span>Lowest Value</span> : {lowestPrice}$</h3>
                <h3><span>Average Value</span> : {averagePrice.toFixed(2)}$</h3>            
            </div>
        </div>
        <div className={styles.stocks}>
                {stocks_List}
        </div>    
    </div>
    <div>
        <button className={styles.deleteButton}>Delete Stock</button>
        <button className={styles.stockButton} onClick={showModal}>Add Stock Value</button>
        <Modal show={modalState} handleClose={hideModal} >
        <div>
            <p>{params.code.toUpperCase()}</p>
            <label>Stock Price</label>
            <input type='number' min="0"/>
        </div>
        </Modal>
    </div>
    <div>
    </div>
    </div>);
}