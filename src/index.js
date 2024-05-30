import {
  handleSearchEnter,
  handleFirstContentLoad,
  handleTempUnitButtonClick,
} from "./eventHandler.js";

const temperatureBtnContainer = document.getElementById(
  "temp-button-container",
);
const searchInput = document.getElementById("city-inquiry");

document.addEventListener("DOMContentLoaded", handleFirstContentLoad, {
  once: true,
});
searchInput.addEventListener("keydown", handleSearchEnter);
temperatureBtnContainer.addEventListener("click", handleTempUnitButtonClick);
