import { GetAllData } from "../../getAllData.js";
import { graphRender } from "./slider-graph-render.js";




export async function sliderRender(data,slider,storage) {
    console.log(data);
    const leftButton= document.querySelector('.slider__left-button');
    const rightButton= document.querySelector('.slider__right-button');


    let itemSizes = [];
    let currentItemIndex = 0;
    leftButton.disabled = true;
    rightButton.disabled = false;
    // Генерация HTML для слайдера, включая иконки, названия и графики
    slider.innerHTML = storage.map(coin => `
        <div class="slider__list-item">
            <img class="slider__item-icon" src="${data[coin.id].image}">
            <p class="slider__item-name">
                <span class="slider__item-name--full">${data[coin.id].name}</span>
                <span class="slider__item-name--short">${coin.id}</span>
            </p>
            <div class="slider__item-arrow-block">
                <img class="slider__item-arrow" id="${coin.id}-arrow" src="src-crypto/public/price-arrow-up.svg">
            </div>
            <p class="slider__item-price">
                <span class="slider__item-price--current" id="${coin.id}-price"></span>
                <span class="slider__item-price--different-up" id="${coin.id}-change"></span>
            </p>
            <div class="slider__item-graph">
                <canvas id="${coin.id}-graph"></canvas>
            </div>
        </div>
    `).join("");

    Array.from(slider.children).forEach(item => {
        itemSizes.push(item.getBoundingClientRect().width + 30);
    });

    // Функция для получения данных и рендера графика и текущей цены
    async function fetchDataAndRender(coin) {
        try {
            const response = await fetch(
                `https://data-api.cryptocompare.com/index/cc/v1/historical/hours?market=cadli&instrument=${coin}-USD&limit=12&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&api_key=05d2a4b81b64c727e7cdd2efd17cf59fa181c65fca458ee56edb6271020a4ee1`
            );
            const data = await response.json();

            if (data && data.Data && data.Data.length > 0) {
                // Получаем последнее значение закрытия как текущую цену
                const currentPrice = data.Data[data.Data.length - 1].CLOSE;
                const previousPrice = data.Data[data.Data.length - 3].CLOSE;


                // Вычисляем изменение цены
                const priceChange = ((currentPrice - previousPrice) / previousPrice * 100).toFixed(3);

                // Обновляем элементы DOM для текущей цены и изменения
                const arrow = document.getElementById(`${coin}-arrow`);

                const price = document.getElementById(`${coin}-price`);
                let formattedPrice = `$${currentPrice.toString().slice(0, 7)}`;
                if (formattedPrice.endsWith('.')) {
                    formattedPrice = formattedPrice.slice(0, -1);
                }
                price.innerText = formattedPrice;

                const change = document.getElementById(`${coin}-change`);
                change.innerText = `${priceChange}%`;

                if (priceChange<0)
                {
                    change.className="slider__item-price--different-down";
                    arrow.src="src-crypto/public/price-arrow-down.svg";
                }
                else
                {
                    change.className="slider__item-price--different-up";
                    arrow.src="src-crypto/public/price-arrow-up.svg";
                }

                // Рендерим график
                const ctx = document.getElementById(`${coin}-graph`).getContext('2d');
                graphRender(data, ctx);
            } else {
                console.error(`Ошибка при получении данных для ${coin}.`);
            }
        } catch (error) {
            console.error(`Ошибка запроса данных для ${coin}:`, error);
        }
    }


    let isScrolling = false; // Флаг для временной блокировки

    function smoothScroll(container, targetScrollLeft, duration = 500, onComplete) {
        const startScrollLeft = container.scrollLeft;
        const distance = targetScrollLeft - startScrollLeft;
        let startTime = null;

        function scrollStep(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percent = Math.min(progress / duration, 1);
            container.scrollLeft = startScrollLeft + distance * percent;

            if (progress < duration) {
                requestAnimationFrame(scrollStep);
            } else if (onComplete) {
                onComplete(); // Выполнить функцию после завершения прокрутки
            }
        }

        requestAnimationFrame(scrollStep);
    }

    function scrollLeft() {
        if (!leftButton.disabled) {
            if (currentItemIndex > 0) {
                currentItemIndex--;
                const newScrollLeft = slider.scrollLeft - itemSizes[currentItemIndex];
                smoothScroll(slider, newScrollLeft, 500, () => {
                    // Проверка позиции для точного отключения кнопок
                    rightButton.disabled = false;
                    leftButton.disabled = slider.scrollLeft <= itemSizes[0] / 2;
                });
            }
        }
    }

    function scrollRight() {
        if (!rightButton.disabled) {
            if (currentItemIndex < itemSizes.length - 1) {
                const newScrollLeft = slider.scrollLeft + itemSizes[currentItemIndex];
                currentItemIndex++;
                smoothScroll(slider, newScrollLeft, 500, () => {
                    // Проверка позиции для точного отключения кнопок
                    leftButton.disabled = false;
                    const nearEndPosition = slider.scrollWidth - slider.clientWidth - itemSizes[itemSizes.length - 1] / 2;
                    rightButton.disabled = slider.scrollLeft >= nearEndPosition;
                });
            }
        }
    }

    leftButton.addEventListener('click', scrollLeft);
    rightButton.addEventListener('click', scrollRight);


    // Вызываем функцию fetchDataAndRender для каждого элемента из Storage
    storage.forEach(coin => fetchDataAndRender(coin.id));
}
