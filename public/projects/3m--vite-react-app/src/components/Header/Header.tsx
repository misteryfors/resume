import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/Header.css';
import { ReactComponent as MoreOptions } from '../../assets/More-options.svg';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="header content-block">
            <div className="content-light">
                <nav className="header__bar container-between">
                    <Link to="/" className="header__logo"></Link>
                    <div className="header__pages-link">
                        <Link className="header__page-link" to="/Products">Продукты</Link>
                        <Link className="header__page-link" to="/create-product">Добавить продукт</Link>
                    </div>
                    <a className="header__contact" target="_blank" href="https://misteryfors.github.io/resume/">Contact Us</a>
                    <button className="header__more-options" onClick={toggleMenu}>
                        <MoreOptions />
                    </button>
                </nav>
            </div>

            {isMenuOpen && (
                <div className="header__mobile-menu">
                    <div className="header__mobile-menu-overlay" onClick={closeMenu}></div>
                    <div className="header__mobile-menu-content">
                        <button className="header__mobile-menu-close" onClick={closeMenu}>
                            ✕
                        </button>
                        <Link className="header__mobile-link" to="/Products" onClick={closeMenu}>Продукты</Link>
                        <Link className="header__mobile-link" to="/create-product" onClick={closeMenu}>Добавить продукт</Link>
                        <a className="header__mobile-link" target="_blank" href="https://misteryfors.github.io/resume/" onClick={closeMenu}>Contact Us</a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
