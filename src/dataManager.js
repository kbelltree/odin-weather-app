// fetch weatherAPI data is set to return 3 days forecast
export async function fetchWeatherDataByLocation(inputValue) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?q=${inputValue}&days=3&key=da3927a0644f4f798e5202647241905
        `,
      { mode: "cors" },
    );
    console.log(`fetchWeatherDataByLocation Started.`);
    if (!response.ok) {
      throw new Error(`Fetch API error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

function getDayFromDate(dateString) {
  // Transform date string to Date instance to use getDay()
  const formattedDate = new Date(dateString);
  const daysArray = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayIndex = formattedDate.getDay();
  if (isNaN(dayIndex)) {
    console.error("The date is invalid.");
    return;
  }
  return daysArray[dayIndex];
}

// Make accessing a piece of data easier than direct access to original data
export function getTransformedData(fetchedData) {
  return {
    current: {
      cityNameText: fetchedData.location.name,
      regionText: fetchedData.location.region,
      cityAndRegion: `${fetchedData.location.name}, ${fetchedData.location.region}`,
      localTimeDate: fetchedData.location.localtime,
      conditionIconUrl: fetchedData.current.condition.icon,
      conditionText: fetchedData.current.condition.text,
      tempC: `${fetchedData.current.temp_c}°C`,
      feelsLikeC: `${fetchedData.current.feelslike_c}°C`,
      tempF: `${fetchedData.current.temp_f}°F`,
      feelsLikeF: `${fetchedData.current.feelslike_f}°F`,
      humidity: `${fetchedData.current.humidity}%`,
    },
    // Sorted data returned in a new array for easier access to data
    forecastArray: fetchedData.forecast.forecastday.map((dataObj) => {
      return {
        date: dataObj.date,
        dayOfWeek: getDayFromDate(dataObj.date),
        maxTempC: `${dataObj.day.maxtemp_c}°`,
        minTempC: `${dataObj.day.mintemp_c}°`,
        maxTempF: `${dataObj.day.maxtemp_f}°`,
        minTempF: `${dataObj.day.mintemp_f}°`,
        precipitation: `${dataObj.day.daily_chance_of_rain}%`,
        iconUrl: dataObj.day.condition.icon,
      };
    }),
  };
}
