// Date
let dateEl = document.querySelector(".date");
let currentTime = new Date();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dayIndex = currentTime.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let monthIndex = currentTime.getMonth();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let yearIndex = currentTime.getFullYear();
let date = currentTime.getDate();

dateEl.innerHTML = `${hours}:${minutes} ${days[dayIndex]} ${date} ${yearIndex}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// Forecast next 5 days

function getForecast(coordinates) {
  let apiKey = "343bb4d2fc1a4234edcd750t80ofe9d0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  let temperature = Math.round(response.data.temperature.current);
  document.querySelector(".location-and-date_location").innerHTML =
    response.data.city;
  document.querySelector(".current-temperature_value").innerHTML = Math.round(
    response.data.temperature.current
  );
  let weatherDescription = document.querySelector(
    ".current-temperature_description"
  );
  weatherDescription.innerHTML = response.data.condition.description;
  document.querySelector(
    ".current-stats-humidity"
  ).innerHTML = `${response.data.temperature.humidity}%`;
  document.querySelector(".current-stats-wind").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;
  let iconEl = document.querySelector(".current-temperature_icon");
  iconEl.setAttribute("src", response.data.condition.icon_url);
  weatherDescription.setAttribute("alt", response.data.condition.description);

  celsiusTemperature = response.data.temperature.current;
  getForecast(response.data.coordinates);
}

function displayCity(event) {
  event.preventDefault();
  let location = document.querySelector(".location-and-date_location");
  let cityInput = document.querySelector("#city-input");
  location.innerHTML = cityInput.value;
  // Api
  let apiKey = "343bb4d2fc1a4234edcd750t80ofe9d0";
  let units = "metric";
  let city = cityInput.value;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=343bb4d2fc1a4234edcd750t80ofe9d0&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

function displayLocalWeather() {
  function getCurrentPosition(geolocation) {
    let latitude = geolocation.coords.latitude;
    let longitude = geolocation.coords.longitude;
    let apiKey = "343bb4d2fc1a4234edcd750t80ofe9d0";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

    axios.get(apiUrl).then(displayWeather);
  }

  navigator.geolocation.getCurrentPosition(getCurrentPosition);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", displayCity);

let currentLocationButton = document.getElementById("current-location");
currentLocationButton.addEventListener("click", displayLocalWeather);

displayLocalWeather();
