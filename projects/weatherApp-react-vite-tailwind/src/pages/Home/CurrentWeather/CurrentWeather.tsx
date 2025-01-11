import './CurrentWeather.scss';
import React from 'react';
import { WeatherData } from '../../../ts/weatherData.ts';

interface CurrentWeatherProps {
    current: WeatherData['current'];
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ current }) => {

    console.log(current);
    return (
        <section className="w-full flex box-border
        p-4 gap-8 flex-col
        lg:p-8 lg:gap-4 lg:flex-row">
            <div className="flex flex-col justify-between items-center text-[#F5F4F4] box-border
            w-full px-2 py-0 gap-4
            lg:gap-6
            lg:p-2 lg:w-[534px]
            ">
                <div className="w-full flex flex-col text-center gap-1 lg:gap-2">
                    <p className="font-bold text-16 lg:text-24">{current.location}</p>
                    <p className="font-normal lining-nums text-16 lg:text-20">{current.formattedDate}</p>
                    <p className="font-normal lining-nums text-16 lg:text-20">{current.formattedTime}</p>
                </div>
                <div className="w-full flex items-center justify-center text-center gap-1 lg:gap-2">
                    <p className="font-bold lining-nums text-56 lg:text-112">{current.temp_c}°</p>
                </div>
                <div className="flex flex-col w-full gap-1 lg:gap-2">
                    <div className="flex items-center justify-center w-full gap-1 lg:gap-2">
                        <img
                            className="w-[16px] h-[16px] lg:w-[24px] lg:h-[24px]"
                            src={current.img}
                            alt="Иконка погоды"
                        />
                        <p className="font-normal text-center lining-nums text-16 lg:text-20">{current.condition}</p>
                    </div>
                    <p className="font-normal text-center lining-nums text-16 lg:text-20">
                        Ощущается как {current.feelslike_c}°
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center w-full m-auto lg:w-[506px] lg:m-0">
                <div className="grid grid-cols-3 grid-rows-2 gap-2 lg:gap-3 xl:gap-4">
                    {current.details.map((item, index) => (
                        <div className="flex flex-col rounded-lg box-border bg-[#F5F4F466] p-3 gap-3 md:p-4 md:gap-4" key={index}>
                            <div className="flex flex-col items-center w-full gap-3 lg:gap-4 ">
                                <p className="font-bold text-center text-[#202020FF] text-12 lg:text-16">{item.title}</p>
                                <img
                                    className="gap-0 w-6 h-6 lg:w-8 lg:h-8 "
                                    src={`./img/${item.img}`}
                                    alt={item.title}
                                />
                                <p className="font-normal text-center lining-nums text-[#202020FF] text-22 md:text-32">{item.value}</p>
                            </div>
                            {item.range && (
                                <div className="w-full flex flex-col gap-2">
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
                                        className="font-normal text-center lining-nums text-[#393939FF] text-10 lg:text-12"
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
                                <div className="w-full flex flex-col gap-2">
                                    <div
                                        className="font-normal text-center lining-nums text-[#393939FF] text-10 lg:text-12"
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
