import { createItem } from "./itemFactory.js";
import {listsData} from "./lists-load.js";

export const initializeEditForItem = (item) => {
    const editButton = item.querySelector(".item__edit");
    const saveButton = item.querySelector(".item__save");
    const deleteButton = item.querySelector(".item__delete");

    if (editButton) {
        editButton.addEventListener("click", () => editItem(item));
    }
    if (saveButton) {
        saveButton.addEventListener("click", () => saveEditedItem(item));
    }
    if (deleteButton) {
        deleteButton.addEventListener("click", () => deleteItem(item));
    }
};


function editItem(item) {
    const listBlock = item.parentNode?.parentNode?.querySelector(".list__block");
    if (!listBlock) {
        console.error("Не удалось найти listBlock.");
        return;
    }

    const tagElement = item.querySelector('[class^="item__tag--"]');
    const tag = tagElement ? tagElement.textContent.trim() : '';

    const text = item.querySelector('.item__text')?.textContent.trim() || '';

    const dateElement = item.querySelector('.item__date');
    const timeElement = item.querySelector('.item__time');

    const dateText = dateElement?.textContent.trim();
    const timeText = timeElement?.textContent.trim() || '00:00';

    // Формируем строку даты в ISO формате для корректного преобразования
    const [day, month, year] = dateText.split(' ');
    const monthMap = {
        'янв.': '01', 'февр.': '02', 'мар.': '03', 'апр.': '04',
        'май': '05', 'июн.': '06', 'июл.': '07', 'авг.': '08',
        'сент.': '09', 'окт.': '10', 'нояб.': '11', 'дек.': '12'
    };
    const isoDate = `${year}-${monthMap[month] || '01'}-${day.padStart(2, '0')}T${timeText}`;

    const fullDate = new Date(isoDate);

    const input = createItem({
        tag: tag,
        text: text,
        date: fullDate,
        edit: true
    });

    listBlock.replaceChild(input, item);
}

function saveEditedItem(editableItem) {
    const listBlock = editableItem.parentNode;

    // Получаем обновлённые данные из полей ввода
    const tag = editableItem.querySelector(".item__tag").value;
    const text = editableItem.querySelector(".item__text").value;
    const dateInputValue = editableItem.querySelector(".item__date-time").value;
    const date = dateInputValue ? new Date(dateInputValue) : new Date();

    // Создаём объект элемента с обновлёнными данными
    const updatedItemData = {
        tag: tag,
        text: text,
        date: date
    };

    // Определяем список по data-type
    const listType = editableItem.closest(".list").getAttribute("data-type");
    const listArray = listsData[listType];

    // Находим индекс элемента в массиве
    const itemIndex = Array.from(listBlock.children).indexOf(editableItem);
    if (itemIndex > -1) {
        // Заменяем элемент в массиве
        listArray[itemIndex] = updatedItemData;
    } else {
        console.error("Элемент не найден в списке.");
        return;
    }

    // Создаём обновлённый элемент с помощью createItem
    const updatedItemElement = createItem(updatedItemData);
    listBlock.replaceChild(updatedItemElement, editableItem);

    console.log(listsData);
    localStorage.setItem("listsData", JSON.stringify(listsData));
}
function deleteItem(deletedItem) {

    const listType = deletedItem.closest(".list").getAttribute("data-type");
    const sourceList = listsData[listType];
    const itemIndex = Array.from(deletedItem.parentNode.children).indexOf(deletedItem);
    sourceList.splice(itemIndex, 1);

    console.log(listsData);
    const listBlock = deletedItem.parentNode;
    listBlock.removeChild(deletedItem);
    localStorage.setItem("listsData", JSON.stringify(listsData));
}

