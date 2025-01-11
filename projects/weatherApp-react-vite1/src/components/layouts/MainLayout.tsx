import './MainLayout.scss'
import Header from "../header/Header.tsx";

import React from "react";
import Footer from "../footer/Footer.tsx";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return(
        <div className="content">
            <Header/>
            <main>
                {children}
            </main>
            <Footer/>
        </div>
    )
}

export default MainLayout;