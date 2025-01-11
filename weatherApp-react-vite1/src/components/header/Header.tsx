import './Header.scss';
import React, {useState} from "react";
import {Link} from "react-router-dom";

const Header:React.FC=()=>{
    const [input,setInput]=useState('');
    const [isTyping,setIsTyping]=useState(false);
    const [isFilled,setIsFilled]=useState(false);

    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const value=event.target.value;
        setInput(value);
        setIsTyping(value!=='');
    }
    const handleBlur=()=>{
        setIsFilled(input!=='');
        setIsTyping(false)
    }

    return(
        <header className="header">
            <h1 className="header__title">Погода в вашем городе</h1>
            <Link className="header__logo" to="/">
                <div className="header__logo-img"></div>
            </Link>
            <form className="header__search" onSubmit={(event) => event.preventDefault()}>
                <input value={input}
                       className={`header__search-input${isTyping ? ' header__search-input--typing' : ''}${isFilled ? ' header__search-input--filled' : ''}`}
                       placeholder="Поиск по городу" onChange={handleChange} onBlur={handleBlur}/>
                <button className={`header__search-button${input ? ' header__search-button--alt' : ''}`}
                        onClick={() => setInput('')}></button>
            </form>
        </header>
    )
}

export default Header;



