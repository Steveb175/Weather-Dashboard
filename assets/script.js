// Global variables for current weather
var searchButton = document.querySelector(".city-search");
var currentCityWeather = document.querySelector("#current-city-weather");
var currentCityName = document.querySelector("#current-city-name");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");

// API key
var apiKey = "f99598aacae7785a52e71cedad2a806e";
// City variable
var city;

// Fetch the API and apply to page
function getApi(requestUrl) {
  fetch(requestUrl)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      currentCityName.textContent = currentTemp.textContent =
        "Temp: " + data.main.temp + "°F";
      currentWind.textContent = "Wind: " + data.wind.speed;
      currentHumidity.textContent = "Humidity: " + data.main.humidity;
      console.log(data);
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
}
// Search button fetches data for desired city
function showCity() {
  var cityInput = document.querySelector("#city-input");
  var city = cityInput.value;
  window.city = city;
  // Requested URL variable
  var requestUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";
  getApi(requestUrl);
}
