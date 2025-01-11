"use client";
import React, { useEffect, useState } from "react";
import "./Header.css";
import { GetAllData } from "@/app/getAllData";
import { useCryptoData } from "@/app/context/CryptoDataContext";

// Типы данных
interface DataItem {
  id: string;
  name: string;
  image: string;
}

// Хук debounce
const useDebounce = (value: string, delay: number): string => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

export const Header: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [data, setData] = useState<DataItem[]>([]);
  const [filteredResults, setFilteredResults] = useState<DataItem[]>([]);
  const debouncedInput = useDebounce(input, 300);

  // Данные из контекста
  const { storage, updateStorage } = useCryptoData();

  // Получение данных
  useEffect(() => {
    async function fetchData() {
      try {
        const result = (await GetAllData()) || [];
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Фильтрация данных
  useEffect(() => {
    const query = debouncedInput.toLowerCase();
    console.log("Фильтрация по запросу:", query);
    if (!query) {
      setFilteredResults([]);
      return;
    }

    const results = data.filter(
      (coin) =>
        coin.id.toLowerCase().includes(query) ||
        coin.name.toLowerCase().includes(query)
    );

    setFilteredResults(results);
  }, [debouncedInput, data]);

  // Функция для добавления монеты
  const handleAddCoin = async (coinId: string) => {
    const count = Math.floor(Math.random() * 10) / 10 + 0.1; // count теперь число


    if (storage.some((item) => item.id === coinId)) {
      alert("Такой токен уже есть");
      return;
    }

    try {
      const response = await fetch(
        `https://data-api.cryptocompare.com/index/cc/v1/latest/tick?market=cadli&instruments=${coinId}-USD&apply_mapping=true&api_key=YOUR_API_KEY`
      );
      const price = await response.json();

      if (!price.Data[`${coinId}-USD`]) {
        alert("У этой монеты нет пары с USD");
        return;
      }

      const newCoin = { id: coinId, count };

      // Обновляем контекст и localStorage
      updateStorage([...storage, newCoin]);
    } catch (error) {
      console.error("Ошибка при добавлении монеты:", error);
    }
  };

  return (
    <header className="header">
      <p className="header__tag">Dashboard</p>
      <div className="header__search">
        <input
          className="header__input"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <img className="header__search-img" src="./search-normal.svg" />
        {/* Отображение результатов */}
        <div className="header__results">
          {filteredResults.length > 0 ? (
            filteredResults.map((coin) => (
              <div
                key={coin.id}
                className="header__result-item"
                data-coin-id={coin.id}
              >
                <span className="header__result-item-name">
                  {coin.name} ({coin.id})
                </span>
                <button
                  className="header__result-item-button"
                  onClick={() => handleAddCoin(coin.id)}
                >
                  +
                </button>
              </div>
            ))
          ) : (
            debouncedInput && (
              <p className="header__no-results">No results found</p>
            )
          )}
        </div>
      </div>
      <div className="header__buttons-block">
        <button className="header__notifications">
          <img className="header__account-arrow" src="./Notification.svg" />
        </button>
        <button className="header__account-button">
          <img className="header__account-img" />
          <p className="header__account-name">Courtney Henry</p>
          <img className="header__account-arrow" src="./arrow-down.svg" />
        </button>
      </div>
    </header>
  );
};
