import React from 'react';
import BlockHeader from "../components/Block-header/Block-header.tsx";

const Podcasts: React.FC = () => {
    return (
        <div className={"content-block"}>

            <div className={"content-block"}>
                <BlockHeader
                    quote="Stay Informed with Fresh Content"
                    name="Latest Podcast Episodes">
                </BlockHeader>
            </div>
        </div>

    );
};

export default Podcasts;
