import {
  fetchWeatherDataByLocation,
  getTransformedData,
} from "./dataManager.js";
import {
  getInputLocationValue,
  getTemperatureUnit,
  displayCurrentWeather,
  displayForecast,
  displayErrorMessage,
  highlightCurrentTempUnit,
} from "./UI.js";

let currentTempUnit = "f";
let currentLocation = "san francisco, us";

// Attach to search box
function updateLocation(e) {
  currentLocation = getInputLocationValue(e.target);
  console.log(`location: ${currentLocation}`);
}

async function displayProcessedWeatherData() {
  try {
    const rawData = await fetchWeatherDataByLocation(currentLocation);
    const transformedData = getTransformedData(rawData);
    const currentWeatherObj = transformedData.current;
    const forecastDataArray = transformedData.forecastArray;
    displayCurrentWeather(currentWeatherObj, currentTempUnit);
    displayForecast(forecastDataArray, currentTempUnit);
  } catch (error) {
    console.error(`Error displaying weather data: ${error}`);
    displayErrorMessage(`Precise entry would be helpful.`);
  }
}

export function handleSearchEnter(e) {
  // Set up Enter key is the only key that invokes search related functions
  if (e.key === "Enter") {
    updateLocation(e);
    displayProcessedWeatherData();
  }
}

export function handleFirstContentLoad() {
  displayProcessedWeatherData();
}

// Attach this event listener to parent div
export function handleTempUnitButtonClick(e) {
  if (e.target.id === "celsius" || e.target.id === "fahrenheit") {
    currentTempUnit = getTemperatureUnit(e.target);
    highlightCurrentTempUnit(currentTempUnit);
    displayProcessedWeatherData();
  }
  console.log(`current unit: ${currentTempUnit}`);
}
