import React from 'react';
import Logo from "/logo.png";
import styles from './Header.module.scss';

const Header: React.FC = () => {
    return (
        <header className={styles["header-container"]}>
            <a href="/apricode/#">
                <img src={Logo} alt="Логотип" className={styles["logo__image"]} />
                <span className={styles["logo__text"]}>MoneyBank</span>
            </a>
            <nav className={styles["nav-links"]}>
                <a href="/apricode/#">Главная</a>
            </nav>
        </header>
    );
};

export default Header;