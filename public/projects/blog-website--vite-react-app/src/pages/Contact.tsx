import React from 'react';
import BlockHeader from "../components/Block-header/Block-header.tsx";

const Contact: React.FC = () => {
    return (
        <div className={"content-block"}>

            <div className={"content-block"}>
                <BlockHeader
                    quote="Welcome to Our AboutMe Hub"
                    name="Discover the World of Headlines"
                    link="ccc" linkText="View All AboutMe">
                </BlockHeader>
            </div>
            <div className={"content-block"}>
                <BlockHeader
                    quote="Featured Videos"
                    name="Visual Insights for the Modern Viewer"
                    link="ccc" linkText="View All">
                </BlockHeader>
            </div>
        </div>

    );
};

export default Contact;
