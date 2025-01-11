import React from 'react';
import BlockHeader from '../../../components/Block-header/Block-header';
import './Futures.css';
import FutureInsights from '../../../assets/Home-page/Future-Insights.svg';
import FutureTehnology from '../../../assets/Home-page/Future-Tehnology.svg';



const Futures: React.FC = () => {

    return (
            <section className="content__block">
                <BlockHeader
                    quote="Unlock the Power of"
                    name="FutureTech Features"
                />
                <div className="features content-dark">
                    <div className="features__container container-center Slot-separator-80">
                        <div className="features__header Separator-header">
                            <img className="features__icon Separator-header-icon" src={FutureTehnology}
                                 alt="Ebooks Icon"/>
                            <div className="features__name-caption">
                                <h3 className="features__name Separator-header-name">Future Technology Blog</h3>
                                <p className="features__caption">Stay informed with our blog section dedicated to future
                                    technology.</p>
                            </div>
                        </div>
                        <div className="features__main Separator-main">
                            <ul className="features__info-grid">
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Quantity
                                    </p>
                                    <p className="features__block-text">
                                        Over 1,000 articles on emerging tech trends and breakthroughs.
                                    </p>
                                </li>
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Variety
                                    </p>
                                    <p className="features__block-text">
                                        Articles cover fields like AI, robotics, biotechnology, and more.
                                    </p>
                                </li>
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Frequency
                                    </p>
                                    <p className="features__block-text">
                                        Fresh content added daily to keep you up to date.
                                    </p>
                                </li>
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Authoritative
                                    </p>
                                    <p className="features__block-text">
                                        Written by our team of tech experts and industry professionals.
                                    </p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
                <div className="features content-dark">
                    <div className="features__container container-center Slot-separator-80">
                        <div className="features__header Separator-header">
                            <img className="features__icon Separator-header-icon" src={FutureInsights}
                                 alt="Ebooks Icon"/>
                            <div className="features__name-caption">
                                <h3 className="features__name Separator-header-name">Research Insights Blogs</h3>
                                <p className="features__caption">Dive deep into future technology concepts with our
                                    research section.</p>
                            </div>
                        </div>
                        <div className="features__main Separator-main">
                            <ul className="features__info-grid">
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Depth
                                    </p>
                                    <p className="features__block-text">
                                        500+ research articles for in-depth understanding.
                                    </p>
                                </li>
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Graphics
                                    </p>
                                    <p className="features__block-text">
                                        Visual aids and infographics to enhance comprehension.
                                    </p>
                                </li>
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Trends
                                    </p>
                                    <p className="features__block-text">
                                        Explore emerging trends in future technology research.
                                    </p>
                                </li>
                                <li className="features__info-block">
                                    <p className="features__block-name">
                                        Contributors
                                    </p>
                                    <p className="features__block-text">
                                        Contributions from tech researchers and academics.
                                    </p>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            </section>
    );
};

export default Futures;
