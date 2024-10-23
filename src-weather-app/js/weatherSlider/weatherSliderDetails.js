
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

function scrollLeft() {
    if (!leftButton.disabled && !isScrolling) {
        isScrolling = true; // Устанавливаем временную блокировку
        if (listContainer.scrollLeft - itemSizes[currentItemIndex] <= 10) {
            leftButton.disabled = true; // Полностью отключаем кнопку при достижении конца
        } else {
            rightButton.disabled = false; // Включаем кнопку вправо, если не достигли конца
        }

        if (currentItemIndex > 0) {
            currentItemIndex--;
            listContainer.scrollLeft -= itemSizes[currentItemIndex];
        }

        // Задержка перед повторным включением возможности прокрутки
        setTimeout(() => {
            isScrolling = false; // Разрешаем повторное нажатие через 300 мс
        }, 300);
    }
}

function scrollRight() {
    if (!rightButton.disabled && !isScrolling) {
        isScrolling = true; // Устанавливаем временную блокировку
        if (listContainer.scrollLeft + itemSizes[currentItemIndex] >= listContainer.scrollWidth - listContainer.clientWidth - 10) {
            rightButton.disabled = true; // Полностью отключаем кнопку при достижении конца
        } else {
            leftButton.disabled = false; // Включаем кнопку влево, если не достигли начала
        }

        if (currentItemIndex < itemSizes.length - 1) {
            listContainer.scrollLeft += itemSizes[currentItemIndex];
            currentItemIndex++;
        }

        // Задержка перед повторным включением возможности прокрутки
        setTimeout(() => {
            isScrolling = false; // Разрешаем повторное нажатие через 300 мс
        }, 300);
    }
}

leftButton.addEventListener('click', scrollLeft);
rightButton.addEventListener('click', scrollRight);



}

