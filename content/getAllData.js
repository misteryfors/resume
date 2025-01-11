export async function GetAllData() {
    try {
        const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
        const data = await response.json();
        const resultObject = {};
        Object.values(data.Data).forEach(coin => {
            resultObject[coin.Symbol] = {
                name: coin.CoinName,
                image: `https://www.cryptocompare.com${coin.ImageUrl}`
            };
        });

        console.log(resultObject['BTC']);
        return resultObject; // Возвращаем объект наружу
    } catch (error) {
        console.error('Ошибка запроса:', error);
    }
}
