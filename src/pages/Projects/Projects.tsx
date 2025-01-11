import React, { useState} from 'react';
import "./Projects.css"
import {Link} from "react-router-dom";
import projectsData from "../../../public/projects/projectsData.json"; // Путь к данным проектов



const badgesData = [{id:1, img:"CSS.svg"},{id:2, img:"Angular.svg"},{id:3,img:"Flutter.svg"},{id:4,img:"HTML.svg"},{id:5,img:"React.svg"},{id:6,img:"Variant5.svg"},{id:7,img:"Vue.svg"},{id:8,img:"JavaScript.svg"},{id:9,img:"Tailwind.svg"},{id:10,img:"NextJS.svg"},{id:11,img:"TypeScript.svg"}];

const Projects: React.FC = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="projects">
            <ul className={showMore ? "projects__list projects__list--show":"projects__list"}>
                {projectsData.map((project) => (
                    <li key={project.id} className="projects__project">
                        <div className={"content-block"}>
                            <img className="projects__img" src={"./projects/" + project.img} alt="Изображение проекта"/>
                            <div className="projects__overlay">
                                <span className="projects__name-title">{project.title}</span>
                                <div className="projects__badges">
                                    {project.badges.map((badgeId) => {
                                        const badge = badgesData.find(b => b.id === badgeId);
                                        return (
                                            badge && (
                                                <img
                                                    key={"bage " + badge.id}
                                                    className="projects__badge"
                                                    src={`./badges/${badge.img}`}
                                                    alt={`Badge: ${badge.img}`}
                                                />
                                            )
                                        );
                                    })}
                                </div>
                            </div>
                            <div className="projects__description">
                                <p className="projects__description-text">{project.description}</p>
                                <p className="projects__description-date">{project.date !== "none" ? project.date : "none"}</p>
                                <div className="projects__links-block">
                                    <a className="projects__link" target="_blank"
                                       href={project.model !== "none" ? project.model : ""}>
                                        maket
                                    </a>
                                    <Link className="projects__link"
                                       to={project.site !== undefined ? "/Projects/" + project.site : project.direct+""}>
                                        site
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <button className="projects__show-more" onClick={() => setShowMore(!showMore)}>
                {showMore ? "Show Less" : "Show More"}
            </button>
        </div>

    );
};

export default Projects;
