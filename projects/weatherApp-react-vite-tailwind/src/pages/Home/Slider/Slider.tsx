import './Slider.scss';
import React, { useRef, useState, useEffect } from 'react';

type SliderProps = {
    days: {
        time: string;
        condition: string;
        img: string;
        temp_c: string;
    }[];
    hours: {
        time: string;
        condition: string;
        img: string;
        temp_c: number;
    }[];
};

const Slider: React.FC<SliderProps> = ({ days, hours }) => {
    const [filter, setFilter] = useState('hours');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [maxIndex, setMaxIndex] = useState(0);
    const listRef = useRef<HTMLDivElement>(null);

    const data = filter === 'days' ? days : hours;

    useEffect(() => {
        const calculateMaxIndex = () => {
            const container = listRef.current;
            if (container) {
                const containerWidth = container.clientWidth;
                const itemWidth = container.firstElementChild?.getBoundingClientRect().width || 0;
                const visibleItems = Math.floor(containerWidth / itemWidth);
                setMaxIndex(Math.max(0, data.length - visibleItems));
            }
        };

        calculateMaxIndex();
        window.addEventListener('resize', calculateMaxIndex);
        return () => window.removeEventListener('resize', calculateMaxIndex);
    }, [data]);

    const scrollToIndex = (index: number) => {
        const container = listRef.current;
        if (container) {
            const itemWidth = container.firstElementChild?.getBoundingClientRect().width || 0;
            container.scrollTo({
                left: index * itemWidth,
                behavior: 'smooth',
            });
        }
    };

    const handleLeftClick = () => {
        if (currentIndex > 0) {
            const newIndex = currentIndex - 1;
            setCurrentIndex(newIndex);
            scrollToIndex(newIndex);
        }
    };

    const handleRightClick = () => {
        if (currentIndex < maxIndex) {
            const newIndex = currentIndex + 1;
            setCurrentIndex(newIndex);
            scrollToIndex(newIndex);
        }
    };

    return (
        <section className="w-full box-border flex flex-col p-4 gap-6 md:p-6 lg:p-8 lg:gap-8">
            <div className="w-full flex h-[22px] gap-6 md:h-8 xl:h-auto xl:gap-8">
                <p className="font-bold text-center text-[#F5F4F4FF] text-20 lg:text-24">Прогноз:</p>
                <button
                    className={`font-bold text-center text-[#A6A6A6FF] border-0 border-b-[2px]  bg-none rounded-none p-0 focus:outline-none hover:border-[#A6A6A6FF] hover:text-[#A6A6A6FF]  ${filter === 'hours' ? '!border-[#F5F4F4FF] !text-[#F5F4F4FF]' : ''}`}
                    onClick={() => {
                        setFilter('hours');
                        setCurrentIndex(0); // сбросить индекс
                    }}
                >
                    на 24 часа
                </button>
                <button
                    className={`font-bold text-center text-[#A6A6A6FF] border-0 border-b-[2px]  bg-none rounded-none p-0 focus:outline-none hover:border-[#A6A6A6FF] hover:text-[#A6A6A6FF] ${filter === 'days' ? '!border-[#F5F4F4FF] !text-[#F5F4F4FF]' : ''}`}
                    onClick={() => {
                        setFilter('days');
                        setCurrentIndex(0); // сбросить индекс
                    }}
                >
                    на 5 дней
                </button>
            </div>
            <div className="w-full flex items-center gap-6 lg:gap-8">
                <button
                    className="slider__left-button"
                    onClick={handleLeftClick}
                    disabled={currentIndex === 0}
                ></button>
                <div className="slider__mask-gradient">
                    <div className="w-full h-full left-[88px] gap-0">
                        <div className="w-full h-full grid grid-flow-col grid-rows-1 auto-cols-max overflow-x-hidden scroll-auto gap-2 lg:gap-4 " ref={listRef}>
                            {data.map((item, index) => (
                                <div key={index} className="h-full rounded-lg flex items-center bg-[#F5F4F466] box-border lining-nums whitespace-nowrap overflow-hidden flex-col gap-3 p-3 md:flex-row md:p-4 md:gap-4  lg:flex-row">
                                    <p className="w-max flex font-normal text-left lining-nums text-[#202020FF] text-12 lg:text-16">{item.time}</p>
                                    <img
                                        className="w-6 h-6 lg:w-8 lg:h-8"
                                        src={item.img}
                                        alt="weather icon"
                                    />
                                    <p className="w-max flex font-normal text-left lining-nums text-[#202020FF] text-12 lg:text-16">{item.temp_c}°</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <button
                    className="slider__right-button"
                    onClick={handleRightClick}
                    disabled={currentIndex === maxIndex}
                ></button>
            </div>
        </section>
    );
};

export default Slider;
