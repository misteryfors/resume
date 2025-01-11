import { addCoin } from "../../content/addCoin.js";

export function searchFunc(data) {
    const searchInput = document.querySelector(".header__input");
    const searchResults = document.querySelector(".header__results");

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();

        if (!query) {
            searchResults.style.display = 'none';
            return;
        }

        const filteredResults = Object.keys(data).filter(key => {
            const coin = data[key];
            return key.toLowerCase().includes(query) || coin.name.toLowerCase().includes(query);
        });

        searchResults.innerHTML = '';

        if (filteredResults.length > 0) {
            filteredResults.forEach(key => {
                const coin = data[key];
                const resultItem = document.createElement('div');
                resultItem.className = 'header__result-item';
                resultItem.dataset.coinId = key;

                resultItem.innerHTML = `
                    <span class="header__result-item-name">${coin.name} (${key})</span>
                    <button class="header__result-item-button">+</button>
                `;

                searchResults.appendChild(resultItem);
            });
            searchResults.style.display = 'block';
        } else {
            searchResults.style.display = 'none';
        }
    });

    searchResults.addEventListener('click', (event) => {
        const target = event.target;
        const resultItem = target.closest('.header__result-item');

        if (!resultItem) return;

        const coinId = resultItem.dataset.coinId;

        if (target.classList.contains('header__result-item-button')) {
            addCoin(coinId,Math.floor(Math.random() * 10)/10);
        } else {
            searchInput.value = data[coinId].name;
            searchResults.style.display = 'none';
        }
    });

    searchInput.addEventListener('focus', () => {
        if (searchInput.value) {
            searchResults.style.display = 'block';
        }
    });

    searchInput.addEventListener('blur', () => {
        setTimeout(() => {
            searchResults.style.display = 'none';
        }, 100);
    });

    searchResults.addEventListener('mousedown', (event) => {
        event.preventDefault();
    });
}
