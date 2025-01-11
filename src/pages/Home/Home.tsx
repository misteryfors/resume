import './Home.scss';
import React, { useEffect, useState } from 'react';
import { getWeatherData } from '../../ts/weatherData.ts';
import CurrentWeather from './CurrentWeather/CurrentWeather.tsx';
import Slider from "./Slider/Slider.tsx";
import {WeatherData} from "../../ts/weatherData.ts";


const Home: React.FC = () => {
    const [city] = useState('London'); // Укажите город по умолчанию
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=6e40db2d40af4681bce15022242210&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`;
                const data = await getWeatherData(apiUrl);
                if (data && typeof data === 'object' && 'current' in data && 'days' in data && 'hours' in data) {
                    setWeatherData(data as WeatherData);
                } else {
                    console.warn('Получены некорректные данные о погоде:', data);
                    setWeatherData(null);
                }
            } catch (error) {
                console.error('Ошибка при получении данных о погоде:', error);
                setWeatherData(null);
            }
        };

        fetchWeatherData();
    }, [city]);

    return (
        <div className="home-page">
            {weatherData && <CurrentWeather current={weatherData.current} />}
            {weatherData && <Slider days={weatherData.days} hours={weatherData.hours} />}
        </div>
    );
};

export default Home;
