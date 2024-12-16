import React from 'react';
import '../../styles/components/Footer.css';


const Footer: React.FC = () => (
    <footer className="footer content-block">
        <div className="footer__legal-information content-light">
            <div className="footer__information container-between">
                <p className="footer__information-TAP">
                    <span>Terms & Conditions</span>
                    <span>Privacy Policy</span>
                </p>
                <nav className="footer__information-social">
                       </nav>
                <p className="footer__information-copyrite">
                    © 2024 Test for Alpha. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
