import './CurrentWeather.scss';
import React from 'react';
import { WeatherData } from '../../../ts/weatherData.ts';

interface CurrentWeatherProps {
    current: WeatherData['current'];
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current }) => {

    console.log(current);
    return (
        <section className="weather">
            <div className="weather__info">
                <div className="weather__date-time-city">
                    <p className="weather__city">{current.location}</p>
                    <p className="weather__date">{current.formattedDate}</p>
                    <p className="weather__time">{current.formattedTime}</p>
                </div>
                <div className="weather__temp">
                    <p className="weather__temp-value">{current.temp_c}°</p>
                </div>
                <div className="weather__other-info">
                    <div className="weather__condition">
                        <img
                            className="weather__condition-icon"
                            src={current.img}
                            alt="Иконка погоды"
                        />
                        <p className="weather__condition-text">{current.condition}</p>
                    </div>
                    <p className="weather__feels-like">
                        Ощущается как {current.feelslike_c}°
                    </p>
                </div>
            </div>
            <div className="weather__right-block">
                <div className="weather__details">
                    {current.details.map((item, index) => (
                        <div className="weather__detail" key={index}>
                            <div className="weather__detail-values">
                                <p className="weather__detail-title">{item.title}</p>
                                <img
                                    className="weather__detail-img"
                                    src={`./img/${item.img}`}
                                    alt={item.title}
                                />
                                <p className="weather__detail-value">{item.value}</p>
                            </div>
                            {item.range && (
                                <div className="weather__detail-bar">
                                    <input
                                        className="weather__bar-range"
                                        type="range"
                                        min={item.range.min}
                                        max={item.range.max}
                                        value={item.range.value}
                                        style={{
                                            background: 'radial-gradient(50% 9453.13% at 50% 50%, rgba(84, 84, 84, 0.4) 0%, rgba(138, 138, 138, 0.4) 45.12%, #DADADA 100%, rgba(218, 218, 218, 0.4) 100%)',
                                            mask: `radial-gradient(
                                                circle 4px at calc(${((Number(item.range.value) - item.range.min) /
                                                (item.range.max - item.range.min)) * 100}% + ${
                                                4 - 8 *
                                                ((Number(item.range.value) - item.range.min) /
                                                    (item.range.max - item.range.min))
                                            }px),
                                                #f5f4f4 4px, transparent 4px, transparent 6px, #ffffff 6px
                                            )`,
                                        }}
                                        disabled
                                    />
                                    <div
                                        className="weather__bar-text"
                                        style={{
                                            display: item.barText ? 'block' : 'flex',
                                            justifyContent: item.barText ? 'normal' : 'space-between',
                                        }}
                                    >
                                        {item.range.tag && (
                                            <>
                                                <span className="weather__bar-text-min">
                                                    {item.range.min + item.range.tag}
                                                </span>
                                                <span className="weather__bar-text-max">
                                                    {item.range.max + item.range.tag}
                                                </span>
                                            </>
                                        )}
                                        {item.barText && <span>{item.barText}</span>}
                                    </div>
                                </div>
                            )}
                            {(!item.range && item.barText) &&
                                <div className="weather__bar">
                                    <div
                                        className="weather__bar-text"
                                        style={{
                                            display: item.barText ? 'block' : 'flex',
                                            justifyContent: item.barText ? 'normal' : 'space-between',
                                        }}
                                    >
                                        {item.barText && <span>{item.barText}</span>}
                                    </div>
                                </div>
                            }
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurrentWeather;
