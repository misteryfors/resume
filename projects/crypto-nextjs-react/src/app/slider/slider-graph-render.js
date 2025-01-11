import { Chart, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend, LineController, Filler, PointElement } from 'chart.js';

// Регистрируем все необходимые компоненты для работы с графиками
Chart.register(
    CategoryScale,     // Масштаб для оси X (категориальный)
    LinearScale,       // Масштаб для оси Y (линейный)
    LineElement,       // Элемент линии
    Title,             // Заголовок графика
    Tooltip,           // Всплывающие подсказки
    Legend,            // Легенда
    LineController,    // Контроллер для линейного графика
    Filler,            // Для заливки под графиком
    PointElement       // Элемент для точек на графике
);

export function graphRender(data, ctx) {
  const chartLabels = data.Data.map(item => {
    const date = new Date(item.TIMESTAMP * 1000);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  });

  const chartData = data.Data.map(item => item.CLOSE);

  // Проверяем, связан ли canvas с существующим графиком и уничтожаем его
  if (Chart.getChart(ctx)) {
    Chart.getChart(ctx).destroy();
  }

  new Chart(ctx, {
    type: 'line',  // Тип графика - линия
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: 'Цена закрытия (BTC-USD)',
          data: chartData,
          borderColor: '#2979ff',
          backgroundColor: 'rgba(41, 121, 255, 0.0)',
          borderWidth: 2,
          tension: 0.0,
          fill: true,
          pointRadius: chartData.map((_, index) => (index === chartData.length - 1 ? 5 : 0)),
          pointBackgroundColor: chartData.map((_, index) =>
              index === chartData.length - 1 ? '#2979ff' : 'rgba(0,0,0,0)'
          ),
        },
      ],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: false,
          labels: {
            color: '#ffffff',
          },
        },
      },
      scales: {
        x: {
          type: 'category',  // Ось X - категориальная
          display: false,
          ticks: {
            color: '#ffffff',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
        y: {
          type: 'linear',  // Ось Y - линейная
          display: false,
          ticks: {
            color: '#ffffff',
          },
          grid: {
            color: 'rgba(255, 255, 255, 0.1)',
          },
        },
      },
    },
  });
}

