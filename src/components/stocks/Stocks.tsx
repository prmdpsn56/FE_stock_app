import React,{useState,useEffect} from "react";
import styles from './Stocks.module.scss';
import {StocksItem} from '../stocksItem/StocksItem';
import { Company } from '../../models/companies';
import axios from 'axios';
import {Loader} from '../loader/Loader'


export const Stocks = () => {
    let companies: Company [] = [];
    const [registeredCompanies, setCompanies] = useState(companies);
    const [showLoader, setShowLoader] = useState(true);
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
        try {
        const response = await axios.get(`http://mongo-db-loadbalancer-1163247518.us-east-1.elb.amazonaws.com/company/getall`);
        setCompanies(response.data.companies_list);
        setTimeout(() => {
            setShowLoader(false);
        }, 1500);
        } catch (error) {
            setTimeout(() => {
                setShowLoader(false);
            }, 1500);
        }
        
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
                    {showLoader && <div className={styles.loader}>
                        <Loader/>
                    </div>}
                    {(registeredCompanies && !showLoader) && companiesList}
             </div>
        </div>
    )}