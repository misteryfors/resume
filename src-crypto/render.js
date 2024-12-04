import {sliderRender} from "./content/main/slider/slider-render.js"
import {GetAllData} from "./content/getAllData.js";
import {chartRender} from "./content/main/chart/render-chart.js";
import {portfolioRender} from "./content/main/portfolio/portfolio-render.js";
import {searchFunc} from "./content/header/search.js";
import {addCoin} from "./content/addCoin.js";


export const data=await GetAllData();
const defaultData = [{id:'BTC',count:1.1}, {id:'ETH',count:0.2}, {id:'TON',count:0.3}, {id:'NOT',count:0.4}, {id:'SOL',count:0.5}];
export let storage = JSON.parse(localStorage.getItem("CryptoData")) || defaultData;

async function render(){

    console.log(storage);
    const slider = document.querySelector(".slider__list");
    await sliderRender(data,slider,storage);

    const chart = document.querySelector(".chart");
    await chartRender(data,chart,storage)

   const portfolio = document.querySelector(".portfolio")
   await portfolioRender(data,portfolio,storage)

    searchFunc(data);
}
render();