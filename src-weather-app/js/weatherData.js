const windDirection = {
    "N": "Северный",
    "NNE": "Северо-северо-восточный",
    "NE": "Северо-восточный",
    "ENE": "Восточно-северо-восточный",
    "E": "Восточный",
    "ESE": "Восточно-юго-восточный",
    "SE": "Юго-восточный",
    "SSE": "Юго-юго-восточный",
    "S": "Южный",
    "SSW": "Юго-юго-западный",
    "SW": "Юго-западный",
    "WSW": "Западно-юго-западный",
    "W": "Западный",
    "WNW": "Западно-северо-западный",
    "NW": "Северо-западный",
    "NNW": "Северно-северо-западный"
};

const windDirectionImg = {
    "N": "wind_dir/Северный.svg",
    "NNE": "wind_dir/Северо-восточный.svg",
    "NE": "wind_dir/Северо-восточный.svg",
    "ENE": "wind_dir/Северо-восточный.svg",
    "E": "wind_dir/Восточный.svg",
    "ESE": "wind_dir/Юго-восточный.svg",
    "SE": "wind_dir/Юго-восточный.svg",
    "SSE": "wind_dir/Юго-восточный.svg",
    "S": "wind_dir/Южный.svg",
    "SSW": "wind_dir/Юго-западный.svg",
    "SW": "wind_dir/Юго-западный.svg",
    "WSW": "wind_dir/Юго-западный.svg",
    "W": "wind_dir/Западный.svg",
    "WNW": "wind_dir/Северо-западный.svg",
    "NW": "wind_dir/Северо-западный.svg",
    "NNW": "wind_dir/Северо-западный.svg"
};

const weatherTranslations = {
    "Sunny": "Солнечно",
    "Clear": "Ясно",
    "Partly cloudy": "Переменная облачность",
    "Cloudy": "Облачно",
    "Overcast": "Пасмурно",
    "Rain": "Дождь",
    "Snow": "Снег",
    "Thunderstorm": "Гроза",
    "Fog": "Туман",
    "Patchy rain nearby":"Местами дождь",
    "Light rain":"Мелкий дождь"
    // Добавьте остальные возможные варианты
};


