import React, { useState} from 'react';
import "./Projects.css"



const badgesData = [{id:1, img:"CSS.svg"},{id:2, img:"Angular.svg"},{id:3,img:"Flutter.svg"},{id:4,img:"HTML.svg"},{id:5,img:"React.svg"},{id:6,img:"Variant5.svg"},{id:7,img:"Vue.svg"},{id:8,img:"JavaScript.svg"}];

const projectsData1rus = [
    {href:"#prod", img:"R&D.png", badges:[1,4,5,8], id:"project 5", title:"R&D", description:"Мой первый проект на реакт, ещё и сделанный на заказ которым я горожусь, но только ввиду его маштаба он включает в себя и полноценный сайт на стеке MERN и сервер на Node и даже телеграмм бота, даже был взят сервер ubuntu и домен master34, но на данный момент компания закрыта", date:"2023.06.30", site:"https://github.com/misteryfors/SiteDR"},
    {href:"#prod", img:"WeatherApp.png", badges:[1,8], id:"project 1", title:"Weather-App", description:"Этот проект представляет собой простой сайт с использованием только базовых инструментов HTML, JS и CSS. Выполнено по макету из акселератора опыта Preax. А также добавленно получение данных с WeatheAPI.", date:"2024.10.21", model:"https://www.figma.com/design/60Iap3oS9KpQ6XPuBK8CZ2/Weather-App.-1-sprint.-4-task?node-id=4056-3513&node-type=frame&t=2mTZerPDj5WoYQDM-0",site:"weather-app.html"},
    {href:"#prod", img:"to-do-list.png", badges:[1,4,8], id:"project 2", title:"To-Do-list", description:"Простой to-do лист без адаптива на мобильные устройства, с реализованным и улучшенным drag-and-drop добавлением и редактированием карточек с подлюченным localstorage", date:"2024.10.28", model:"https://www.figma.com/design/0InXcSFs6vm5c01OqQEnNs/Trello-board---auto-layout-cards-(Community)?node-id=5-1008&node-type=frame&t=PELKZ6f8NCrIyM7I-0", site:"to-do-list.html"},
    {href:"#prod", img:"crypto-landing.png", badges:[1,4,8], id:"project 3", title:"Crypto-landing", description:"Основная страница приложения для контроля своего криптовалютного портфеля, с графиками портфолио и подключёнными api", date:"2024.11.07", model:"https://www.figma.com/design/MXBe6O0vYuieKnzRjMQPQI/Figma-UI-kit---Cryptocurrency-Dashboard-V2-(Community)-(Community)?node-id=301-73213&node-type=canvas&t=UKDT1J44BGb7q1LM-0", site:"crypto.html"},
    {href:"#prod", img:"blog-website.png", badges:[1,4,5,8], id:"project 4", title:"Blog-website", description:"Основная страница выполненная на react, с помощью typescript на сборщике vite", date:"2024.12.04", model:"https://www.figma.com/design/Z2tbhTbu3O3EkYPVVnFJTO/AI-Blog-Website-UI-Template---Dark-Theme-%7C-Produce-UI-(Community)?node-id=324-8&node-type=frame&t=yDxX7YETz3dSSpUs-0", site:"blog-website.html"},

    {href:"#prod", img:"to-do-list.png", badges:[1,4,8], id:"project 2", title:"To-Do-list", description:"Простой to-do лист без адаптива на мобильные устройства, с реализованным и улучшенным drag-and-drop добавлением и редактированием карточек с подлюченным localstorage", date:"2024.10.28", model:"https://www.figma.com/design/0InXcSFs6vm5c01OqQEnNs/Trello-board---auto-layout-cards-(Community)?node-id=5-1008&node-type=frame&t=PELKZ6f8NCrIyM7I-0", site:"to-do-list.html"},
    {href:"#prod", img:"crypto-landing.png", badges:[1,4,8], id:"project 3", title:"Crypto-landing", description:"Основная страница приложения для контроля своего криптовалютного портфеля, с графиками портфолио и подключёнными api", date:"2024.11.07", model:"https://www.figma.com/design/MXBe6O0vYuieKnzRjMQPQI/Figma-UI-kit---Cryptocurrency-Dashboard-V2-(Community)-(Community)?node-id=301-73213&node-type=canvas&t=UKDT1J44BGb7q1LM-0", site:"crypto.html"},
    {href:"#prod", img:"blog-website.png", badges:[1,4,5,8], id:"project 4", title:"Blog-website", description:"Основная страница выполненная на react, с помощью typescript на сборщике vite", date:"2024.12.04", model:"https://www.figma.com/design/Z2tbhTbu3O3EkYPVVnFJTO/AI-Blog-Website-UI-Template---Dark-Theme-%7C-Produce-UI-(Community)?node-id=324-8&node-type=frame&t=yDxX7YETz3dSSpUs-0", site:"blog-website.html"},
    {href:"#prod", img:"to-do-list.png", badges:[1,4,8], id:"project 2", title:"To-Do-list", description:"Простой to-do лист без адаптива на мобильные устройства, с реализованным и улучшенным drag-and-drop добавлением и редактированием карточек с подлюченным localstorage", date:"2024.10.28", model:"https://www.figma.com/design/0InXcSFs6vm5c01OqQEnNs/Trello-board---auto-layout-cards-(Community)?node-id=5-1008&node-type=frame&t=PELKZ6f8NCrIyM7I-0", site:"to-do-list.html"},
    {href:"#prod", img:"crypto-landing.png", badges:[1,4,8], id:"project 3", title:"Crypto-landing", description:"Основная страница приложения для контроля своего криптовалютного портфеля, с графиками портфолио и подключёнными api", date:"2024.11.07", model:"https://www.figma.com/design/MXBe6O0vYuieKnzRjMQPQI/Figma-UI-kit---Cryptocurrency-Dashboard-V2-(Community)-(Community)?node-id=301-73213&node-type=canvas&t=UKDT1J44BGb7q1LM-0", site:"crypto.html"},
    {href:"#prod", img:"blog-website.png", badges:[1,4,5,8], id:"project 4", title:"Blog-website", description:"Основная страница выполненная на react, с помощью typescript на сборщике vite", date:"2024.12.04", model:"https://www.figma.com/design/Z2tbhTbu3O3EkYPVVnFJTO/AI-Blog-Website-UI-Template---Dark-Theme-%7C-Produce-UI-(Community)?node-id=324-8&node-type=frame&t=yDxX7YETz3dSSpUs-0", site:"blog-website.html"},
];

const Projects: React.FC = () => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="projects">
            <ul className={showMore ? "projects__list projects__list--show":"projects__list"}>
                {projectsData1rus.map((project) => (
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
                                    <a className="projects__link" target="_blank"
                                       href={project.site !== "none" ? project.site : ""}>
                                        site
                                    </a>
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
