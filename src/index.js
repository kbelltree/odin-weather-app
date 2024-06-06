import {
  handleSearchEnter,
  handleFirstContentLoad,
  handleTempUnitButtonClick,
  handleSearchInput,
} from "./eventHandler.js";

import "./style.css";

const temperatureBtnContainer = document.getElementById(
  "temp-button-container",
);
const searchInput = document.getElementById("city-inquiry");

document.addEventListener("DOMContentLoaded", handleFirstContentLoad, {
  once: true,
});
searchInput.addEventListener("keydown", handleSearchEnter);
searchInput.addEventListener("input", handleSearchInput);
temperatureBtnContainer.addEventListener("click", handleTempUnitButtonClick);