// Функция для получения данных с API
async function getWeatherData(apiUrl) {
    try {

        const response = await fetch(apiUrl); // Отправка запроса
        if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`); // Проверка на успешный ответ
        }
        const data = await response.json(); // Преобразование данных в формат JSON
        const weatherJson = data; // Данные для текущего дня
        console.log(data);
        // Функция для конвертации давления из мбар в мм рт. ст.
        const convertPressure = (pressureMb) => (pressureMb * 0.750063755419211).toFixed(2);

        // Функция для конвертации времени из AM/PM в 24-часовой формат
        // Функция для конвертации времени из AM/PM в 24-часовой формат
        const convertTo24HourFormat = (time12h) => {
            const [time, modifier] = time12h.split(' ');
            let [hours, minutes] = time.split(':');
            if (hours === '12') hours = '00';
            if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
            return `${hours.padStart(2, '0')}:${minutes}`;
        };
        
    
        const timeOut = (getTime) => {
            // Получаем текущее время
            const now = new Date();
        
            // Преобразуем getTime (например, "10:30") в объект Date
            const [hours, minutes] = getTime.split(':').map(Number);
            const getTimeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
        
            // Вычисляем разницу
            const isPassed = now >= getTimeDate; // Проверяем, прошло ли время
            const difference = Math.abs(now - getTimeDate); // Берем абсолютное значение разницы
            const differenceInMinutes = Math.floor(difference / 1000 / 60); // Преобразуем разницу в минуты
        
            const resultHours = Math.floor(differenceInMinutes / 60); // Полные часы
            const resultMinutes = differenceInMinutes % 60; // Остаток минут
        
            const result = isPassed 
                ? `прошло ${resultHours} ч ${resultMinutes} мин`
                : `осталось ${resultHours} ч ${resultMinutes} мин`;
        
            return result;
        }

        function formatDateTime(dateTimeStr) {
            const date = new Date(dateTimeStr);
        
            // Получаем день недели и дату в формате "Суббота, 06 января"
            const optionsDate = { weekday: 'long', day: '2-digit', month: 'long' };
            const formattedDate = date.toLocaleDateString('ru-RU', optionsDate);
        
            // Получаем время в формате "11:29"
            const optionsTime = { hour: '2-digit', minute: '2-digit' };
            const formattedTime = date.toLocaleTimeString('ru-RU', optionsTime);
        
            return {
                formattedDate,
                formattedTime
            };
        }

        const getPressureStatus = (pressureMm) => {
            if (pressureMm < 735) {
                return "пониженное";
            } else if (pressureMm >= 735 && pressureMm <= 770) {
                return "нормальное";
            } else {
                return "повышенное";
            }
        };
        
        const getVisibilityStatus = (visibilityKm) => {
            if (visibilityKm < 1) {
                return "плохая";
            } else if (visibilityKm >= 1 && visibilityKm <= 10) {
                return "нормальная";
            } else {
                return "хорошая";
            }
        };

        const hourlyDataHours = weatherJson.forecast.forecastday[0].hour
            .filter((_, index) => index % 3 === 0)
            .map(hour => ({
                time: formatDateTime(hour.time).formattedTime,
                condition: hour.condition.text,
                img: hour.condition.icon,
                temp_c: hour.temp_c
            }));

        const hourlyDatDays = weatherJson.forecast.forecastday
            .map(day => ({
                time: formatDateTime(day.date).formattedDate,
                condition: day.day.condition.text,
                img: day.day.condition.icon,
                temp_c: "от "+day.day.mintemp_c+"° до " + day.day.maxtemp_c+"°",
            }));

        // Создание массива weatherData на основе загруженных данных
        const weatherData = {
            current:{
                location: weatherJson.location.name,
                formattedDate:formatDateTime(weatherJson.location.localtime).formattedDate,
                formattedTime:formatDateTime(weatherJson.location.localtime).formattedTime,
                temp_c: weatherJson.current.temp_c,
                condition: weatherTranslations[weatherJson.current.condition.text],
                img: weatherJson.current.condition.icon,
                feelslike_c: weatherJson.current.feelslike_c
            },
            details:[
                {
                    title: "Влажность",
                    img: "humidity.svg",
                    value: `${weatherJson.forecast.forecastday[0].hour[0].humidity} %`,
                    range: {
                    min: 0,
                    max: 100,
                    tag: "%",
                    value: weatherJson.forecast.forecastday[0].hour[0].humidity
                    },
                    barText: null
                },
                {
                    title: "Давление",
                    img: "barometr.svg",
                    value: `${convertPressure(weatherJson.forecast.forecastday[0].hour[0].pressure_mb)}`,
                    range: {
                    min: 650,
                    max: 820,
                    tag: null,
                    value: convertPressure(weatherJson.forecast.forecastday[0].hour[0].pressure_mb)
                    },
                    barText: getPressureStatus(weatherJson.forecast.forecastday[0].hour[0].pressure_mb)
                },
                {
                    title: "Видимость",
                    img: "visibility.svg",
                    value: `${weatherJson.forecast.forecastday[0].hour[0].vis_km} км`,
                    range: {
                    min: 0,
                    max: 100,
                    tag: null,
                    value: weatherJson.forecast.forecastday[0].hour[0].vis_km
                    },
                    barText: getVisibilityStatus(weatherJson.forecast.forecastday[0].hour[0].vis_km)
                },
                {
                    title: "Рассвет",
                    img: "sunrise.svg",
                    value: convertTo24HourFormat(weatherJson.forecast.forecastday[0].astro.sunrise),
                    range: null,
                    barText: timeOut(convertTo24HourFormat(weatherJson.forecast.forecastday[0].astro.sunrise))
                },
                {
                    title: "Закат",
                    img: "sunset.svg",
                    value: convertTo24HourFormat(weatherJson.forecast.forecastday[0].astro.sunset),
                    range: null,
                    barText:  timeOut(convertTo24HourFormat(weatherJson.forecast.forecastday[0].astro.sunset))
                },
                {
                    title: "Ветер",
                    img: windDirectionImg[weatherJson.forecast.forecastday[0].hour[0].wind_dir],
                    value: `${(weatherJson.forecast.forecastday[0].hour[0].wind_kph *1000/3600).toFixed(1)} м/c`,
                    range: null,
                    barText: windDirection[weatherJson.forecast.forecastday[0].hour[0].wind_dir]
                },
            ],
            hours: hourlyDataHours,
            days: hourlyDatDays

        };

        return weatherData;
    } catch (error) {
      console.error('Ошибка при получении данных:', error); // Обработка ошибок
      return []; // Возвращаем пустой массив в случае ошибки
    }
}

  

// Экспорт функции, возвращающей данные
export { getWeatherData };
