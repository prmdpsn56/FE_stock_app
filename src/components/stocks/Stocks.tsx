import React,{useState} from "react";
import styles from './Stocks.module.scss';
import {StocksItem} from '../stocksItem/StocksItem';
import { Register } from "../register/Register";
import { Company } from '../../models/companies';
import { NavLink } from "react-router-dom";

export const Stocks = () => {
    const [registeredCompanies, setCompanies] = useState(true)
    let headLine = registeredCompanies ? 'Registered Companies' : 'No Registered Companies Found'
    let companies: Company [] = [
        {
            _id: "62a403f2f331f54566c68fc9",
            code: "msft1",
            name: "microsoft",
            ceo: "Nadella",
            turnover: "220cs",
            website: "microsoft.com",
            exchange: "NASDAQ"
        },
        {
            _id: "62a403f2f331f54566c68fc9",
            code: "msft2",
            name: "microsoft",
            ceo: "nadella",
            turnover: "220cs",
            website: "microsoft.com",
            exchange: "NASDAQ"
        },{
            _id: "62a403f2f331f54566c68fc9",
            code: "msft1",
            name: "microsoft",
            ceo: "Nadella",
            turnover: "220cs",
            website: "microsoft.com",
            exchange: "NASDAQ"
        },
        {
            _id: "62a403f2f331f54566c68fc9",
            code: "msft2",
            name: "microsoft",
            ceo: "nadella",
            turnover: "220cs",
            website: "microsoft.com",
            exchange: "NASDAQ"
        }]
     let companiesList = companies.map((company)=>(
     <NavLink to='/info/'>
        <StocksItem 
            code={company.code} 
            name={company.name} 
            ceo={company.ceo} 
            exchange={company.exchange} 
            turnover={company.turnover} 
            website={company.website} 
            key={company._id}/>
    </NavLink>));
    
     const fetchCompanies = () => {
        setCompanies((prevState)=>{
            return !prevState;
        });
    }

    return(
        <div className={styles.container}>
        {
            registeredCompanies && <div className={styles.stocks}>
                <div className={styles.title}>
                    <span>{headLine}</span>
                </div>
                    <br/>
                    {registeredCompanies && companiesList}
             </div>
            }
            
            {!registeredCompanies && <Register/>}
            <button onClick={fetchCompanies}>change State</button>
        </div>
    )}