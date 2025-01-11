import React from 'react';
import { Link } from 'react-router-dom';
import './Link-button.css';
import { ReactComponent as LinkArrow } from '../../assets/Link-arrow.svg';
import { ReactComponent as LinkEye } from '../../assets/Link-eye.svg';

interface LinkButtonProps {
    link: string;
    linkText?: string;
    size: 'big' | 'medium' | 'small';
    theme?: 'light' | 'dark';
    altIcon?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, linkText, size, theme, altIcon }) => {
    const linkClasses = `Link Link--${size} Link--${theme}`;
    const iconClasses = `Link__arrow Icon-${size =='big' ? 'medium':size}`;

    return (
        linkText ?
        <Link to={link} className={linkClasses}>
            {linkText}
            {altIcon ?
                <LinkEye className={iconClasses}/>
                :
                <LinkArrow className={iconClasses} />
            }
        </Link>
        :
        <Link to={link} className="Link--short">
            <LinkArrow className={iconClasses} />
        </Link>
    );
};

export default LinkButton;
