import React from 'react';
import Header from "../components/Header/Header.tsx";
import Footer from "../components/Footer/Footer.tsx";

interface MainLayoutProps {
    children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};


export default MainLayout;
