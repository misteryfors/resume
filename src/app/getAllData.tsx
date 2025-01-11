interface CoinData {
    id:string;
    name: string;
    image: string;
}
interface ApiCoin {
    Symbol: string;
    CoinName: string;
    ImageUrl: string;
}

export async function GetAllData(): Promise<CoinData[]> {
    try {
        const response = await fetch("https://min-api.cryptocompare.com/data/all/coinlist");
        const data: { Data: Record<string, ApiCoin> } = await response.json();

        const resultArray: CoinData[] = Object.values(data.Data).map((coin) => ({
            id: coin.Symbol, // Обязательно добавьте id
            name: coin.CoinName,
            image: `https://www.cryptocompare.com${coin.ImageUrl}`
        }));
        console.log(resultArray);
        return resultArray;
    } catch (error) {
        console.error("Ошибка запроса:", error);
        return [];
    }
}

