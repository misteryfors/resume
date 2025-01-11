import React from 'react';
import BlockHeader from '../../../components/Block-header/Block-header';
import './Blog.css';
import ProfileImage from "../../../assets/Profile.png";
import LinkButton from "../../../components/Link/Link-button.tsx";
import ReactionLike from "../../../assets/Home-page/Reacion-like.svg";
import ReactionComment from "../../../assets/Home-page/Reaction-comment.svg";
import ReactionRepost from "../../../assets/Home-page/Reaction-repost.svg";



const Blog: React.FC = () => {

    return (
        <section className="content__block">
            <BlockHeader
                quote="A Knowledge Treasure Trove"
                name="Explore FutureTech's In-Depth Blog Posts"
                link="ccc"
                linkText="View All Blogs"
            />
            <div className="post__tabs content-dark">
                <div className="post__filters container-between">
                    <button className="post__filter">All</button>
                    <button className="post__filter">Quantum Computing</button>
                    <button className="post__filter">AI Ethics</button>
                    <button className="post__filter">Space Exploration</button>
                    <button className="post__filter">Biotechnology</button>
                    <button className="post__filter">Renewable Energy</button>
                </div>
            </div>
            <div className="post content-dark">
                <div className="post__container container-between">
                    <div className="post__user">
                        <img className="post__user-img" src={ProfileImage}/>
                        <p className="post__user-info">
                            <span className="post__user-name">John Techson</span>
                            <span className="post__user-speciality">Quantum Computing</span>
                        </p>
                        <div className="post__alt-link">
                            <LinkButton link="/" linkText="View Resourses" size="medium" theme="dark"/>
                        </div>
                    </div>
                    <div className="post__main">
                        <p className="post__main-date">October 15, 2023</p>
                        <div className="post__main-text">
                            <p className="post__main-heading">The Quantum Leap in Computing</p>
                            <p className="post__main-info">Explore the revolution in quantum computing, its
                                applications, and its potential impact on various industries.</p>
                        </div>
                        <div className="post__main-reactions">

                            <button className="post__main-like">
                                <img className="post__main-reaction Icon-medium" src={ReactionLike}/>
                                24.5k
                            </button>
                            <button className="post__main-comment">
                                <img className="post__main-reaction Icon-medium" src={ReactionComment}/>
                                50
                            </button>
                            <button className="post__main-repost">
                                <img className="post__main-reaction Icon-medium" src={ReactionRepost}/>
                                20
                            </button>
                        </div>
                    </div>
                    <div className="post__link">
                        <LinkButton link="/" linkText="View Resourses" size="medium" theme="dark"/>
                    </div>
                </div>
            </div>
            <div className="post content-dark">
                <div className="post__container container-between">
                    <div className="post__user">
                        <img className="post__user-img" src={ProfileImage}/>
                        <p className="post__user-info">
                            <span className="post__user-name">Sarah Ethicist</span>
                            <span className="post__user-speciality">AI Ethics</span>
                        </p>
                        <div className="post__alt-link">
                            <LinkButton link="/" linkText="View Resourses" size="medium" theme="dark"/>
                        </div>
                    </div>
                    <div className="post__main">
                        <p className="post__main-date">November 5, 2023</p>
                        <div className="post__main-text">
                            <p className="post__main-heading">The Ethical Dilemmas of AI</p>
                            <p className="post__main-info">A deep dive into ethical challenges posed by AI, including
                                bias, privacy, and transparency.</p>
                        </div>
                        <div className="post__main-reactions">

                            <button className="post__main-like">
                                <img className="post__main-reaction Icon-medium" src={ReactionLike}/>
                                32k
                            </button>
                            <button className="post__main-comment">
                                <img className="post__main-reaction Icon-medium" src={ReactionComment}/>
                                72
                            </button>
                            <button className="post__main-repost">
                                <img className="post__main-reaction Icon-medium" src={ReactionRepost}/>
                                18
                            </button>
                        </div>
                    </div>
                    <div className="post__link">
                        <LinkButton link="/" linkText="View Resourses" size="medium" theme="dark"/>
                    </div>
                </div>
            </div>
            <div className="post content-dark">
                <div className="post__container container-between">
                    <div className="post__user">
                        <img className="post__user-img" src={ProfileImage}/>
                        <p className="post__user-info">
                            <span className="post__user-name">Astronomer X</span>
                            <span className="post__user-speciality">Space Exploration</span>
                        </p>
                        <div className="post__alt-link">
                            <LinkButton link="/" linkText="View Resourses" size="medium" theme="dark"/>
                        </div>
                    </div>
                    <div className="post__main">
                        <p className="post__main-date">December 10, 2023</p>
                        <div className="post__main-text">
                            <p className="post__main-heading">The Mars Colonization Challenge</p>
                            <p className="post__main-info">Exploring the technical and logistical challenges of human
                                colonization on Mars.</p>
                        </div>
                        <div className="post__main-reactions">

                            <button className="post__main-like">
                                <img className="post__main-reaction Icon-medium" src={ReactionLike}/>
                                20k
                            </button>
                            <button className="post__main-comment">
                                <img className="post__main-reaction Icon-medium" src={ReactionComment}/>
                                31
                            </button>
                            <button className="post__main-repost">
                                <img className="post__main-reaction Icon-medium" src={ReactionRepost}/>
                                12
                            </button>
                        </div>
                    </div>
                    <div className="post__link">
                        <LinkButton link="/" linkText="View Resourses" size="medium" theme="dark"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
