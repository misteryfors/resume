"use client";
import React, { useEffect, useState } from "react";
import './main.css';
import { Slider } from "@/app/slider/Slider";
import { GetAllData } from "./getAllData";
import { Portfolio } from "@/app/portfolio/Portfolio";
import { Chart } from "@/app/chart/Chart";
import { LiveMarket } from "@/app/live-market/LiveMarket";
import { useCryptoData } from "@/app/context/CryptoDataContext";

interface DataItem {
  id: string;
  name: string;
  image: string;
}

export default function Home() {
  const { storage } = useCryptoData(); // Получение данных из контекста
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    // Функция для получения данных с API
    async function fetchData() {
      const result = (await GetAllData()) || [];
      setData(result);
    }

    fetchData();
  }, []);

  useEffect(() => {
    // Обновление данных при изменении контекста
    console.log("Storage updated:", storage);
  }, [storage]);

  return (
    <main className="main">
      <div className="main__grid">
        <Slider data={data.filter(item => storage.some(storageItem => storageItem.id === item.id))} />
        <Portfolio data={data.filter(item => storage.some(storageItem => storageItem.id === item.id))} />
        <Chart data={data.filter(item => storage.some(storageItem => storageItem.id === item.id))} />
        <LiveMarket />
      </div>
    </main>
  );
}
