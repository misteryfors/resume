import "https://cdn.jsdelivr.net/npm/chart.js";

export function graphRender(data, ctx) {
    const chartLabels = data.Data.map(item => {
        const date = new Date(item.TIMESTAMP * 1000); // Преобразование из UNIX-времени в миллисекунды
        return date.toLocaleDateString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    });

    const chartData = data.Data.map(item => item.CLOSE);

    // Построение графика
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: chartLabels,
            datasets: [{
                label: 'Цена закрытия (BTC-USD)',
                data: chartData,
                borderColor: '#2979ff',
                backgroundColor: 'rgba(41, 121, 255, 0.0)',
                borderWidth: 2,
                tension: 0.0,
                fill: true,
                pointRadius: chartData.map((_, index) => index === chartData.length - 1 ? 5 : 0), // Радиус только для последней точки
                pointBackgroundColor: chartData.map((_, index) => index === chartData.length - 1 ? '#2979ff' : 'rgba(0,0,0,0)')
            }]
        },
        options: {
            responsive: true,
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
                    display: false,
                    ticks: {
                        color: '#ffffff'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    }
                },
                y: {
                    display: false,
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
}
