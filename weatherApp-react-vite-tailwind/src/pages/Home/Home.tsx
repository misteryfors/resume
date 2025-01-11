import './Home.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getWeatherData } from '../../ts/weatherData.ts';
import CurrentWeather from './CurrentWeather/CurrentWeather.tsx';
import Slider from './Slider/Slider.tsx';
import { WeatherData } from '../../ts/weatherData.ts';

const Home: React.FC = () => {
    const { cityName } = useParams<{ cityName: string }>();
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [currentCity, setCurrentCity] = useState<string>(cityName || "");


    // Получение геолокации
    useEffect(() => {
        console.log(currentCity,cityName)
        if (cityName){
            setCurrentCity(cityName);
        }
        else
        if (currentCity=="") {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const coords = `${position.coords.latitude},${position.coords.longitude}`;
                    setCurrentCity(coords);
                },
                () => {
                    console.error('Ошибка получения геолокации');
                    setCurrentCity("Москва")
                }
            );
        }
    }, [cityName]);

    // Получение данных о погоде
    useEffect(() => {

        const fetchWeatherData = async () => {
            try {
                const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=6e40db2d40af4681bce15022242210&q=${currentCity}&days=5&aqi=no&alerts=no`;
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
        if (currentCity!="") {
            fetchWeatherData();
        }
    }, [currentCity]);

    return (
        <div className="home-page">
            {weatherData && <CurrentWeather current={weatherData.current} />}
            {weatherData && <Slider days={weatherData.days} hours={weatherData.hours} />}
        </div>
    );
};

export default Home;
