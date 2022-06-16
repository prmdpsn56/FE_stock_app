import React from 'react';
import styles from './Notfound.module.scss';

export const Notfound = () => {
    return(<div className={styles.notFound}>
        <h1>404</h1>
          <p>This page does not exist. Please use Navigation to visit the site.</p>       
    </div>)
}