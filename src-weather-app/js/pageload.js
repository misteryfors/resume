import { getWeatherData } from "./weatherData.js";
import { weatherDetails } from "./weatheDetails/weatherDetails.js";
import { currentWeather } from "./currentWeather/currentWeathe.js";
import { weatherSlider } from "./weatherSlider/weatherSliderDetails.js";

async function pageLoadCity(city) {
  let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=6e40db2d40af4681bce15022242210&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`;
  const weatherData = await getWeatherData(apiUrl);
  currentWeather(weatherData);
  weatherDetails(weatherData); 
  weatherSlider(weatherData);  
}

async function pageLoadGeo(latitude,longitude) {
    let apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=6e40db2d40af4681bce15022242210&q=${latitude},${longitude}&days=5&aqi=no&alerts=no`;

    const weatherData = await getWeatherData(apiUrl);
    currentWeather(weatherData);
    weatherDetails(weatherData); 
    weatherSlider(weatherData);  
  }


export { pageLoadCity, pageLoadGeo};
