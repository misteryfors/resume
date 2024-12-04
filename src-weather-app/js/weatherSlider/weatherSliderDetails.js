
export const weatherSlider= (weatherData)=>{


const listContainer = document.querySelector('.switch__list');
const leftButton= document.querySelector('.switch__left-button');
const rightButton= document.querySelector('.switch__right-button');



let itemSizes = [];
let currentItemIndex = 0; 


const weatherDetails2 = (mass) => {
    let weatherDetails = document.querySelector('.switch__list');
    weatherDetails.innerHTML = ''; // Очищаем содержимое

    itemSizes = [];
    currentItemIndex = 0;
    leftButton.disabled = true; 
    rightButton.disabled = false;

    // Используем шаблонную строку для добавления элементов в innerHTML
    weatherDetails.innerHTML = mass.map(item => `
        <div class="list__slider-item slider-item">
            <p class="slider-item__time">${item.time}</p>
            <img class="slider-item__img" src=${item.img} alt="weather icon">
            <p class="slider-item__degrees">${item.temp_c}°</p>
        </div>
    `).join(''); // Преобразуем массив в строку HTML

    // Рассчитываем ширину каждого элемента и добавляем в itemSizes
    Array.from(weatherDetails.children).forEach(item => {
        itemSizes.push(item.getBoundingClientRect().width + 16);
    });
};

const menuItemDay = document.querySelector('.menu-item__day');
const menuItemWeek = document.querySelector('.menu-item__week');

menuItemDay.addEventListener('click', () => {
    menuItemDay.classList.add('select');
    menuItemWeek.classList.remove('select');
    weatherDetails2(weatherData.hours);
});

menuItemWeek.addEventListener('click', () => {
    menuItemWeek.classList.add('select');
    menuItemDay.classList.remove('select');
    weatherDetails2(weatherData.days);
});

weatherDetails2(weatherData.hours);


// Код скролла на будующее

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
                const newScrollLeft = listContainer.scrollLeft - itemSizes[currentItemIndex];
                smoothScroll(listContainer, newScrollLeft, 500, () => {
                    // Проверка позиции для точного отключения кнопок
                    rightButton.disabled = false;
                    leftButton.disabled = listContainer.scrollLeft <= itemSizes[0] / 2;
                });
            }
        }
    }

    function scrollRight() {
        if (!rightButton.disabled) {
            if (currentItemIndex < itemSizes.length - 1) {
                const newScrollLeft = listContainer.scrollLeft + itemSizes[currentItemIndex];
                currentItemIndex++;
                smoothScroll(listContainer, newScrollLeft, 500, () => {
                    // Проверка позиции для точного отключения кнопок
                    leftButton.disabled = false;
                    const nearEndPosition = listContainer.scrollWidth - listContainer.clientWidth - itemSizes[itemSizes.length - 1] / 2;
                    rightButton.disabled = listContainer.scrollLeft >= nearEndPosition;
                });
            }
        }
    }




leftButton.addEventListener('click', scrollLeft);
rightButton.addEventListener('click', scrollRight);



}

