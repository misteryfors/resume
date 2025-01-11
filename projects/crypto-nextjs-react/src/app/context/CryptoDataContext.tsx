"use client"
import React, { createContext, useContext, useEffect, useState } from "react";

// Тип данных
interface CoinData {
  id: string;
  count: number;
}

// Определение контекста
interface CryptoDataContextProps {
  storage: CoinData[];
  updateStorage: (newStorage?: CoinData[]) => void;  // Ожидаем параметр newStorage
}


// Создаём контекст
const CryptoDataContext = createContext<CryptoDataContextProps | undefined>(
  undefined
);

const defaultData:CoinData[] = [{id:'BTC',count:1.1}, {id:'ETH',count:0.2}, {id:'TON',count:0.3}, {id:'NOT',count:0.4}, {id:'SOL',count:0.5}];


// Провайдер контекста
export const CryptoDataProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                              children,
                                                                            }) => {
  const [storage, setStorage] = useState<CoinData[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("CryptoData");
    setStorage(storedData ? JSON.parse(storedData) : defaultData);
  }, []);

  const updateStorage = (newStorage?: CoinData[]) => {
    if (newStorage) {
      // Обновляем localStorage и состояние
      localStorage.setItem("CryptoData", JSON.stringify(newStorage));
      setStorage(newStorage);
    } else {
      // Обновляем состояние из localStorage
      const storedData = localStorage.getItem("CryptoData");
      setStorage(storedData ? JSON.parse(storedData) : []);
    }
  };

  useEffect(() => {
    console.log("storage обновлён")
    console.log(storage)
  }, [storage]);

  return (
    <CryptoDataContext.Provider value={{ storage, updateStorage }}>
      {children}
    </CryptoDataContext.Provider>
  );
};

// Хук для использования контекста
export const useCryptoData = () => {
  const context = useContext(CryptoDataContext);
  if (!context) {
    throw new Error(
      "useCryptoData must be used within a CryptoDataProvider"
    );
  }
  return context;
};
