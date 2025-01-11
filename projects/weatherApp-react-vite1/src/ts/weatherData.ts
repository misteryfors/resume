type WindDirectionMap = Record<string, string>;
type WeatherTranslationsMap = Record<string, string>;
export type WeatherData = {
    current: {
        location: string;
        formattedDate: string;
        formattedTime: string;
        temp_c: number;
        condition: string | undefined;
        img: string;
        feelslike_c: number;
        details: {
            title: string;
            img: string;
            value: string;
            range: {
                min: number;
                max: number;
                tag: string | null;
                value: number | string;
            } | null;
            barText: string | null;
        }[];
    };
    hours: {
        time: string;
        condition: string;
        img: string;
        temp_c: number;
    }[];
    days: {
        time: string;
        condition: string;
        img: string;
        temp_c: string;
    }[];
};

const windDirection: WindDirectionMap = {
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

const windDirectionImg: WindDirectionMap = {
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

const weatherTranslations: WeatherTranslationsMap = {
    "Sunny": "Солнечно",
    "Clear": "Ясно",
    "Partly cloudy": "Переменная облачность",
    "Cloudy": "Облачно",
    "Overcast": "Пасмурно",
    "Rain": "Дождь",
    "Snow": "Снег",
    "Thunderstorm": "Гроза",
    "Fog": "Туман",
    "Patchy rain nearby": "Местами дождь",
    "Light rain": "Мелкий дождь"
};

async function getWeatherData(apiUrl: string): Promise<WeatherData | []> {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Ошибка: ${response.status}`);
        }
        const data = await response.json();

        const convertPressure = (pressureMb: number): string =>
            (pressureMb * 0.750063755419211).toFixed(2);

        const convertTo24HourFormat = (time12h: string): string => {
            const [time, modifier] = time12h.split(" ");
            let [hours, minutes] = time.split(":");
            if (hours === "12") hours = "00";
            if (modifier === "PM") hours = String(parseInt(hours, 10) + 12);
            return `${hours.padStart(2, "0")}:${minutes}`;
        };

        const timeOut = (getTime: string): string => {
            const now = new Date();
            const [hours, minutes] = getTime.split(":").map(Number);
            const getTimeDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
            const isPassed = now >= getTimeDate;
            const difference = Math.abs(now.getTime() - getTimeDate.getTime());
            const differenceInMinutes = Math.floor(difference / 1000 / 60);
            const resultHours = Math.floor(differenceInMinutes / 60);
            const resultMinutes = differenceInMinutes % 60;
            return isPassed
                ? `прошло ${resultHours} ч ${resultMinutes} мин`
                : `осталось ${resultHours} ч ${resultMinutes} мин`;
        };

        const formatDateTime = (dateTimeStr: string): { formattedDate: string; formattedTime: string } => {
            const date = new Date(dateTimeStr);
            const optionsDate:Intl.DateTimeFormatOptions = { weekday: "long", day: "2-digit", month: "long" };
            const formattedDate = date.toLocaleDateString("ru-RU", optionsDate);
            const optionsTime:Intl.DateTimeFormatOptions = { hour: "2-digit", minute: "2-digit" };
            const formattedTime = date.toLocaleTimeString("ru-RU", optionsTime);
            return { formattedDate, formattedTime };
        };

        const getPressureStatus = (pressureMm: number): string =>
            pressureMm < 735 ? "пониженное" :
                pressureMm <= 770 ? "нормальное" :
                    "повышенное";

        const getVisibilityStatus = (visibilityKm: number): string =>
            visibilityKm < 1 ? "плохая" :
                visibilityKm <= 10 ? "нормальная" :
                    "хорошая";

        const hourlyDataHours = data.forecast.forecastday[0].hour
            .filter((_: any, index: number) => index % 3 === 0)
            .map((hour: any) => ({
                time: formatDateTime(hour.time).formattedTime,
                condition: hour.condition.text,
                img: hour.condition.icon,
                temp_c: hour.temp_c
            }));

        const hourlyDatDays = data.forecast.forecastday
            .map((day: any) => ({
                time: formatDateTime(day.date).formattedDate,
                condition: day.day.condition.text,
                img: day.day.condition.icon,
                temp_c: `от ${day.day.mintemp_c}° до ${day.day.maxtemp_c}°`
            }));

        const weatherData: WeatherData = {
            current: {
                location: data.location.name,
                formattedDate: formatDateTime(data.location.localtime).formattedDate,
                formattedTime: formatDateTime(data.location.localtime).formattedTime,
                temp_c: data.current.temp_c,
                condition: weatherTranslations[data.current.condition.text],
                img: data.current.condition.icon,
                feelslike_c: data.current.feelslike_c,
                details: [
                    {
                        title: "Влажность",
                        img: "humidity.svg",
                        value: `${data.forecast.forecastday[0].hour[0].humidity} %`,
                        range: { min: 0, max: 100, tag: "%", value: data.forecast.forecastday[0].hour[0].humidity },
                        barText: null
                    },
                    {
                        title: "Давление",
                        img: "barometr.svg",
                        value: `${convertPressure(data.forecast.forecastday[0].hour[0].pressure_mb)}`,
                        range: { min: 650, max: 820, tag: null, value: convertPressure(data.forecast.forecastday[0].hour[0].pressure_mb) },
                        barText: getPressureStatus(data.forecast.forecastday[0].hour[0].pressure_mb)
                    },
                    {
                        title: "Видимость",
                        img: "visibility.svg",
                        value: `${data.forecast.forecastday[0].hour[0].vis_km} км`,
                        range: { min: 0, max: 100, tag: null, value: data.forecast.forecastday[0].hour[0].vis_km },
                        barText: getVisibilityStatus(data.forecast.forecastday[0].hour[0].vis_km)
                    },
                    {
                        title: "Рассвет",
                        img: "sunrise.svg",
                        value: convertTo24HourFormat(data.forecast.forecastday[0].astro.sunrise),
                        range: null,
                        barText: timeOut(convertTo24HourFormat(data.forecast.forecastday[0].astro.sunrise))
                    },
                    {
                        title: "Закат",
                        img: "sunset.svg",
                        value: convertTo24HourFormat(data.forecast.forecastday[0].astro.sunset),
                        range: null,
                        barText: timeOut(convertTo24HourFormat(data.forecast.forecastday[0].astro.sunset))
                    },
                    {
                        title: "Ветер",
                        img: windDirectionImg[data.forecast.forecastday[0].hour[0].wind_dir],
                        value: `${(data.forecast.forecastday[0].hour[0].wind_kph * 1000 / 3600).toFixed(1)} м/c`,
                        range: null,
                        barText: windDirection[data.forecast.forecastday[0].hour[0].wind_dir]
                    }
                ],
            },

            hours: hourlyDataHours,
            days: hourlyDatDays
        };

        return weatherData;
    } catch (error) {
        console.error("Ошибка при получении данных:", error);
        return [];
    }
}

export { getWeatherData};
