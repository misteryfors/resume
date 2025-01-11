"use client"
import React, { useEffect, useState } from "react";
import './portfolio.css';
import { useCryptoData } from "@/app/context/CryptoDataContext"; // Импортируем хук для контекста

interface CoinData {
    id: string;
    name: string;
    image?: string;
}

interface PriceData {
    Data: Record<string, {
        VALUE: number;
        CURRENT_DAY_CHANGE_PERCENTAGE: number;
    }>;
}

interface PortfolioProps {
    data: CoinData[];
}

export const Portfolio: React.FC<PortfolioProps> = ({data }) => {
    // Получаем данные и функцию обновления из контекста
    const { storage, updateStorage } = useCryptoData();
    const [price, setPrice] = useState<PriceData | null>(null);

    const deleteFunction = (id: string) => {
        const updatedStorage = storage.filter(item => item.id !== id);
        updateStorage(updatedStorage); // Обновляем данные в контексте
    };

    useEffect(() => {
        async function fetchPrice() {
            if (!storage.length) return;

            const instruments = storage.map(coin => `${coin.id}-USD`).join(",");
            try {
                const response = await fetch(`https://data-api.cryptocompare.com/index/cc/v1/latest/tick?market=cadli&instruments=${instruments}&apply_mapping=true&api_key=YOUR_API_KEY`);
                const result = await response.json();
                if (result?.Data) {
                    setPrice(result);
                }
            } catch (error) {
                console.error("Error fetching price data:", error);
            }
        }

        fetchPrice();
    }, [storage]);

    const dataObject = data.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
    }, {} as Record<string, CoinData>);

    return (
      <div className="main__portfolio portfolio">
          <p className="main__name">My Portfolio</p>
          {price && Object.keys(price.Data).length > 0 ? (
            storage.map(coin => {
                const priceData = price.Data[`${coin.id}-USD`];
                if (!priceData) {
                    // Если данных для монеты нет, пропускаем рендеринг
                    return null;
                }

                return (
                  <div className="portfolio__item" key={coin.id} data-coin-id={coin.id}>
                      <button className="portfolio__item-button" onClick={() => deleteFunction(coin.id)}>
                          <img
                            className="portfolio__item-icon"
                            src={dataObject[coin.id]?.image || undefined} // если нет изображения, ставим undefined// если нет изображения, ставим null
                            alt={dataObject[coin.id]?.name || "Unknown"}
                          />

                      </button>
                      <div className="portfolio__item-text">
                          <p className="portfolio__item-main">
                          <span className="portfolio__item-main--name">{dataObject[coin.id]?.name || "Unknown"}</span>
                              <span className="portfolio__item-main--price">{(priceData.VALUE * coin.count).toFixed(2) + "$"}</span>
                          </p>
                          <p className="portfolio__item-support">
                              <span className="portfolio__item-support--different-down">{priceData.CURRENT_DAY_CHANGE_PERCENTAGE.toFixed(2)}%</span>
                              <span className="portfolio__item-support--price">{Number(coin.count).toFixed(7) + coin.id}</span>
                          </p>
                      </div>
                  </div>
                );
            })
          ) : (
            <p>No data available</p>
          )}
      </div>
    );
};
