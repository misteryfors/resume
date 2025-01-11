import React from 'react';
import './Footer.css';
import { ReactComponent as Telegram } from '../../assets/Telegram.svg';
import { ReactComponent as Vk } from '../../assets/Vk.svg';
import { ReactComponent as Discord } from '../../assets/Discord.svg';
import '../Link/Link-button.css';

const Footer: React.FC = () => (
    <footer className="footer content-block">
        <div className="footer__legal-information content-light">
            <div className="footer__information container-between">
                <p className="footer__information-TAP">
                    <span>Terms & Conditions</span>
                    <span>Privacy Policy</span>
                </p>
                <nav className="footer__information-social">
                    <a className="footer__information-social-link" target="_blank" href="https://t.me/mistfors"><Telegram className="Icon-medium"/></a>
                    <a className="footer__information-social-link" target="_blank" href="https://vk.com/id152716600"><Vk className="Icon-medium"/></a>
                    <a className="footer__information-social-link" target="_blank" href="287559508798996481"><Discord className="Icon-medium"/></a>
                </nav>
                <p className="footer__information-copyrite">
                    © 2024 Resume Artem Novickov.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
