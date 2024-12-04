import { graphRender } from "./chart-graph.js";

let currentChart;
const API_KEY = "ВАШ_API_KEY"; // замените на ваш настоящий API ключ

export async function chartRender(data, chart, storage) {
    let selectedCoin = 'BTC'; // Изначально выбранная криптовалюта
    chart.innerHTML = `
        <p class="main__name">Chart</p>
        <div class="chart__menu">
            <p class="chart__menu--left">
                <select class="chart__coin-select">
                    ${storage.map(coin => `<option value="${coin.id}">${data[coin.id].name}/${coin.id}</option>`).join('')}
                </select>
                <span class="chart__coin-price">$35,352.02</span>
            </p>
            <div class="chart__menu--right">
                <button id="chart-1h" class="chart__button">1h</button>
                <button id="chart-3h" class="chart__button">3h</button>
                <button id="chart-1d" class="chart__button">1d</button>
                <button id="chart-1w" class="chart__button">1w</button>
                <button id="chart-1m" class="chart__button">1m</button>
            </div>
        </div>
        <div class="chart__graph">
            <canvas id="priceChart"></canvas>
        </div>
    `;

    const ctx = document.getElementById('priceChart').getContext('2d');

    async function fetchData(url) {
        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data && data.Data) {
                if (currentChart) {
                    currentChart.destroy();
                    currentChart = null;
                }

                let close = "$" + data.Data[data.Data.length - 1].CLOSE;
                document.querySelector(".chart__coin-price").innerText = close.slice(0, 7);
                currentChart = graphRender(data, ctx);

            } else {
                console.error('Ошибка при получении данных.');
            }
        } catch (error) {
            console.error('Ошибка при запросе данных:', error);
        }
    }

    function getApiUrl(interval,limits) {
        return `https://data-api.cryptocompare.com/index/cc/v1/historical/${interval}?market=cadli&instrument=${selectedCoin}-USD&limit=${limits}&aggregate=1&fill=true&apply_mapping=true&response_format=JSON&api_key=${API_KEY}`;
    }

    // Обработчики для кнопок с интервалами
    document.getElementById('chart-1h').addEventListener('click', () => fetchData(getApiUrl('minutes',60)));
    document.getElementById('chart-3h').addEventListener('click', () => fetchData(getApiUrl('minutes',180)));
    document.getElementById('chart-1d').addEventListener('click', () => fetchData(getApiUrl('hours',24)));
    document.getElementById('chart-1w').addEventListener('click', () => fetchData(getApiUrl('days',7)));
    document.getElementById('chart-1m').addEventListener('click', () => fetchData(getApiUrl('days',30)));

    // Обработчик изменения валюты
    document.querySelector('.chart__coin-select').addEventListener('change', async (event) => {
        selectedCoin = event.target.value;
        await fetchData(getApiUrl('minutes',60)); // Перезагрузить график при смене валюты
    });

    // Изначальная загрузка графика
    await fetchData(getApiUrl('minutes',60));
}
