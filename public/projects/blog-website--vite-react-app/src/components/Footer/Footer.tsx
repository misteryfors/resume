import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';
import { ReactComponent as LinkArrow } from '../../assets/Link-arrow.svg';
import { ReactComponent as Twitter } from '../../assets/Twitter.svg';
import { ReactComponent as ThreeRound } from '../../assets/Three-round.svg';
import { ReactComponent as In } from '../../assets/In.svg';
import BlockHeader from "../Block-header/Block-header.tsx";
import '../Link/Link-button.css';
import LinkButton from "../Link/Link-button.tsx";

const Footer: React.FC = () => (
    <footer className="footer content-block">
        <BlockHeader
            quote="Learn, Connect, and Innovate"
            name="Be Part of the Future Tech Revolution"
            caption="Immerse yourself in the world of future technology. Explore our comprehensive resources, connect with fellow tech enthusiasts, and drive innovation in the industry. Join a dynamic community of forward-thinkers."
            altCaption="Immerse yourself in the world of future technology. Explore our comprehensive resources."
            logo={true}
        >
            <div className="footer__community">
                <p className="footer__community-block">
                    <span className="footer__community-name">Resource Access
                        <Link className="footer__community-button" to="/"><LinkArrow className="Icon-medium"/></Link>
                    </span>
                    <span className="footer__community-caption">
                        Visitors can access a wide range of resources, including ebooks, whitepapers, reports.
                    </span>
                </p>
                <p className="footer__community-block">
                    <span className="footer__community-name">Resource Access
                        <Link className="footer__community-button" to="/"><LinkArrow className="Icon-medium"/></Link>
                    </span>
                    <span className="footer__community-caption">
                        Visitors can access a wide range of resources, including ebooks, whitepapers, reports.
                    </span>
                </p>
                <p className="footer__community-block">
                    <span className="footer__community-name">Resource Access
                        <Link className="footer__community-button" to="/"><LinkArrow className="Icon-medium"/></Link>
                    </span>
                    <span className="footer__community-caption">
                        Visitors can access a wide range of resources, including ebooks, whitepapers, reports.
                    </span>
                </p>
            </div>
        </BlockHeader>
        <div className="footer__nav-bar content-dark">
            <div className="footer__chapters container-center">
                <nav className={"footer__chapter"}>
                    <p className="footer__chapter-heading">
                        <Link className="footer__chapter-heading-text" to="/">Home</Link>
                    </p>
                    <p className="footer__chapter-links">
                        <Link className="footer__chapter-link" to="/">Features</Link>
                        <Link className="footer__chapter-link" to="/">Blogs</Link>
                        <Link className="footer__chapter-link footer__chapter-link-new" to="/">Resources</Link>
                        <Link className="footer__chapter-link" to="/">Testimonials</Link>
                        <Link className="footer__chapter-link" to="/">Contact Us</Link>
                        <Link className="footer__chapter-link" to="/">Newsletter</Link>
                    </p>
                </nav>
                <nav className={"footer__chapter"}>
                    <p className="footer__chapter-heading">
                        <Link className="footer__chapter-heading-text" to="/">News</Link>
                    </p>
                    <p className="footer__chapter-links">
                        <Link className="footer__chapter-link" to="/">Trending Stories</Link>
                        <Link className="footer__chapter-link" to="/">Featured Videos</Link>
                        <Link className="footer__chapter-link" to="/">Technology</Link>
                        <Link className="footer__chapter-link" to="/">Health</Link>
                        <Link className="footer__chapter-link" to="/">Politics</Link>
                        <Link className="footer__chapter-link" to="/">Environment</Link>
                    </p>
                </nav>
                <nav className={"footer__chapter"}>
                    <p className="footer__chapter-heading">
                        <Link className="footer__chapter-heading-text" to="/">Blogs</Link>
                    </p>
                    <p className="footer__chapter-links">
                        <Link className="footer__chapter-link" to="/">Quantum Computing</Link>
                        <Link className="footer__chapter-link" to="/">AI Ethics</Link>
                        <Link className="footer__chapter-link" to="/">Space Exploration</Link>
                        <Link className="footer__chapter-link footer__chapter-link-new" to="/">Biotechnology</Link>
                        <Link className="footer__chapter-link" to="/">Renewable Energy</Link>
                        <Link className="footer__chapter-link" to="/">Biohacking</Link>
                    </p>
                </nav>
                <nav className={"footer__chapter"}>
                    <p className="footer__chapter-heading">
                        <Link className="footer__chapter-heading-text" to="/">Podcasts</Link>
                    </p>
                    <p className="footer__chapter-links">
                        <Link className="footer__chapter-link" to="/">AI Revolution</Link>
                        <Link className="footer__chapter-link footer__chapter-link-new" to="/">AI Revolution</Link>
                        <Link className="footer__chapter-link" to="/">TechTalk AI</Link>
                        <Link className="footer__chapter-link" to="/">AI Conversations</Link>
                    </p>
                </nav>
                <nav className={"footer__chapter"}>
                    <p className="footer__chapter-heading">
                        <Link className="footer__chapter-heading-text" to="/">Resources</Link>
                    </p>
                    <p className="footer__chapter-links">
                        <LinkButton link="/" linkText="Whitepapers" size="small" theme="dark"/>
                        <LinkButton link="/" linkText="Ebooks" size="small" theme="dark"/>
                        <LinkButton link="/" linkText="Reports" size="small" theme="dark"/>
                        <LinkButton link="/" linkText="Research Papers" size="small" theme="dark"/>
                    </p>
                </nav>
            </div>
        </div>
        <div className="footer__legal-information content-dark">
            <div className="footer__information container-between">
                <p className="footer__information-TAP">
                    <span>Terms & Conditions</span>
                    <span>Privacy Policy</span>
                </p>
                <nav className="footer__information-social">
                    <Twitter className="Icon-medium"/>
                    <ThreeRound className="Icon-medium"/>
                    <In className="Icon-medium"/>
                </nav>
                <p className="footer__information-copyrite">
                    © 2024 FutureTech. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
