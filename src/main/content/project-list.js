const badgesData = [{id:1, img:"CSS.svg"},{id:2, img:"Angular.svg"},{id:3,img:"Flutter.svg"},{id:4,img:"HTML.svg"},{id:5,img:"React.svg"},{id:6,img:"Variant5.svg"},{id:7,img:"Vue.svg"}];
const projectsData1eng = [
    {href:"#prod", img:"Desktop (1600 px).png", badges:[1,4], num:"project 1", title:"Weather-App", description:"This project is a simple website using only basic HTML, JS and CSS tools. Based on a layout from the Preax experience accelerator. And also added receiving data from WeatheAPI.", date:"2024.10.21", model:"https://www.figma.com/design/60Iap3oS9KpQ6XPuBK8CZ2/Weather-App.-1-sprint.-4-task?node-id=4056-3513&node-type=frame&t=2mTZerPDj5WoYQDM-0",site:"weather-app.html"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"}, 
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"}, 
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none" ,model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"} 
];
const projectsData1rus = [
    {href:"#prod", img:"Desktop (1600 px).png", badges:[1,4], num:"project 1", title:"Weather-App", description:"Этот проект представляет собой простой сайт с использованием только базовых инструментов HTML, JS и CSS. Выполнено по макету из акселератора опыта Preax. А также добавленно получение данных с WeatheAPI.", date:"2024.10.21", model:"https://www.figma.com/design/60Iap3oS9KpQ6XPuBK8CZ2/Weather-App.-1-sprint.-4-task?node-id=4056-3513&node-type=frame&t=2mTZerPDj5WoYQDM-0",site:"weather-app.html"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"}, 
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"}, 
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none" ,model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"} 
];
const projectsData2eng = [
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none" ,model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"} 
];
const projectsData2rus = [
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none" ,model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"},
    {href:"#prod", img:"project-1.png", badges:[1,4], num:"project later", title:"project later", description:"This project will appear later.", date:"none", model:"none", site:"none"} 
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
        project.className = "projects__project project";
        project.innerHTML = `
            <div class="project">
                <div class="project__card">
                    <img class="project__img" src="${"src/public/"+projectData.img}">
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
                        <a class="project__button" href="${projectData.model !== "none" ? projectData.model : ""}">
                        maket
                        </a>
                        <a class="project__button" href="${projectData.site !== "none" ? projectData.site : ""}">
                        site
                        </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        fragment.appendChild(project);
        
    });
    list.appendChild(fragment);
}

let projectsBlock1 = document.querySelector("#ContentProject");
let projectsBlock2 = document.querySelector("#CurrentProjects");
renderprojects(projectsData1rus,projectsBlock1);
renderprojects(projectsData2eng,projectsBlock2);