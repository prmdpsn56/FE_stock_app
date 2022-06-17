import React, {useEffect,useState} from "react";
import { useParams }  from "react-router-dom";
import styles from './Details.module.scss';
import {CompanyDetail} from '../../models/detail';
import {Stock} from '../../models/detail';
import { Modal } from '../modal/Modal';
import DateRangePicker from '@wojtekmaj/react-daterange-picker'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface DetailsProps {
    notifyError: () => void,
    notifySuccess: () => void
}

export const Details:React.FC<DetailsProps> = (props:DetailsProps) => {
    let stockValues:number [] = [];
    let date,stocks_List ;
    const history = useHistory();
    let params = useParams<{ code: string }>();
    const [modalState, setModalState] = useState<boolean>(false);
    const [value, onChange] = useState([new Date(), new Date()]);
    const [averagePrice, setAveragePrice] = useState<number>(0);
    const [highestPrice, setHighestPrice] = useState<number>(0);
    const [lowestPrice, setLowestPrice] = useState<number>(0);
    const [registeredDate, setRegisteredDate] = useState<string>('');
    const [stocksList, setstocksList] = useState<any>('');
    const [CompanyData, setCompanyData] = useState<CompanyDetail>({
        _id:"",
        code: "",
        name: "",
        ceo: "",
        turnover: "",
        website: "",
        exchange: "",
        createdAt: "",
        updatedAt: "",
        __v: 0,
            stocksValue: [
                {
                    id: 0,
                    code: "",
                    time: "",
                    price: ""
                }
                ]
    });
    
    const notifyStockUpdate  = () => {
        toast.success("Stock Price updated", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 300,
          hideProgressBar: true,
        });
      }
    const getCompanyData = async () => {
        try {
            const response = await axios.get(`http://localhost:9090/company/info/`+params.code);
            setCompanyData(response.data);
            date = new Date(response.data.createdAt).toLocaleString();
            setRegisteredDate(date);
            createStockData(response.data.stocksValue);
        } catch (error) {
            console.log(error);
            props.notifyError();
            history.push("/");
        }
       
    }

    const createStockData = (stocks:Stock []) => {
        if(stocks.length === 0) {
            setAveragePrice(0);
            setHighestPrice(0);
            setLowestPrice(0);
            setstocksList(<p>No stocks available for these dates.</p>);
            return;
        }
        stockPrices(stocks);
        averagePriceFinder();
        highestPriceFinder();
        lowestPriceFinder();
        createStocksList(stocks);
    }
    const stockPrices = (data:any) => {
        data.forEach((stock:Stock) => {
            stockValues.push(+stock.price);
        });
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
    const createStocksList = (StocksData: Stock[]) => {
        stocks_List = StocksData.map((stock:Stock)=> {
            let entryDate = new Date(stock['time']).toLocaleString();
            return (<div className={styles.priceDetail} key={entryDate}>
                    <h3 className={styles.price}><span>Price  : </span>{stock.price}</h3>
                    <h3 className={styles.date}><span>on</span> : {entryDate}</h3>
                </div>)
            })
            setstocksList(stocks_List);
    }

    useEffect(() => {
        getCompanyData();
    }, [params]);

    const hideModal = () => {
        setModalState(false);
    }
    const showModal = () => {
        setModalState(true);
    }

    const deleteStock = () => {
        try {
            axios.delete(`http://localhost:9090/company/delete/`+params.code).then(()=>{
                history.push("/");
                props.notifySuccess();
            });
        }catch(error) {
            console.log(error);
            props.notifyError();
        }
    }

    const newStockAdded = () => {
        notifyStockUpdate();
        getCompanyData();
        hideModal();
    }

    const filterDateChange = (data:any) => {
        onChange(data);
        let startDate = data[0].toISOString().substring(0, 10)
        let endDate = data[1].toISOString().substring(0, 10);
        let companyCode = params.code;
        axios.get('http://localhost:8000/api/stocks/filter/'+startDate+'/'+endDate+'/'+companyCode).then((result)=>{
            createStockData(result.data);
        })
        
    }

    return (<div className='container'>
    <ToastContainer limit={1}/>
    <div className={styles.flex}>
        <div className={styles.details}> 
            <span className={styles.title}>{CompanyData.code.toUpperCase()}</span>
            <div className={styles.info}>    
                <h3><span>Company name</span> : {CompanyData.name.toUpperCase()}</h3>
                <h3><span>CEO</span> : {CompanyData.ceo}</h3>
                <h3><span>Turnover</span> : {CompanyData.turnover}</h3>
                <h3><span>Exchange</span> : {CompanyData.exchange}</h3>
                <h3><span>Registered on</span> : {registeredDate}</h3>
                <h3><span>Highest Value</span> : {highestPrice}$</h3>
                <h3><span>Lowest Value</span> : {lowestPrice}$</h3>
                <h3><span>Average Value</span> : {averagePrice.toFixed(2)}$</h3>            
            </div>
        </div>
        <div className={styles.stocks}>
            <div className={styles.datePicker}>
                <DateRangePicker onChange={filterDateChange} value={value} />
            </div>
            {stocksList}
        </div>    
    </div>
    <div>
        <button className={styles.deleteButton} onClick={deleteStock}>Delete Stock</button>
        <button className={styles.stockButton} onClick={showModal}>Add Stock Value</button>
        <Modal show={modalState} handleClose={hideModal} stockCode={params.code} stockUpdate={newStockAdded}>
        <p>{params.code.toUpperCase()}</p>
        </Modal>
    </div>
    </div>);
}