import {listsData} from "./lists-load.js";

let ghostClone = null;
let insertClone = null;

export const initializeDragAndDropForItem = (item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);
};

export const setupListsDragAndDrop = () => {
    document.querySelectorAll(".lists__list.list").forEach(list => {
        list.addEventListener("dragover", handleDragOver);
        list.addEventListener("drop", handleDrop);
    });
};


function handleDragStart(event) {
    const item = event.target;

    // Убираем стандартное изображение перетаскивания
    event.dataTransfer.setDragImage(new Image(), 0, 0);

    // Создаем кастомные клоны
    createGhostClone(event, item);
    createInsertClone(item);

    // Устанавливаем таймер для добавления класса dragging
    const draggingTimeout = setTimeout(() => {
        item.style.display = 'none';
        item.classList.add("dragging");
        insertClone.style.display = 'block';
    }, 0); // Задержка 0, чтобы начать анимацию после вызова

    document.addEventListener("dragover", moveGhostClone);
}

function handleDragEnd(event) {
    cleanupClones();

    // Восстанавливаем стиль элемента после завершения перетаскивания
    const item = event.target;
    item.style.width = "";
    item.style.height = "";
    item.style.display = "flex";
    item.classList.remove("dragging");

    document.removeEventListener("dragover", moveGhostClone);
}

function createGhostClone(event, item) {
    if (!ghostClone) {
        ghostClone = item.cloneNode(true);
        ghostClone.classList.add("ghost");
        setElementStyle(ghostClone, item, event);
        document.body.appendChild(ghostClone);
    }
}

function setElementStyle(element, referenceItem, event) {
    Object.assign(element.style, {
        position: "absolute",
        pointerEvents: "none",
        width: `${referenceItem.offsetWidth}px`,
        height: `${referenceItem.offsetHeight}px`,
        opacity: "0.8",
        left: `${event.pageX - 150}px`,
        top: `${event.pageY}px`,
    });
}

function createInsertClone(item) {
    if (!insertClone) {
        insertClone = item.cloneNode(true);
        insertClone.style.display = "none";
        insertClone.style.width = `${item.offsetWidth}px`;
        insertClone.style.height = `${item.offsetHeight}px`;
        insertClone.classList.add("insert-placeholder");
    }
}

function cleanupClones() {
    if (ghostClone?.parentNode) ghostClone.parentNode.removeChild(ghostClone);
    if (insertClone?.parentNode) insertClone.parentNode.removeChild(insertClone);
    ghostClone = null;
    insertClone = null;
}

function moveGhostClone(event) {
    if (ghostClone) {
        ghostClone.style.left = `${event.pageX - 150}px`;
        ghostClone.style.top = `${event.pageY}px`;
    }
}

function handleDragOver(event) {
    event.preventDefault();
    const listBlock = event.currentTarget.querySelector(".list__block");
    const afterElement = getDragAfterElement(listBlock, event.clientY);

    if (listBlock.children.length === 0 || afterElement == null) {
        listBlock.appendChild(insertClone);
    } else {
        listBlock.insertBefore(insertClone, afterElement);
    }
}

function handleDrop(event) {
    event.preventDefault();
    const draggingItem = document.querySelector(".item.dragging");
    if (draggingItem && insertClone && insertClone.parentNode) {
        // Найдем исходный и целевой списки
        const sourceListType = draggingItem.closest(".list").getAttribute("data-type");
        const targetListType = insertClone.closest(".list").getAttribute("data-type");

        // Удалим элемент из исходного списка данных
        const sourceList = listsData[sourceListType];
        const itemIndex = Array.from(draggingItem.parentNode.children).indexOf(draggingItem);
        const [movedItem] = sourceList.splice(itemIndex, 1);

        // Вставим элемент в целевой список данных
        const targetList = listsData[targetListType];
        const insertIndex = Array.from(insertClone.parentNode.children).indexOf(insertClone);
        targetList.splice(insertIndex, 0, movedItem);
        console.log(listsData);
        localStorage.setItem("listsData", JSON.stringify(listsData));
        // Обновим DOM
        insertClone.parentNode.replaceChild(draggingItem, insertClone);
    }
    cleanupClones();
}


function getDragAfterElement(container, y) {
    return [...container.querySelectorAll(".item:not(.dragging)")].reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        return offset < 0 && offset > closest.offset ? { offset, element: child } : closest;
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}
