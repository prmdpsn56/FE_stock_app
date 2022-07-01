import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export const Header = () => {
  const [state, setHeaderState] = useState(false);
  const history = useHistory();

  const activateSideBar = () => {
    setHeaderState(prevState => !prevState);
  };

  const pageRedirect = (pagePath:string) => {
    history.push("/"+pagePath);
    activateSideBar();
  }

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
            <Link to="/companies">Companies</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </div>

      <div className={sidebarClasses}>
        <ul className={styles['sidebar-navigation']}>
          <li onClick={pageRedirect.bind(null,'companies')}>
            Companies
          </li>
          <li onClick={pageRedirect.bind(null,'register')}>
            Register
          </li>
        </ul>
      </div>
    </div>
  );
};
