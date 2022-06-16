import React from 'react';
import styles from './Banner.module.scss';

export const Banner = () => {
    return (
    <div className={styles.bannerImage}>
        <img src="./header.jpeg" alt="header-image"/>
    </div>)
}