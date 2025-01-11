import React, {useEffect, useRef, useState} from "react";
import "./slider.css";
import { graphRender } from "./slider-graph-render";

interface CoinData {
  id?: string;
  name?: string;
  image?: string;
  data?: {
    Data: { CLOSE: number }[];
  } | null;
}

interface SliderProps {
  data: CoinData[];
}

export const Slider: React.FC<SliderProps> = ({ data = Array(5).fill({}) }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [coinData, setCoinData] = useState<CoinData[]>(data);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateMaxIndex = () => {
      const container = listRef.current;
      if (container) {
        const containerWidth = container.clientWidth;
        const itemWidth = container.firstElementChild?.getBoundingClientRect().width || 0;
        const visibleItems = Math.floor(containerWidth / itemWidth);
        setMaxIndex(Math.max(0, coinData.length - visibleItems));
      }
    };

    calculateMaxIndex();
    window.addEventListener('resize', calculateMaxIndex);
    return () => window.removeEventListener('resize', calculateMaxIndex);
  }, [coinData]);

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

  useEffect(() => {
    async function fetchCoinPrice(coin: string) {
      try {
        const response = await fetch(
          `https://data-api.cryptocompare.com/index/cc/v1/historical/hours?market=cadli&instrument=${coin}-USD&limit=12&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&api_key=05d2a4b81b64c727e7cdd2efd17cf59fa181c65fca458ee56edb6271020a4ee1`
        );
        const result = await response.json();
        return result;
      } catch (error) {
        console.error(`Ошибка при получении данных для ${coin}:`, error);
        return null;
      }
    }

    async function fetchAllPrices() {
      setLoading(true);
      const updatedData = await Promise.all(
        data.map(async (coin) => {
          if (!coin.id) return coin;
          const fetchedData = await fetchCoinPrice(coin.id);
          return {
            ...coin,
            data: fetchedData || null,
          };
        })
      );
      setCoinData(updatedData);
      setLoading(false);
    }

    fetchAllPrices();
  }, [data]);

  useEffect(() => {
    if (!loading && Array.isArray(coinData)) {
      coinData.forEach((coin) => {
        if (coin.id && coin.data) {
          const canvas = document.getElementById(`${coin.id}-graph`) as HTMLCanvasElement;
          if (canvas) {
            graphRender(coin.data, canvas);
          }
        }
      });
    }
  }, [coinData, loading]);

  return (
    <div className="main__slider slider">
      <button
        className="slider__left-button"
        onClick={handleLeftClick}
        disabled={currentIndex === 0}
      ></button>
      <div className="slider__mask-gradient">
        <div className="slider__mask-gradient-overlay">
          <div className="slider__list" ref={listRef}>
            {coinData.map((coin, index) => (
              <div className="slider__list-item" key={coin.id || index}>
                {coin.image ? (
                  <>
                    <img
                      className="slider__item-icon"
                      src={coin.image!}
                      alt={coin.name || "coin"}
                    />
                    <p className="slider__item-name">
                      <span className="slider__item-name--full">{coin.name}</span>
                      <span className="slider__item-name--short">{coin.id}</span>
                    </p>
                    <div className="slider__item-arrow-block">
                      {coin.data?.Data &&
                      (coin.data.Data[coin.data.Data.length - 1]?.CLOSE -
                        coin.data.Data[coin.data.Data.length - 3]?.CLOSE) / 100 > 0 ?
                        <img
                          className="slider__item-arrow"
                          id={`${coin.id}-arrow`}
                          src="./price-arrow-up.svg"
                          alt="arrow"
                        />
                        :
                        <img
                          className="slider__item-arrow"
                          id={`${coin.id}-arrow`}
                          src="./price-arrow-down.svg"
                          alt="arrow"
                        />
                      }

                    </div>
                    <p className="slider__item-price">
                      {loading ? (
                        "Загрузка..."
                      ) : (
                        <>
                          <span className="slider__item-price--current" id={`${coin.id}-price`}>
                            {coin.data?.Data?.[coin.data.Data.length - 1]?.CLOSE.toFixed(2) || "N/A"}$
                          </span>
                          {coin.data?.Data &&
                          (coin.data.Data[coin.data.Data.length - 1]?.CLOSE -
                            coin.data.Data[coin.data.Data.length - 3]?.CLOSE) / 100 > 0 ?
                            <span className="slider__item-price--different-up" id={`${coin.id}-change`}>
                            {coin.data?.Data
                              ? (
                              (coin.data.Data[coin.data.Data.length - 1].CLOSE -
                                coin.data.Data[coin.data.Data.length - 3].CLOSE) /
                              100
                            ).toFixed(3) + "%"
                              : "N/A"}
                          </span>
                            :
                            <span className="slider__item-price--different-down" id={`${coin.id}-change`}>
                            {coin.data?.Data
                              ? (
                              (coin.data.Data[coin.data.Data.length - 1].CLOSE -
                                coin.data.Data[coin.data.Data.length - 3].CLOSE) /
                              100
                            ).toFixed(3) + "%"
                              : "N/A"}
                          </span>
                          }
                            </>
                            )}
                        </p>
                        <div className="slider__item-graph">
                        <canvas id={`${coin.id}-graph`}></canvas>
                  </div>
                  </>
                  ) : (
                  <div className="slider__item-placeholder">Loading...</div>
                  )}
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
  );
};
