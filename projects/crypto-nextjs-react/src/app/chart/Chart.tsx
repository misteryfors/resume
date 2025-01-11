"use client";
import './chart.css';
import React, { useEffect, useRef, useState } from 'react';
import { graphRender } from "@/app/chart/chart-graph";
import {useCryptoData} from "@/app/context/CryptoDataContext";
import { Chart as ChartJS} from 'chart.js';


interface CoinData {
  id: string;
  name: string;
}

interface PriceDataItem {
  TIMESTAMP: number;
  CLOSE: number;
}

interface ChartProps {
  data: CoinData[];
}

const API_KEY = "ВАШ_API_КЛЮЧ"; // Замените на ваш ключ

export const Chart: React.FC<ChartProps> = ({ data = [] }) => {
  const { storage } = useCryptoData();
  const [dataObject, setDataObject] = useState<Record<string, CoinData>>({});
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');
  const [priceData, setPriceData] = useState<PriceDataItem[] | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    const dataToObject = data.reduce((acc, item) => {
      acc[item.id] = item;
      return acc;
    }, {} as Record<string, CoinData>);
    setDataObject(dataToObject);
  }, [data]);

  useEffect(() => {
    if (storage.length > 0 && storage[0].id) {
      setSelectedCoin(storage[0].id);
    }
    console.log(storage);
  }, [storage]);



  const fetchPriceData = async (coinId: string, interval: string, limit: number) => {
    try {
      const url = `https://data-api.cryptocompare.com/index/cc/v1/historical/${interval}?market=cadli&instrument=${coinId}-USD&limit=${limit}&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&api_key=${API_KEY}`;
      const response = await fetch(url);
      const result = await response.json();
      console.log(result)
      if (result && result.Data) {
        setPriceData(result.Data);
      } else {
        console.error("Invalid response structure", result);
      }
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    if (selectedCoin) {
      fetchPriceData(selectedCoin, "minutes", 60); // Изначальная загрузка
    }
  }, [selectedCoin]);

  useEffect(() => {
    if (priceData && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx) {
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
        chartInstanceRef.current = graphRender(priceData, ctx);
      }
    }
    console.log(priceData!=null ? priceData[priceData.length-1] :"");
  }, [priceData]);

  const handleIntervalChange = (interval: string, limit: number) => {
    fetchPriceData(selectedCoin, interval, limit);
  };

  return (
    <div className="main__chart chart">
      <p className="main__name">Chart</p>
      <div className="chart__menu">
        <p className="chart__menu--left">
          <select
            className="chart__coin-select"
            value={selectedCoin}
            onChange={(e) => setSelectedCoin(e.target.value)}
          >
            {storage.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {dataObject[coin.id]?.name}/{coin.id}
              </option>
            ))}
          </select>
          <span className="chart__coin-price">{priceData != null ? priceData[priceData.length - 1]?.CLOSE + "$" : "Loading..."}</span>
        </p>
        <div className="chart__menu--right">
          <button className="chart__button" onClick={() => handleIntervalChange("minutes", 60)}>1h</button>
          <button className="chart__button" onClick={() => handleIntervalChange("minutes", 180)}>3h</button>
          <button className="chart__button" onClick={() => handleIntervalChange("hours", 24)}>1d</button>
          <button className="chart__button" onClick={() => handleIntervalChange("days", 7)}>1w</button>
          <button className="chart__button" onClick={() => handleIntervalChange("days", 30)}>1m</button>
        </div>
      </div>
      <div className="chart__graph">
        <canvas id="priceChart" ref={canvasRef}></canvas>
      </div>
    </div>
  );
};
