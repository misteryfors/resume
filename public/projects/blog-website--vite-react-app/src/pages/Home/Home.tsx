import React from 'react';
import './Home.css';
import LinkButton from "../../components/Link/Link-button.tsx";
import EbooksIcon from '../../assets/Home-page/Ebooks.svg';
import AbstractDesign from '../../assets/Home-page/Abstract Design.png';
import Futures from "./Futures/Futures.tsx";
import Testimonials from "./Testimonials/Testimonials.tsx";
import Resourses from "./Resourses/Resourses.tsx";
import Blog from "./Blog/Blog.tsx";
import MiniProfileImage from "../../assets/Home-page/Mini-profile.png";


const Home: React.FC = () => {


    return (
        <div className="content">
            {/* Блок заголовка */}
            <section className="content__block">
                <div className="heading content-dark">
                    <div className="heading__top content-dark">
                        <div className="heading__top-block container-center Slot-separator-0">
                            <div className="heading__main content-dark">
                                <div className="heading__main-block">
                                    <div className="heading__main-block-text">
                                        <p className="heading__main-quote">
                                            Your Journey to Tomorrow Begins Here
                                        </p>
                                        <h1 className="heading__main-titel">
                                            Explore the Frontiers of Artificial Intelligence
                                        </h1>
                                        <p className="heading__main-caption">
                                            Welcome to the epicenter of AI innovation. FutureTech AI News is your passport to a world where machines think, learn, and reshape the future. Join us on this visionary expedition into the heart of AI.
                                        </p>
                                    </div>
                                </div>
                                <div className="heading__company-stats Slot-separator-50">
                                    <p className="heading__stats">
                                        <span className="heading__stats-count">300</span>
                                        <span className="heading__stats-text">Resources available</span>
                                    </p>
                                    <p className="heading__stats">
                                        <span className="heading__stats-count">12k</span>
                                        <span className="heading__stats-text">Total Downloads</span>
                                    </p>
                                    <p className="heading__stats">
                                        <span className="heading__stats-count">10k</span>
                                        <span className="heading__stats-text">Active Users</span>
                                    </p>
                                </div>
                            </div>
                            <div className="heading__extra">
                                <img
                                    className="heading__image"
                                    src={AbstractDesign}
                                    alt="Abstract Design"
                                />
                                <div className="heading__extra-block">
                                    <div className="heading__extra-users">
                                        <div className="heading__extra-users-block">
                                            <img className="heading__extra-user" src={MiniProfileImage} alt="User 1"/>
                                            <img className="heading__extra-user" src={MiniProfileImage} alt="User 2"/>
                                            <img className="heading__extra-user" src={MiniProfileImage} alt="User 3"/>
                                            <img className="heading__extra-user" src={MiniProfileImage} alt="User 4"/>
                                        </div>
                                    </div>
                                    <div className="heading__extra-text">
                                        <p className="heading__extra-titel">
                                            Explore 1000+ resources
                                        </p>
                                        <p className="heading__extra-caption">
                                            Over 1,000 articles on emerging tech trends and breakthroughs.
                                        </p>
                                    </div>
                                    <LinkButton link="/" linkText="Explore Resources" size="medium" theme="dark"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="heading__advantages container-center Slot-separator-80">
                        <div className="heading__advantage">
                            <img className="heading__advantage-icon Icon-large" src={EbooksIcon}/>
                            <div className="heading__advantage-info">
                                <p className="heading__advantage-text">
                                    <span className="heading__advantage-name">Latest News Updates</span>
                                    <span className="heading__advantage-first-caption">Stay Current</span>
                                    </p>
                                    <LinkButton link="/" size="medium"></LinkButton>
                                </div>
                                <p className="heading__advantage-second-caption">Over 1,000 articles published
                                    monthly</p>
                            </div>
                            <div className="heading__advantage">
                                <img className="heading__advantage-icon Icon-large" src={EbooksIcon}/>
                                <div className="heading__advantage-info">
                                    <p className="heading__advantage-text">
                                        <span className="heading__advantage-name">Latest News Updates</span>
                                        <span className="heading__advantage-first-caption">Stay Current</span>
                                    </p>
                                    <LinkButton link="/" size="medium"></LinkButton>
                                </div>
                                <p className="heading__advantage-second-caption">Over 1,000 articles published
                                    monthly</p>
                            </div>
                            <div className="heading__advantage">
                                <img className="heading__advantage-icon Icon-large" src={EbooksIcon}/>
                                <div className="heading__advantage-info">
                                    <p className="heading__advantage-text">
                                        <span className="heading__advantage-name">Latest News Updates</span>
                                        <span className="heading__advantage-first-caption">Stay Current</span>
                                    </p>
                                    <LinkButton link="/" size="medium"></LinkButton>
                                </div>
                                <p className="heading__advantage-second-caption">Over 1,000 articles published
                                    monthly</p>
                            </div>
                        </div>
                </div>
            </section>
            {/* Блок будующее */}
            <Futures/>
            {/* Блок блог */}
            <Blog/>
            {/* Блок ресурсов */}
            <Resourses/>
            {/* Блок отзывов */}
            <Testimonials/>
        </div>
    );
};

export default Home;
