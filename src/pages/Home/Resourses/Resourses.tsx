import React from 'react';
import BlockHeader from '../../../components/Block-header/Block-header';
import './Resourses.css';
import LinkButton from "../../../components/Link/Link-button.tsx";
import EbooksIcon from "../../../assets/Home-page/Ebooks.svg";
import MiniProfileImage from "../../../assets/Home-page/Mini-profile.png";
import EbooksImg from "../../../assets/Home-page/Ebooks-img.png";
import WhitepapersIcon from "../../../assets/Home-page/Whitepapers.svg";
import WhitepapersImg from "../../../assets/Home-page/Whitepapers-img.png";



const Resourses: React.FC = () => {

    return (
        <section className="content__block">
            <BlockHeader
                quote="Your Gateway to In-Depth Information"
                name="Unlock Valuable Knowledge with FutureTech's Resources"
                link="ccc"
                linkText="View All Resources"
            />
            <div className="resours content-dark">
                <div className="resours__container container-center Slot-separator-80">
                    <div className="resours__header Separator-header">
                        <div className="resours__header-top">
                            <img className="resours__icon Separator-header-icon" src={EbooksIcon}
                                 alt="Ebooks Icon"/>
                            <div className="resours__name-caption">
                                <h3 className="resours__name Separator-header-name">Ebooks</h3>
                                <p className="resours__caption">Explore our collection of ebooks covering a wide
                                    spectrum of future technology topics.</p>
                            </div>
                            <LinkButton link="ccc" linkText="Download Ebooks Now" size="big" theme="light"/>
                        </div>
                        <div className="resours__header-bottom">
                            <div className="resours__downloaded">
                                <h4 className="resours__downloaded-by">
                                    Downloaded By
                                </h4>
                                <span className="resours__downloaded-count">
                                        10k + Users
                                    </span>
                            </div>
                            <div className="resours__downloaded-users">
                                <div className="resours__downloaded-users-block">
                                    <img className="resours__user" src={MiniProfileImage} alt="User 1"/>
                                    <img className="resours__user" src={MiniProfileImage} alt="User 2"/>
                                    <img className="resours__user" src={MiniProfileImage} alt="User 3"/>
                                    <img className="resours__user" src={MiniProfileImage} alt="User 4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resours__main Separator-main">
                        <div className="resours__heading">
                            <h3 className="resours__heading-name">Variety of Topics</h3>
                            <p className="resours__heading-quote">Topics include AI in education (25%), renewable
                                energy (20%), healthcare (15%), space exploration (25%), and biotechnology
                                (15%).</p>
                        </div>
                        <img className="resours__main-img" src={EbooksImg} alt="resours img"/>
                        <div className="resours__total-format">
                            <div className="resours__total">
                                <h4 className="resours__total-heading">Total Ebooks</h4>
                                <span className="resours__total-text">Over 100 ebooks</span>
                            </div>
                            <div className="resours__format">
                                <div className="resours__format-text-container">
                                    <h4 className="resours__format-heading">Download Formats</h4>
                                    <span className="resours__format-text">PDF format for access.</span>
                                </div>
                                <LinkButton link="/" linkText="Preview" size="medium" theme="dark" altIcon/>
                            </div>
                        </div>
                        <div className="resours__author-expertise">
                            <h4 className="resours__author-expertise-heading">Average Author Expertise</h4>
                            <span className="resours__author-expertise-text">Ebooks are authored by renowned experts with an average of 15 years of experience</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="resours content-dark">
                <div className="resours__container container-center Slot-separator-80">
                    <div className="resours__header Separator-header">
                        <div className="resours__header-top">
                            <img className="resours__icon Separator-header-icon" src={WhitepapersIcon}
                                 alt="Ebooks Icon"/>
                            <div className="resours__name-caption">
                                <h3 className="resours__name Separator-header-name">Whitepapers</h3>
                                <p className="resours__caption">Dive into comprehensive reports and analyses with
                                    our collection of whitepapers. </p>
                            </div>
                            <LinkButton link="ccc" linkText="Download Whitepapers Now" size="big" theme="light"/>
                        </div>
                        <div className="resours__header-bottom">
                            <div className="resours__downloaded">
                                <h4 className="resours__downloaded-by">
                                    Downloaded By
                                </h4>
                                <span className="resours__downloaded-count">
                                        10k + Users
                                    </span>
                            </div>
                            <div className="resours__downloaded-users">
                                <div className="resours__downloaded-users-block">
                                    <img className="resours__user" src={MiniProfileImage} alt="User 1"/>
                                    <img className="resours__user" src={MiniProfileImage} alt="User 2"/>
                                    <img className="resours__user" src={MiniProfileImage} alt="User 3"/>
                                    <img className="resours__user" src={MiniProfileImage} alt="User 4"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="resours__main Separator-main">
                        <div className="resours__heading">
                            <h3 className="resours__heading-name">Topics Coverage</h3>
                            <p className="resours__heading-quote">Whitepapers cover quantum computing (20%), AI ethics
                                (15%), space mining prospects (20%), AI in healthcare (15%), and renewable energy
                                strategies (30%).</p>
                        </div>
                        <img className="resours__main-img" src={WhitepapersImg} alt="resours img"/>
                        <div className="resours__total-format">
                            <div className="resours__total">
                                <h4 className="resours__total-heading">Total Whitepapers</h4>
                                <span className="resours__total-text">Over 50 whitepapers</span>
                            </div>
                            <div className="resours__format">
                                <div className="resours__format-text-container">
                                    <h4 className="resours__format-heading">Download Formats</h4>
                                    <span className="resours__format-text">PDF format for access.</span>
                                </div>
                                <LinkButton link="/" linkText="Preview" size="medium" theme="dark" altIcon/>
                            </div>
                        </div>
                        <div className="resours__author-expertise">
                            <h4 className="resours__author-expertise-heading">Average Author Expertise</h4>
                            <span className="resours__author-expertise-text">Whitepapers are authored by subject matter experts with an average of 20 years of experience.</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Resourses;
