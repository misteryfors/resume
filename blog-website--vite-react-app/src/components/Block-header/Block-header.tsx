import React from 'react';
import './block-header.css';
import { ReactComponent as Logo } from '../../assets/Short-logo.svg';
import '../Link/Link-button.css'
import LinkButton from "../Link/Link-button.tsx";

const BlockHeader: React.FC<{ quote: string; name: string; caption?:string; altCaption?:string; link?: string; linkText?: string; children?: React.ReactNode; logo?:boolean; buttons?:string[]}> = ({ quote, name, caption, altCaption, link, linkText, children, logo, buttons }) => (
    <div className="block-header content-light">
        <div className="block-header__container container-between">
        <div className="block-header__main-container">
            {logo && <span className="block-header__logo"><Logo/></span>}
            <p className="block-header__text">
                <p className="block-header__quote-name">
                    <span className="block-header__quote-altLogo">
                        {logo && <span className="block-header__altLogo"><Logo/></span>}
                        {<span className="block-header__quote">{quote}</span> }
                    </span>
                    <h2 className="block-header__name">{name}</h2>
                </p>
                {caption && (<span className="block-header__caption">{caption}</span>)}
                {altCaption && (<span className="block-header__altCaption">{altCaption}</span>)}
            </p>
            {link && linkText && (<LinkButton link={link} linkText={linkText} size="medium" theme="dark"/>)}
            {buttons &&
                <div className="block-header__buttons">
                    {buttons.map((button, index) => (
                        <button key={index} className="block-header__button">{button}</button>
                    ))}
                </div>
            }
        </div>
        {children && <div className="block-header__extra-content container-between">{children}</div>}
        </div>
    </div>
);

export default BlockHeader;
