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
  clearErrorMessage,
  highlightCurrentTempUnit,
} from "./UI.js";

let currentTempUnit = "f";
let currentLocation = "san francisco, us";

// Attach to search box
function updateLocation(e) {
  currentLocation = getInputLocationValue(e.target);
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
    console.error("Data display error: ", error.message);
    displayErrorMessage(`Precise city and country entry would be helpful.`);
  }
}

export function handleSearchEnter(e) {
  // Set up Enter key is the only key that invokes search related functions
  if (e.key === "Enter") {
    updateLocation(e);
    displayProcessedWeatherData();
  }
}

export function handleSearchInput() {
  clearErrorMessage();
}

export function handleFirstContentLoad() {
  displayProcessedWeatherData();
  highlightCurrentTempUnit(currentTempUnit);
}

// Attach this event listener to parent div
export function handleTempUnitButtonClick(e) {
  if (e.target.id === "celsius" || e.target.id === "fahrenheit") {
    currentTempUnit = getTemperatureUnit(e.target);
    highlightCurrentTempUnit(currentTempUnit);
    displayProcessedWeatherData();
  }
}
