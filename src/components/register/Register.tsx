import React,{ useReducer } from "react";
import styles from './Register.module.scss';

export const Register = () => {

    const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event.target);
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
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="name"><h3>Name</h3></label>
                    <input name="name" type="text"/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="ceo"><h3>CEO</h3></label>
                    <input name="ceo" type="text"/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="turnover"><h3>Turnover</h3></label>
                    <input name="turnover" type="number"/>
                </div>
                <div className={styles.field}>
                    <label htmlFor="website"><h3>Website</h3></label>
                    <input name="website" type="text"/>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>)}
