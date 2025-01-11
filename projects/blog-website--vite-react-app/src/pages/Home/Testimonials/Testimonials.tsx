import React from 'react';
import BlockHeader from '../../../components/Block-header/Block-header';
import './Testimonials.css';
import { ReactComponent as Shape } from '../../../assets/Shape.svg';
import ProfileImage from "../../../assets/Profile.png";

interface Testimonial {
    img: string;
    name: string;
    bio: string;
    comment: string;
}

const Testimonials: React.FC = () => {

    const testimonials: Testimonial[] = [
        {
            img: ProfileImage,
            name: "Sarah Thompson",
            bio: "San Francisco, USA",
            comment: "The ebooks on AI in education have been a game-changer for my research. They provide in-depth insights and case studies that are invaluable for staying updated.",
        },
        {
            img: ProfileImage,
            name: "Raj Patel",
            bio: "Mumbai, India",
            comment: "The whitepapers on renewable energy strategies have greatly influenced my work. They offer detailed data and analysis, helping me make informed decisions."
        },
        {
            img: ProfileImage,
            name: "Emily Adams",
            bio: "London, UK",
            comment: "The AI in healthcare reports have been an essential resource for our hospital. They highlight the latest innovations and best practices, improving patient care."
        },
        {
            img: ProfileImage,
            name: "Alan Jackson",
            bio: "Houston, USA",
            comment: "The reports on space mining prospects have fueled my passion for space exploration. They provide a comprehensive view of what lies beyond Earth."        },
        {
            img: ProfileImage,
            name: "Jessica Miller",
            bio: "Boston, USA",
            comment: "The research papers on genomic breakthroughs have been a goldmine of information. They've shaped the direction of my research in genomics."
        },
        {
            img: ProfileImage,
            name: "Diego Lopez",
            bio: "Barcelona, Spain",
            comment: "The ebooks on renewable energy strategies have given me the insights I needed to pivot our startup toward sustainability."
        },
    ];

    // Функция для группировки массива на подмассивы по 3 элемента
    const chunkArray = (array: Testimonial[], size: number) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    const groupedTestimonials = chunkArray(testimonials, 3);

    return (
        <section className="content__block">
            <BlockHeader
                quote="What Our Readers Say"
                name="Real Words from Real Readers"
                link="ccc"
                linkText="View All Testimonials"
            />
            {groupedTestimonials.map((group, groupIndex) => (
                <div className="testimonials content-dark" key={groupIndex}>
                    <ul className="container-center Slot-separator-50">
                        {group.map((testimonial, index) => (

                            <li className="testimonials__testimonial" key={index}>
                                <div className="testimonials__person">
                                    <img
                                        src={testimonial.img}
                                        alt={testimonial.name}
                                        className="testimonials__person-photo"
                                    />
                                    <p className="testimonials__person-info">
                                                    <span
                                                        className="testimonials__person-name">{testimonial.name}</span>
                                        <span className="testimonials__person-bio">{testimonial.bio}</span>
                                    </p>
                                </div>
                                <div className="testimonials__comment">
                                    <div className="testimonials__rating">
                                        {[...Array(5)].map((_, index) => (
                                            <Shape
                                                key={index}
                                                className="testimonials__rating-icon Icon-medium"
                                                aria-label={`Star ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <p className="testimonials__comment-text ">
                                        {testimonial.comment}
                                    </p>
                                </div>
                            </li>


                        ))}
                    </ul>
                </div>
            ))}

        </section>
    );
};

export default Testimonials;
