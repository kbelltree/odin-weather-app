import { parse, parseISO, getDay, format } from "date-fns";

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
  try {
    // Because forecast date is midnight UTC base, keep the date as is using parseISO instead of new Date() that causes localization.
    const formattedDate = parseISO(dateString);
    console.log(
      "original dateString: ",
      dateString,
      " formattedDate: ",
      formattedDate,
    );
    const dayIndex = getDay(formattedDate);
    console.log("dayIndex: ", dayIndex);
    const daysArray = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    if (isNaN(dayIndex)) {
      throw new Error("DayIndex is NaN.");
    }
    return daysArray[dayIndex];
  } catch (error) {
    console.error("Could not get the day of the week.: ", error.message);
    return null;
  }
}

function formatCurrentDateTime(dateTimeString) {
  try {
    const parsed = parse(dateTimeString, "yyyy-MM-dd HH:mm", new Date());
    console.log("parsedCurrentDateTime: ", parsed);
    if (isNaN(parsed)) {
      throw new Error("Invalid date");
    }
    const formattedResult = format(parsed, "EEEE, MMMM do 'at' h:mm a");
    return formattedResult;
  } catch (error) {
    console.error("Failed in formatting current date time: ", error.message);
    return null;
  }
}

// Weather code assigned with corresponding class name
const weatherColorNameByCode = {
  1000: "sunny",
  1003: "cloudy",
  1006: "cloudy",
  1009: "cloudy",
  1030: "foggy",
  1063: "rainy",
  1066: "rainy",
  1069: "rainy",
  1072: "rainy",
  1087: "storm",
  1114: "rainy",
  1117: "rainy",
  1135: "foggy",
  1147: "foggy",
  1150: "rainy",
  1153: "rainy",
  1168: "rainy",
  1171: "rainy",
  1180: "rainy",
  1183: "rainy",
  1186: "rainy",
  1189: "rainy",
  1192: "rainy",
  1195: "rainy",
  1198: "rainy",
  1201: "rainy",
  1204: "rainy",
  1207: "rainy",
  1210: "rainy",
  1213: "rainy",
  1216: "rainy",
  1219: "rainy",
  1222: "rainy",
  1225: "rainy",
  1237: "rainy",
  1240: "rainy",
  1243: "storm",
  1246: "rainy",
  1249: "rainy",
  1252: "rainy",
  1255: "rainy",
  1258: "rainy",
  1261: "rainy",
  1264: "rainy",
  1273: "rainy",
  1276: "storm",
  1279: "rainy",
  1282: "storm",
};

function transformIsDayToBoolean(number) {
  if (number === 1) {
    return true;
  } else if (number === 0) {
    return false;
  } else {
    console.error("Unexpected is_day value:", number);
    return;
  }
}

// Make accessing a piece of data easier than direct access to original data
export function getTransformedData(fetchedData) {
  return {
    current: {
      cityNameText: fetchedData.location.name,
      regionText: fetchedData.location.region,
      cityAndRegion: `${fetchedData.location.name}, ${fetchedData.location.region}`,
      localTimeDate: formatCurrentDateTime(fetchedData.location.localtime),
      conditionIconUrl: fetchedData.current.condition.icon,
      conditionText: fetchedData.current.condition.text,
      conditionCode: weatherColorNameByCode[fetchedData.current.condition.code],
      tempC: `${fetchedData.current.temp_c}°C`,
      feelsLikeC: `${fetchedData.current.feelslike_c}°C`,
      tempF: `${fetchedData.current.temp_f}°F`,
      feelsLikeF: `${fetchedData.current.feelslike_f}°F`,
      humidity: `${fetchedData.current.humidity}%`,
      isDay: transformIsDayToBoolean(fetchedData.current.is_day),
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
