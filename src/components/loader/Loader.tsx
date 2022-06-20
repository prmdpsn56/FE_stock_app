import React,{useRef} from 'react';
import styles from './Loader.module.scss';

export const Loader = () => {
    return (
        <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>
    )
}