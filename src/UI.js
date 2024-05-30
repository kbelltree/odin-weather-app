const uiElements = {
  messageText: document.getElementById("message"),
  tempCButton: document.getElementById("celsius"),
  tempFButton: document.getElementById("fahrenheit"),
  locationText: document.getElementById("location"),
  timeStampDisplay: document.getElementById("time-stamp"),
  currentIcon: document.getElementById("current-icon"),
  conditionDisplay: document.getElementById("condition"),
  currentTempDisplay: document.getElementById("current-temp"),
  feelsLikeDisplay: document.getElementById("feels-like"),
  humidityDisplay: document.getElementById("humidity"),
  forecastDayContainer: document.querySelectorAll(".forecast-container > div"),
};

function displayText(uiElement, dataProperty) {
  console.log("uiElement:", uiElement, "dataProperty:", dataProperty);
  uiElement.textContent = dataProperty;
}

function displayIcon(uiElement, dataProperty) {
  uiElement.src = dataProperty;
}

export function getInputLocationValue(uiElement) {
  // Hyphenate space or comma in the search input value
  const inputValue = uiElement.value.replace(/[\s,]+/g, "-");
  return inputValue;
}

export function getTemperatureUnit(uiElement) {
  return uiElement.value;
}

export function highlightCurrentTempUnit(state) {
  switch (state) {
    case "c":
      uiElements.tempFButton.classList.remove("on");
      uiElements.tempCButton.classList.add("on");
      break;
    case "f":
      uiElements.tempCButton.classList.remove("on");
      uiElements.tempFButton.classList.add("on");
      break;
    default:
      console.error("Error toggling Temp Button.");
      return;
  }
}

export function displayErrorMessage(messageStr) {
  uiElements.messageText.textContent = messageStr;
}

export function displayCurrentWeather(currentDataObj, tempUnit) {
  console.dir(currentDataObj);
  displayText(uiElements.locationText, currentDataObj.cityAndRegion);
  displayText(uiElements.timeStampDisplay, currentDataObj.localTimeDate);
  displayIcon(uiElements.currentIcon, currentDataObj.conditionIconUrl);
  displayText(uiElements.conditionDisplay, currentDataObj.conditionText);
  switch (tempUnit) {
    case "c":
      displayText(uiElements.currentTempDisplay, currentDataObj.tempC);
      displayText(uiElements.feelsLikeDisplay, currentDataObj.feelsLikeC);
      break;
    case "f":
      displayText(uiElements.currentTempDisplay, currentDataObj.tempF);
      displayText(uiElements.feelsLikeDisplay, currentDataObj.feelsLikeF);
      break;
    default:
      console.error("Error happened.");
      return;
  }
  displayText(uiElements.humidityDisplay, currentDataObj.humidity);
}

export function displayForecast(dataArray, tempUnit) {
  dataArray.forEach((dataObj, index) => {
    // Assign each set of day's data to children div of forecastDayContainer in order
    const dayDiv = uiElements.forecastDayContainer[index];
    displayText(dayDiv.querySelector(".what-day"), dataObj.dayOfWeek);
    displayIcon(dayDiv.querySelector(".icon"), dataObj.iconUrl);
    switch (tempUnit) {
      case "c":
        displayText(dayDiv.querySelector(".high-temp"), dataObj.maxTempC);
        displayText(dayDiv.querySelector(".low-temp"), dataObj.minTempC);
        break;
      case "f":
        displayText(dayDiv.querySelector(".high-temp"), dataObj.maxTempF);
        displayText(dayDiv.querySelector(".low-temp"), dataObj.minTempF);
        break;
      default:
        console.error("Error happened.");
        return;
    }
    displayText(dayDiv.querySelector(".precipitation"), dataObj.precipitation);
  });
}
