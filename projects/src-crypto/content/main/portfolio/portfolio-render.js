

export async function portfolioRender(data, portfolio, storage) {
    const response = await fetch(`https://data-api.cryptocompare.com/index/cc/v1/latest/tick?market=cadli&instruments=${storage.map(coin => coin.id+"-USD,")}&apply_mapping=true&api_key=05d2a4b81b64c727e7cdd2efd17cf59fa181c65fca458ee56edb6271020a4ee1`);
    const price = await response.json();

    portfolio.innerHTML = `
        <p class="main__name">My Portfolio</p>
            ${storage.map(coin =>
        `<div class="portfolio__item" data-coin-id="${coin.id}">
                <button class="portfolio__item-button">
                    <img class="portfolio__item-icon" src="${data[coin.id].image}">
                </button>
                <div class="portfolio__item-text">
                    <p class="portfolio__item-main">
                        <span class="portfolio__item-main--name">${data[coin.id].name}</span>
                        <span class="portfolio__item-main--price">$${(price.Data[coin.id+"-USD"].VALUE*coin.count).toPrecision(7)}</span>
                    </p>
                    <p class="portfolio__item-support">
                        <span class="portfolio__item-support--different-down">${price.Data[coin.id+"-USD"].CURRENT_DAY_CHANGE_PERCENTAGE.toFixed(2)}</span>
                        <span class="portfolio__item-support--price">${coin.count +" "+ coin.id}</span>
                    </p>
                </div>
            </div>`).join("")}
    `;

    // Добавляем обработчики событий на кнопки удаления
    const deleteButtons = document.querySelectorAll(".portfolio__item-button");
    deleteButtons.forEach(button => {
        button.addEventListener("click", () => {
            const coinElement = button.closest(".portfolio__item");
            const coinId = coinElement.getAttribute("data-coin-id");
            console.log(`Удалён coin: ${coinId}`);
            const updatedStorage = storage.filter(item => item.id !== coinId);
            storage.length = 0;  // Очистить текущий массив
            storage.push(...updatedStorage);  // Добавить элементы из обновленного массива

            // Обновляем `localStorage` с новым массивом
            localStorage.setItem("CryptoData", JSON.stringify(updatedStorage));
            portfolio.removeChild(coinElement);
            // Здесь можно добавить логику удаления монеты из storage или DOM
        });
    });
}
