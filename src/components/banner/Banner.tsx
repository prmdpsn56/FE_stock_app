import React from 'react';
import styles from './Banner.module.scss';
import gfgLogo from "../../assets/header.jpeg";

export const Banner = () => {
    return (
    <div className={styles.bannerImage}>
        <img src={gfgLogo} alt="headerimage"/>
    </div>)
}