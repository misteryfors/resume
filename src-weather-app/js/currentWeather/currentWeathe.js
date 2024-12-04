
export const currentWeather = (weatherData) => {
    let weatherDetailsElement = document.querySelector('.weather__info');

    weatherDetailsElement.innerHTML =  `
        <div class="info__date-time-city">
                    <p class="info__city">${weatherData.current.location}</p>
                    <p class="info__date">${weatherData.current.formattedDate}</p>
                    <p class="info__time">${weatherData.current.formattedTime}</p>
                </div>
                <div class="info__temp">
                    <p class="info__temp-value">${weatherData.current.temp_c}°</p>
                </div>
                <div class="info__other-info">
                    <div class="info__weather">
                        <img class="info__weather-icon" src=${weatherData.current.img} alt="Иконка погоды">
                        <p class="info__weather-text">${weatherData.current.condition}</p>
                    </div>
                    <p class="info__feels-like">Ощущается как ${weatherData.current.feelslike_c}°</p>
                </div>
    `;
}


