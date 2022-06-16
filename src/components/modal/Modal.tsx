import React from 'react';
import styles from  './Modal.module.scss';

export const Modal = (props:any) => {
    const showHideClassName = props.show ? `${styles.modal} ${styles.displayBlock}`: `${styles.modal} ${styles.displayNone}`;

    return ( <div className={showHideClassName}>
        <section className={styles['modal-main']}>
          {props.children}
          <button type="button" onClick={props.handleClose}>
            Add Price
          </button>
        </section>
      </div>
      )
}