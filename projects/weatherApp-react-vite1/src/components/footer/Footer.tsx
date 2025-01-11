import './Footer.scss'
import React from "react";

const Footer: React.FC=() =>{
    return(
        <footer className="footer">
            <p className="footer__link">
                Проект выполнен в рамках стажировки
                <a className="footer__link-span" target="_blank" href="https://preax.ru">PREAX</a>
            </p>
        </footer>
    )
}

export default Footer;