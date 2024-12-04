const badgesData = [{id:1, img:"CSS.svg"},{id:2, img:"Angular.svg"},{id:3,img:"Flutter.svg"},{id:4,img:"HTML.svg"},{id:5,img:"React.svg"},{id:6,img:"Variant5.svg"},{id:7,img:"Vue.svg"},{id:8,img:"Javascript.svg"}];
const projectsData1eng = [
    {href:"#prod", img:"Desktop (1600 px).png", badges:[1,4,8], num:"project 1", title:"Weather-App", description:"This project is a simple website using only basic HTML, JS and CSS tools. Based on a layout from the Preax experience accelerator. And also added receiving data from WeatheAPI.", date:"2024.10.21", model:"https://www.figma.com/design/60Iap3oS9KpQ6XPuBK8CZ2/Weather-App.-1-sprint.-4-task?node-id=4056-3513&node-type=frame&t=2mTZerPDj5WoYQDM-0",site:"weather-app.html"},
    {href:"#prod", img:"to-do-list.png", badges:[1,4,8], num:"project 2", title:"To-Do-list", description:"A simple to-do sheet without adaptation to mobile devices, with implemented and improved drag-and-drop adding and editing cards with connected localstorage", date:"2024.10.28", model:"https://www.figma.com/design/0InXcSFs6vm5c01OqQEnNs/Trello-board---auto-layout-cards-(Community)?node-id=5-1008&node-type=frame&t=PELKZ6f8NCrIyM7I-0", site:"to-do-list.html"},
    {href:"#prod", img:"crypto-landing.png", badges:[1,4,8], num:"project 3", title:"Crypto-landing", description:"The main page of the application for monitoring your cryptocurrency portfolio, with portfolio charts and connected api", date:"2024.11.07", model:"https://www.figma.com/design/MXBe6O0vYuieKnzRjMQPQI/Figma-UI-kit---Cryptocurrency-Dashboard-V2-(Community)-(Community)?node-id=301-73213&node-type=canvas&t=UKDT1J44BGb7q1LM-0", site:"crypto.html"},
    ];
const projectsData1rus = [
    {href:"#prod", img:"Desktop (1600 px).png", badges:[1,8], num:"project 1", title:"Weather-App", description:"Этот проект представляет собой простой сайт с использованием только базовых инструментов HTML, JS и CSS. Выполнено по макету из акселератора опыта Preax. А также добавленно получение данных с WeatheAPI.", date:"2024.10.21", model:"https://www.figma.com/design/60Iap3oS9KpQ6XPuBK8CZ2/Weather-App.-1-sprint.-4-task?node-id=4056-3513&node-type=frame&t=2mTZerPDj5WoYQDM-0",site:"weather-app.html"},
    {href:"#prod", img:"to-do-list.png", badges:[1,4,8], num:"project 2", title:"To-Do-list", description:"Простой to-do лист без адаптива на мобильные устройства, с реализованным и улучшенным drag-and-drop добавлением и редактированием карточек с подлюченным localstorage", date:"2024.10.28", model:"https://www.figma.com/design/0InXcSFs6vm5c01OqQEnNs/Trello-board---auto-layout-cards-(Community)?node-id=5-1008&node-type=frame&t=PELKZ6f8NCrIyM7I-0", site:"to-do-list.html"},
    {href:"#prod", img:"crypto-landing.png", badges:[1,4,8], num:"project 3", title:"Crypto-landing", description:"Основная страница приложения для контроля своего криптовалютного портфеля, с графиками портфолио и подключёнными api", date:"2024.11.07", model:"https://www.figma.com/design/MXBe6O0vYuieKnzRjMQPQI/Figma-UI-kit---Cryptocurrency-Dashboard-V2-(Community)-(Community)?node-id=301-73213&node-type=canvas&t=UKDT1J44BGb7q1LM-0", site:"crypto.html"},
    {href:"#prod", img:"blog-website.png", badges:[1,4,5,8], num:"project 4", title:"Blog-website", description:"Основная страница выполненная на react, с помощью typescript на сборщике vite", date:"2024.12.04", model:"https://www.figma.com/design/Z2tbhTbu3O3EkYPVVnFJTO/AI-Blog-Website-UI-Template---Dark-Theme-%7C-Produce-UI-(Community)?node-id=324-8&node-type=frame&t=yDxX7YETz3dSSpUs-0", site:"blog-website.html"},
];

function renderBadges(badgeIds) {
    return badgeIds.map(badgeId => {
        const badge = badgesData.find(b => b.id === badgeId);
        return badge ? `<img class="project__badge" src="./src/public/badges/${badge.img}" alt="Badge">` : '';
    }).join('');
}

const renderprojects = (projectsData,list) => {
    console.log(list);
    const fragment = document.createDocumentFragment();
    projectsData.forEach(projectData => {
        let project = document.createElement('li');
        project.className = "project";
        project.innerHTML = `
            <img class="project__img" src="${"src/public/"+projectData.img}" alt="Изображение проекта">
            <div class="project__overlay">
                <span class="project__name-title">${projectData.title}</span>
                <div class="project__badges">
                    ${renderBadges(projectData.badges)}
                </div>
            </div>  
            <div class="project__description">
            <p class="project__description-text">${projectData.description}</p>
            <p class="project__description-text">${projectData.date !== "none" ? projectData.date : "none"}</p>
            <div class="project__links-block">
                <a class="project__link" href="${projectData.model !== "none" ? projectData.model : ""}">
                maket
                </a>
                <a class="project__link" href="${projectData.site !== "none" ? projectData.site : ""}">
                site
                </a>
                </div>
        `;
        fragment.appendChild(project);
        
    });
    list.appendChild(fragment);
}

let projectsBlock1 = document.querySelector("#ContentProject");
//let projectsBlock2 = document.querySelector("#CurrentProjects");
renderprojects(projectsData1rus,projectsBlock1);
//renderprojects(projectsData2eng,projectsBlock2);