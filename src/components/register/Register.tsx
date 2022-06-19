import React,{useState,useEffect } from "react";
import styles from './Register.module.scss';
import  { RegisterCompany } from '../../models/register';
import axios from 'axios';
import { useHistory } from "react-router-dom";


interface RegisterProps {
    notifyError: (message:string) => void,
    notifySuccess: (message:string) => void
}

export const Register:React.FC<RegisterProps> = (props:RegisterProps)=> {
    const history = useHistory();
    const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    const code_pattern = /^[A-Za-z]{0,4}$/;
    const string_pattern = /^[A-Za-z ]{0,15}$/;
    const turnover_pattern = /^[0-9]*$/;
    const [code, setCode] = useState<string>('');
    const [enteredCodeTouched, setEnteredCodeTouched] = useState<boolean>(false);

    const [name, setName] = useState<string>('');
    const [enteredNameTouched, setEnteredNameTouched] = useState<boolean>(false);

    const [ceo, setCeo] = useState<string>('');
    const [enteredCeoTouched, setEnteredCeoTouched] = useState<boolean>(false);

    const [turnover, setTurnover] = useState<string>('');
    const [enteredTurnoverTouched, setEnteredTurnoverTouched] = useState<boolean>(false);

    const [website, setWebsite]= useState<string>('');
    const [enteredWebsiteTouched, setEnteredWebsiteTouched] = useState<boolean>(false);

    const [exchange, setExchange]= useState<string>('');
    const [enteredExchangeTouched, setEnteredExchangeTouched] = useState<boolean>(false);

    const codeIsValid = (code_pattern.test(code) && code.trim() !== '');
    const codeIsInvalid = !codeIsValid && enteredCodeTouched;
    const nameIsValid = (string_pattern.test(name) && name.trim() !== '');
    const nameIsInvalid = !nameIsValid && enteredNameTouched;
    const ceoIsValid = (string_pattern.test(ceo) && ceo.trim() !== '');
    const ceoIsInvalid = !ceoIsValid && enteredCeoTouched;
    const turnoverIsValid = (turnover_pattern.test(turnover) && turnover.trim() !== '');
    const turnoverIsInvalid = !turnoverIsValid && enteredTurnoverTouched;
    const websiteIsValid = (pattern.test(website) && website.trim() !== '');
    const websiteIsInvalid = !websiteIsValid && enteredWebsiteTouched;
    const exchangeIsValid = (string_pattern.test(exchange) && exchange.trim() !== '');
    const exchangeIsInvalid = !exchangeIsValid && enteredExchangeTouched;

    let formIsValid = false;
    
    if(!codeIsInvalid && !nameIsInvalid && !ceoIsInvalid && !turnoverIsInvalid && !websiteIsInvalid) {
        console.log(codeIsInvalid);
        formIsValid = true;
    }

    const formSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEnteredCodeTouched(true);
        setEnteredNameTouched(true);
        setEnteredCeoTouched(true);
        setEnteredTurnoverTouched(true);
        setEnteredWebsiteTouched(true);
        setEnteredExchangeTouched(true);
        if(!formIsValid){
            return;
        }
        let company_info =  new RegisterCompany(code,name,ceo,turnover,website,exchange);
        console.log(company_info);
        try {
            const response = await axios.post('http://localhost:9090/company/register',company_info);
            console.log(response);
            props.notifySuccess('Company Registered in Database.');
            history.push("/");
        } catch (error) {
            props.notifyError('Please enter valid values');
            console.log(error)
        }
        setCode('');
        setEnteredCodeTouched(true);
    }

    const codeInputChangeHandler = (event:any) => {
        setCode(event.target.value);
    } 

    const codeInputBlurHandler = (event:any) => {
        setEnteredCodeTouched(true);
    }

    const nameInputChangeHandler = (event:any) => {
        setName(event.target.value);
    } 

    const nameInputBlurHandler = (event:any) => {
        setEnteredNameTouched(true);
    }

    const ceoInputChangeHandler = (event:any) => {
        setCeo(event.target.value);
    } 

    const ceoInputBlurHandler = (event:any) => {
        setEnteredCeoTouched(true);
    }

    const turnoverInputChangeHandler = (event:any) => {
        setTurnover(event.target.value);
    } 

    const turnoverInputBlurHandler = (event:any) => {
        setEnteredTurnoverTouched(true);
    }

    const websiteInputChangeHandler = (event:any) => {
        setWebsite(event.target.value);
    } 

    const websiteInputBlurHandler = (event:any) => {
        setEnteredWebsiteTouched(true);
    }

    const exchangeInputChangeHandler = (event:any) => {
        setExchange(event.target.value);
    } 

    const exchangeInputBlurHandler = (event:any) => {
        setEnteredExchangeTouched(true);
    }

    return(<div className={styles.container}>
        <div className={styles.registerForm}>
            <div className={styles.title}>
                <span>Register Company</span>
            </div>
            <form onSubmit={formSubmitHandler}>
                <div className={styles.field}>
                    <label htmlFor="code"><h3>Code</h3></label>
                    <input 
                    name="code" 
                    type="text"
                    id="code"
                    onChange={codeInputChangeHandler}
                    onBlur={codeInputBlurHandler}
                    />
                    {codeIsInvalid && <p>Please enter a valid 4 character code.</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="name"><h3>Name</h3></label>
                    <input
                     name="name" 
                     type="text"
                     id="name"
                     onChange={nameInputChangeHandler}
                     onBlur={nameInputBlurHandler}
                    />
                    {nameIsInvalid && <p>Please enter a valid company name.</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="ceo"><h3>CEO</h3></label>
                    <input 
                    name="ceo" 
                    type="text"
                    id="ceo"
                    onChange={ceoInputChangeHandler}
                    onBlur={ceoInputBlurHandler}
                    />
                    {ceoIsInvalid && <p>Please enter a valid ceo name.</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="turnover"><h3>Turnover</h3></label>
                    <input 
                    name="turnover" 
                    type="number"
                    onChange={turnoverInputChangeHandler}
                    onBlur={turnoverInputBlurHandler}
                    />
                    {turnoverIsInvalid && <p>Please enter a valid turnover.</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="website"><h3>Website</h3></label>
                    <input 
                    name="website" 
                    type="text"
                    onChange={websiteInputChangeHandler}
                    onBlur={websiteInputBlurHandler}
                    />
                    {websiteIsInvalid && <p>Please enter a valid website.</p>}
                </div>
                <div className={styles.field}>
                    <label htmlFor="exchange"><h3>Exchange</h3></label>
                    <input 
                    name="exchange" 
                    type="text"
                    onChange={exchangeInputChangeHandler}
                    onBlur={exchangeInputBlurHandler}
                    />
                    {exchangeIsInvalid && <p>Please enter a valid Exchange.</p>}
                </div>
                <button type="submit" disabled={!formIsValid}>Register</button>
            </form>
        </div>
    </div>)}
