import { initializeDragAndDropForItem } from './draganddrop.js';
import { listsData } from "./lists-load.js";
import { createItem } from "./itemFactory.js";

export const setupCreate = () => {
    document.querySelectorAll(".list__add-button").forEach(button => {
        button.addEventListener("click", () => {
            const list = button.closest(".list");
            const listBlock = list.querySelector(".list__block");

            const input = document.createElement("input");
            input.className = "list__input input";
            listBlock.appendChild(input);

            list.querySelector(".list__no-button").classList.remove("hidden");
            list.querySelector(".list__yes-button").classList.remove("hidden");
            button.classList.add("hidden");

            input.focus();
        });
    });

    document.querySelectorAll(".list__no-button").forEach(button => {
        button.addEventListener("click", () => {
            const list = button.closest(".list");
            const listBlock = list.querySelector(".list__block");
            const input = list.querySelector(".list__input");

            if (input) listBlock.removeChild(input);

            list.querySelector(".list__add-button").classList.remove("hidden");
            list.querySelector(".list__yes-button").classList.add("hidden");
            button.classList.add("hidden");
        });
    });

    document.querySelectorAll(".list__yes-button").forEach(button => {
        button.addEventListener("click", () => {
            const list = button.closest(".list");
            const listBlock = list.querySelector(".list__block");
            const input = list.querySelector(".list__input");

            if (input.value !== "") {
                const now = Date.now();
                const formatDate = (dateStr, options) => new Date(dateStr).toLocaleDateString('ru-RU', options);

                const item = {
                    tag: "low priority",
                    text: input.value.trim() || "New Item",
                    date: new Date().toISOString()
                };

                const itemElement = createItem(item);
                listBlock.replaceChild(itemElement, input);

                // Получаем тип списка из класса и добавляем элемент в соответствующий массив
                const listType = list.dataset.type;  // предполагаем, что у списка есть data-type
                if (listType && listsData[listType]) {
                    listsData[listType].push(item);
                } else {
                    console.warn("Неизвестный тип списка:", listType);
                }
                console.log(listsData);
                localStorage.setItem("listsData", JSON.stringify(listsData));
            } else {
                listBlock.removeChild(input);
            }

            list.querySelector(".list__add-button").classList.remove("hidden");
            list.querySelector(".list__no-button").classList.add("hidden");
            button.classList.add("hidden");
        });
    });
};
