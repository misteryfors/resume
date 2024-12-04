import { initializeDragAndDropForItem } from './draganddrop.js';
import {initializeEditForItem} from "./edit.js";

export const createItem = ({ tag, text, date, edit }) => {
    const now = Date.now();
    console.log(date);
    const isOverdue = new Date(date).getTime() <= now;
    const tagClass = {
        "low priority": "low-priority",
        "medium priority": "medium-priority",
        "high priority": "high-priority",
        "highest priority": "highest-priority"
    }[tag] || "low-priority";

    const item = document.createElement("li");
    item.className = "list__item item";
    item.draggable = true;
    edit ?

        item.innerHTML = `
             <select class="item__tag">
                <option value="low priority" ${tag === "low priority" ? "selected" : ""}>low priority</option>
                <option value="medium priority" ${tag === "medium priority" ? "selected" : ""}>medium priority</option>
                <option value="high priority" ${tag === "high priority" ? "selected" : ""}>high priority</option>
                <option value="highest priority" ${tag === "highest priority" ? "selected" : ""}>highest priority</option>
            </select>
            <input class="item__text" value="${text || ""}">
            <input type="datetime-local" class="item__date-time" value="${date ? date.toISOString().slice(0, 16) : ""}">
            <button class="item__save">Сохранить</button>
        `

        :
            item.innerHTML =`
        <p class="item__tag--${tagClass}">${tag}</p>
        <p class="item__text">${text}</p>
        <p class="item__date-time${isOverdue ? "--overdue" : "--not-overdue"}">
            <span class="item__date">${new Date(date).toLocaleDateString('ru-RU', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            ${new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false }) !== "00:00"
        ? `<span class="item__time">${new Date(date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', hour12: false })}</span>`
        : ""}
        </p>
        <button class="item__edit"></button>
        <button class="item__delete"></button>
        `

    initializeEditForItem(item);
    // Индивидуальная инициализация drag-and-drop для item
    initializeDragAndDropForItem(item);

    return item;
};
