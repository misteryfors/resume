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
        <section className="slider">
            <div className="slider__menu-item">
                <p className="slider__title">Прогноз:</p>
                <button
                    className={`slider__day ${filter === 'hours' ? 'select' : ''}`}
                    onClick={() => {
                        setFilter('hours');
                        setCurrentIndex(0); // сбросить индекс
                    }}
                >
                    на 24 часа
                </button>
                <button
                    className={`slider__week ${filter === 'days' ? 'select' : ''}`}
                    onClick={() => {
                        setFilter('days');
                        setCurrentIndex(0); // сбросить индекс
                    }}
                >
                    на 5 дней
                </button>
            </div>
            <div className="slider__switch">
                <button
                    className="slider__left-button"
                    onClick={handleLeftClick}
                    disabled={currentIndex === 0}
                ></button>
                <div className="slider__mask-gradient">
                    <div className="slider__mask-gradient-overlay">
                        <div className="slider__list" ref={listRef}>
                            {data.map((item, index) => (
                                <div key={index} className="slider__item">
                                    <p className="slider__item-time">{item.time}</p>
                                    <img
                                        className="slider__item-img"
                                        src={item.img}
                                        alt="weather icon"
                                    />
                                    <p className="slider__item-degrees">{item.temp_c}°</p>
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
