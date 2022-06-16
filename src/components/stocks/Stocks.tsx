import React,{useState} from "react";
import styles from './Stocks.module.scss';
import {StocksItem} from '../stocksItem/StocksItem';
import { Company } from '../../models/companies';
import { Link } from "react-router-dom";


export const Stocks = () => {
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
    const [registeredCompanies, setCompanies] = useState(companies);
    let headLine = registeredCompanies.length > 0 ? 'Registered Companies' : 'No Registered Companies Found'
     let companiesList = companies.map((company: Company)=>(
     <Link to={'/info/'+company.code}>
        <StocksItem 
            code={company.code} 
            name={company.name} 
            ceo={company.ceo} 
            exchange={company.exchange} 
            turnover={company.turnover} 
            website={company.website} 
            key={company._id}/>
    </Link>));
    
    return(
        <div className='container'>
            <div className={styles.stocks}>
                <div className={styles.title}>
                    <span>{headLine}</span>
                </div>
                    <br/>
                    {registeredCompanies && companiesList}
             </div>
        </div>
    )}