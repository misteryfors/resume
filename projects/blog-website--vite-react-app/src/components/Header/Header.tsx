import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ReactComponent as LinkArrow } from '../../assets/Link-arrow-yellow.svg';
import { ReactComponent as MoreOptions} from '../../assets/More-options.svg';

const Header: React.FC = () => (
    <header className="header content-block">
        <div className="header__banner content-dark">
            <div className="header__top-banner container-center">
                <p className="header__banner-text">
                    Subscribe to our Newsletter For New & Latest Blogs and Resources
                    <LinkArrow className="Icon-medium"/> {/* Прямой компонент SVG */}
                </p>
            </div>
        </div>
        <div className="content-light">
            <nav className="header__bar container-between">
                <Link to="/" className="header__logo"/>
                <div className="header__pages-link">
                    <Link className="header__page-link" to="/">Home</Link>
                    <Link className="header__page-link" to="/AboutMe">AboutMe</Link>
                    <Link className="header__page-link" to="/Podcasts">Podcasts</Link>
                    <Link className="header__page-link" to="/Resources">Resources</Link>
                </div>
                <button className="header__more-options">
                    <MoreOptions/>
                </button>
                <Link className="header__contact" to="/">Contact Us</Link>
            </nav>
        </div>
    </header>
);

export default Header;
