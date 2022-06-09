import React, { useState } from 'react';
import styles from './Header.module.scss';

export const Header = () => {
  const [state, setHeaderState] = useState(false);

  const activateSideBar = () => {
    setHeaderState(prevState => !prevState);
  };

  const sidebarClasses = state
    ? `${styles.sidebar} ${styles.show}`
    : `${styles.sidebar} ${styles.hide}`;

  const hamburgerClasses = state
    ? `${styles.container} ${styles.change}`
    : `${styles.container}`;

  return (
    <div>
      <div className={styles.navigation}>
        <div className={hamburgerClasses} onClick={activateSideBar}>
          <div className={styles.bar1}></div>
          <div className={styles.bar2}></div>
          <div className={styles.bar3}></div>
        </div>
        <ul>
          <li>
            <a href="/">Companies</a>
          </li>
          <li>
            <a href="/">Register</a>
          </li>
          <li>
            <a href="/">Stocks</a>
          </li>
        </ul>
      </div>

      <div className={sidebarClasses}>
        <ul className={styles['sidebar-navigation']}>
          <li>
            <a href="/">Companies</a>
          </li>
          <li>
            <a href="/">Register</a>
          </li>
          <li>
            <a href="/">Stocks</a>
          </li>
        </ul>
      </div>
    </div>
  );
};
