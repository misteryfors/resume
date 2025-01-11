import React from 'react';
import BlockHeader from "../components/Block-header/Block-header.tsx";

const Resources: React.FC = () => {
    return (
        <div className={"content-block"}>

            <div className={"content-block"}>
                <BlockHeader
                    quote="Dive into the Details"
                    name="In-Depth Reports and Analysis"
                    buttons={["Whitepapers","Ebooks","Reports"]}>
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

export default Resources;
