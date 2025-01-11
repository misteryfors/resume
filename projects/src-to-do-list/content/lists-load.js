const defaultData = {
    toDo: [
        { tag: "low priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", date: "2025-11-29T00:00+03:00" },
        { tag: "medium priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2022-03-29T23:29+03:00" },
        { tag: "high priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2023-04-29T00:00+03:00" },
        { tag: "highest priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2024-05-29T00:00+03:00" },
    ],
    inProgress: [
        { tag: "low priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2021-06-29T00:00+03:00" },
        { tag: "medium priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2022-07-29T00:00+03:00" },
        { tag: "high priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2023-08-29T00:00+03:00" },
        { tag: "highest priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2024-09-29T00:00+03:00" },
    ],
    Completed: [
        { tag: "low priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2025-10-29T00:00+03:00" },
        { tag: "medium priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2026-11-29T00:00+03:00" },
        { tag: "high priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2027-12-29T00:00+03:00" },
        { tag: "highest priority", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.", date: "2028-01-29T00:00+03:00" },
    ]
};

export const listsData = JSON.parse(localStorage.getItem("listsData")) || defaultData;


import { setupListsDragAndDrop } from './draganddrop.js';
import { setupCreate } from './create.js';
import { createItem } from './itemFactory.js';

const now = Date.now();
const tagList = {
    "low priority": "low-priority",
    "medium priority": "medium-priority",
    "high priority": "high-priority",
    "highest priority": "highest-priority"
};

const isOverdue = (dateStr) => new Date(dateStr).getTime() <= now;

const formatDate = (dateStr, options) => new Date(dateStr).toLocaleDateString('ru-RU', options);

export const renderLists = (listsData) => {
    const listsContainer = document.querySelector(".lists");

    for (const [listName, items] of Object.entries(listsData)) {
        const list = document.createElement("section");
        list.className = "lists__list list";
        list.id = listName.toLowerCase();

        // Устанавливаем data-type с именем списка
        list.setAttribute("data-type", listName);

        list.innerHTML = `
            <p class="list__name">${listName.replace(/([A-Z])/g, ' $1').trim()}</p>
            <ul class="list__block"></ul>
            <div class="list__button-block">
                <button class="list__add-button">Добавить карточку</button>
                <button class="list__no-button hidden">X</button>
                <button class="list__yes-button hidden">Добавить карточку</button>
            </div>
        `;

        const listBlock = list.querySelector(".list__block");
        items.forEach(itemData => {
            const itemElement = createItem(itemData);
            listBlock.appendChild(itemElement);
        });

        listsContainer.appendChild(list);
    }
    setupCreate();
    setupListsDragAndDrop();
};



renderLists(listsData);