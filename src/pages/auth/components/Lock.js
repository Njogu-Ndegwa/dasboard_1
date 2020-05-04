import React from 'react';
import logo from '../../../assets/images/logo.png';
import styles from './auth.module.css';

const LockScreen = (props) => (
    <div>
        <div className={styles.header}>
            <div className={styles['header-wrapper']}>
                <header>
                    <a href="/">
                        <img src={logo} alt="M-Rescue" />
                    </a>
                    <div className={styles['nav-wrapper']}>
                        <nav>
                            <ul>
                                <li>
                                    <a href="#" target="_blank" rel="noopener noreferrer">Help</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </header>
            </div>
        </div>
        Lock Screen
        <div className={styles['footer']}>
            All rights reserved © Smarthealth
        </div>
    </div>
)

export default LockScreen;