import React,{useState,useEffect} from "react";
import styles from './Stocks.module.scss';
import {StocksItem} from '../stocksItem/StocksItem';
import { Company } from '../../models/companies';
import axios from 'axios';



export const Stocks = () => {
    let companies: Company [] = [];
    const [registeredCompanies, setCompanies] = useState(companies);
    let headLine = registeredCompanies.length > 0 ? 'Registered Companies' : 'No Registered Companies Found'
     let companiesList = registeredCompanies.map((company: Company)=>(
        <StocksItem 
            code={company.code} 
            name={company.name} 
            ceo={company.ceo} 
            exchange={company.exchange} 
            turnover={company.turnover} 
            website={company.website} 
            key={company._id}/>
            ));
    
    const getCompanies = async () => {
        const response = await axios.get(`http://localhost:9090/company/getall`);
        setCompanies(response.data.companies_list);
    }
    
    useEffect(() => {
        getCompanies();
    }, [])

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