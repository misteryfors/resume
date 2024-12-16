import {data, storage} from "../render.js";

export async function addCoin(coin, count) {

    console.log(storage.filter(item => item.id === coin));
    if (storage.filter(item => item.id === coin).length===0)
    {
        const response = await fetch(`https://data-api.cryptocompare.com/index/cc/v1/latest/tick?market=cadli&instruments=${coin+"-USD,"}&apply_mapping=true&api_key=05d2a4b81b64c727e7cdd2efd17cf59fa181c65fca458ee56edb6271020a4ee1`);

        if (!response.ok) {
            alert("У этой монеты нет пары с USD");
        } else {
            const price = await response.json();

            // Проверка на пустые данные
            if (Object.keys(price.Data).length === 0) {
                console.log("Pusto");
                return;
            }

            let portfolio = document.querySelector(".main__portfolio");
            let newCoin = document.createElement("div");
            newCoin.className = "main__portfolio-item";
            newCoin.setAttribute("data-coin-id", coin);  // Устанавливаем ID монеты

            newCoin.innerHTML = `
                <button class="main__portfolio-item-button">
                        <img class="main__portfolio-item-icon" src="${data[coin].image}">
                </button>
                <div class="main__portfolio-item-text">
                    <p class="main__portfolio-item-main">
                        <span class="main__portfolio-item-main--name">${data[coin].name}</span>
                        <span class="main__portfolio-item-main--price">$${(price.Data[coin+"-USD"].VALUE * count).toPrecision(7)}</span>
                    </p>
                    <p class="main__portfolio-item-support">
                        <span class="main__portfolio-item-support--different-down">${price.Data[coin+"-USD"].CURRENT_DAY_CHANGE_PERCENTAGE.toFixed(2)}</span>
                        <span class="main__portfolio-item-support--price">${count + " " + coin}</span>
                    </p>
                </div>
            `;

            // Добавляем новый элемент в портфолио
            portfolio.appendChild(newCoin);

            // Добавляем монету в хранилище и сохраняем его в localStorage
            storage.push({id: coin, count: count});
            localStorage.setItem("CryptoData", JSON.stringify(storage));

            // Добавляем обработчик удаления
            const deleteButton = newCoin.querySelector(".main__portfolio-item-button");
            deleteButton.addEventListener("click", () => {
                console.log(`Удалён coin: ${coin}`);
                const updatedStorage = storage.filter(item => item.id !== coin);
                console.log(updatedStorage);
                storage.length = 0;  // Очистить текущий массив
                storage.push(...updatedStorage);  // Добавить элементы из обновленного массива
                // Обновляем `localStorage` с новым массивом
                localStorage.setItem("CryptoData", JSON.stringify(updatedStorage));
                // Здесь можно добавить логику удаления элемента из storage и DOM
                portfolio.removeChild(newCoin); // Удаляем элемент из DOM
            });
        }
    }
    else {
        alert("Такой токен уже есть");
    }
}
