import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Регистрируем все необходимые компоненты для работы с графиками
ChartJS.register(
  CategoryScale,     // Масштаб для оси X (категориальный)
  LinearScale,      // Масштаб для оси Y (линейный)
  LineElement,      // Элемент линии
  Title,            // Заголовок графика
  Tooltip,          // Всплывающие подсказки
  Legend            // Легенда
);

interface PriceDataItem {
    TIMESTAMP: number;
    CLOSE: number;
}

export function graphRender(data: PriceDataItem[], ctx: CanvasRenderingContext2D) {
    if (!Array.isArray(data) || data.length === 0) {
        console.error("Invalid or empty data provided to graphRender");
        return null;
    }

    const timestamps = data.map(item => item.TIMESTAMP * 1000);
    const minTimestamp = Math.min(...timestamps);
    const maxTimestamp = Math.max(...timestamps);
    const timeDiff = maxTimestamp - minTimestamp;

    let filteredData: PriceDataItem[];
    if (timeDiff <= 3 * 60 * 60 * 1000) { // Если диапазон меньше или равен 3 часам
        filteredData = data.filter(item => {
            const date = new Date(item.TIMESTAMP * 1000);
            return date.getMinutes() % 10 === 0; // выбираем только каждые 10 минут
        });
    } else {
        filteredData = data; // оставляем данные как есть для остальных диапазонов
    }

    const chartLabels = filteredData.map(item => {
        const date = new Date(item.TIMESTAMP * 1000);
        if (timeDiff <= 3 * 60 * 60 * 1000) { // для 1 и 3 часов
            return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
        } else if (timeDiff <= 24 * 60 * 60 * 1000) { // для 1 дня
            return date.toLocaleTimeString('ru-RU', { hour: '2-digit' });
        } else if (timeDiff <= 7 * 24 * 60 * 60 * 1000) { // для 7 дней
            return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
        } else { // для 30 дней и более
            return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }
    });

    const chartData = filteredData.map(item => item.CLOSE);

    // Создаем и возвращаем новый график
    const chart = new ChartJS(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Цена закрытия',
                data: chartData,
                borderColor: '#2979ff',
                backgroundColor: 'rgba(41, 121, 255, 0.1)',
                borderWidth: 2,
                tension: 0.0,
                fill: false,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        color: '#ffffff'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#ffffff',
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                }
            }
        }
    });

    return chart;
}
