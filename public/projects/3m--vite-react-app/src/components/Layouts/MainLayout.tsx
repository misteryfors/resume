import React from 'react';
import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import '../../styles/components/MainLayout.scss'

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {


    return (
        <div className="Layout">
            <div className="Layout__content">
                <Header />
                <section className="Layout__scroll-section">
                    <main className="Layout__main">{children}</main>
                </section>
                <Footer />
            </div>
        </div>
    );
};


export default MainLayout;
