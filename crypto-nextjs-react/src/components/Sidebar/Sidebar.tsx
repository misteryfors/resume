import React from 'react';
import './Sidebar.css'

export const Sidebar = () =>{

    return (
        <aside className="sidebar">
            <div className="sidebar__logo"><img src="./Logo.svg" alt="logo"/>Logoipsm</div>
            <nav className="sidebar__nav-block">
                <a className="sidebar__link"><img className="sidebar__icon" src="./element-3.svg" alt="logo"/>Overview</a>
                <a className="sidebar__link"><img className="sidebar__icon" src="./graph.svg" alt="Chart"/>Chart</a>
                <a className="sidebar__link"><img className="sidebar__icon" src="./wallet-2.svg" alt="Transactions"/>Transactions</a>
                <a className="sidebar__link"><img className="sidebar__icon" src="./wallet-minus.svg" alt="Wallet"/>Wallet</a>
                <a className="sidebar__link"><img className="sidebar__icon" src="./message-text.svg" alt="AboutMe"/>AboutMe</a>
                <a className="sidebar__link"><img className="sidebar__icon" src="./sms.svg" alt="Mail"/>Mail Box</a>
            </nav>
            <div className="sidebar__buttons-block">
                <button className="sidebar__button"><img className="sidebar__icon" src="./setting-2.svg" alt="Setting"/>Setting
                </button>
                <button className="sidebar__button"><img className="sidebar__icon" src="./logout.svg" alt="Logout"/>Logout
                </button>
            </div>
        </aside>
    )
}