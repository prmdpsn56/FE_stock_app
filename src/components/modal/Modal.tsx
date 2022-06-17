import React,{useRef} from 'react';
import styles from  './Modal.module.scss';
import axios from 'axios';

export const Modal = (props:any) => {
    const showHideClassName = props.show ? `${styles.modal} ${styles.displayBlock}`: `${styles.modal} ${styles.displayNone}`;
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    const updateValue = async() => {
      let enteredValue = +inputRef.current.value;
      if(enteredValue > 0) {
        try { 
            await axios.post('http://localhost:8000/api/stocks/entry',{
            code:props.stockCode,
            price: +inputRef.current.value
          }) 
          props.stockUpdate();
        } catch (error) {
          console.log(error);
          alert('Something went wrong');
        }
      }else {
        alert('Enter correct value');
      }
    }

    return ( <div className={showHideClassName}>
        <section className={styles['modal-main']}>
          {props.children}
          <label>Enter Stock Price</label>
          <input type='number' min="0" ref={inputRef} />
          <button type="button" onClick={updateValue} className={styles.enterButton}>
            Add Price
          </button>
          <button type="button" onClick={props.handleClose} className={styles.cancelButton}>
            Close
          </button>
        </section>
      </div>
      )
}