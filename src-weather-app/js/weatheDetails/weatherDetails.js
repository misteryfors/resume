
// Пример вызова функции с обновленным массивом
const weatherDetails = (weatherData) => {
    

    let weatherDetailsElement = document.querySelector('.right-block__details');
    console.log(weatherData);

    weatherDetailsElement.innerHTML = weatherData.details.map(item => `
        <div class="details__item item">
            <div class="item__values">
                <p class="item__title">${item.title}</p>
                <img class="item__img" src="${"./src-weather-app/public/img/" + item.img}" alt="${item.title}">
                <p class="item__value">${item.value}</p>
            </div>
            <div class="item__bar bar">
                ${item.range ? `
                    <input class="bar__range" type="range" min="${item.range.min}" max="${item.range.max}" value="${item.range.value}" 
                        style="
                        background: ${item.barStyle === 1 ? 'rgba(218, 218, 218, 0.4)' : 'radial-gradient(50% 9453.13% at 50% 50%, rgba(84, 84, 84, 0.4) 0%, rgba(138, 138, 138, 0.4) 45.12%, #DADADA 100%, rgba(218, 218, 218, 0.4) 100%)'};
                        mask: radial-gradient(circle 4px at calc(${(item.range.value - item.range.min) / (item.range.max - item.range.min) * 100}% + ${4 - 8 * (item.range.value - item.range.min) / (item.range.max - item.range.min)}px), #f5f4f4 4px, transparent 4px, transparent 6px, #ffffff 6px);
                        " disabled>
                ` : ''}
                <p class="bar__text" style="${item.barText ? '' : 'display: flex; justify-content: space-between;'}">
                    ${item.range != null ? `
                        <span class="bar__text-min">${item.range.tag != null ? item.range.min + item.range.tag : ""}</span>
                        <span class="bar__text-max">${item.range.tag != null ? item.range.max + item.range.tag : ""}</span>
                        `
                    :
                    ""}
                    ${item.barText != null ? item.barText : ``}
                </p>
            </div>
        </div>
    `).join('');
}

export {weatherDetails};


