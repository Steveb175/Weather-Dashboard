// Global variables for current weather
var searchButton = document.querySelector(".city-search");
var currentCityWeather = document.querySelector("#current-city-weather");
var currentCityName = document.querySelector("#current-city-name");
var currentTemp = document.querySelector("#current-temp");
var currentWind = document.querySelector("#current-wind");
var currentHumidity = document.querySelector("#current-humidity");
var windowDisplay = document.querySelector("#weather-display");

// API key
var apiKey = "f99598aacae7785a52e71cedad2a806e";
// City variable
var city;

// Fetch the API for today and apply to page
function getApiToday(requestUrlToday) {
  fetch(requestUrlToday)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      currentCityName.textContent = data.name;
      currentTemp.textContent = "Temp: " + data.main.temp + "°F";
      currentWind.textContent = "Wind: " + data.wind.speed + "mph";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      console.log(data);
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
}

// Forecast fetch
function getApiForecast(requestUrlForecast) {
  fetch(requestUrlForecast)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Network response for the forecast was not ok");
      }
      return response.json();
    })
    .then(function (data) {
      // Set initial variables
      var date;
      var temp;
      var wind;
      var humidity;
      // log the data
      console.log(data);
      for (let i = 1; i < 6; i++) {
        // Identifying the ids + i
        var date = document.querySelector("#date" + i);
        var temp = document.querySelector("#temp" + i);
        var wind = document.querySelector("#wind" + i);
        var humidity = document.querySelector("#humidity" + i);
        // Convert Unix timestamp to JavaScript Date object using dayjs
        var dateDay = dayjs.unix(data.list[i].dt);
        // Set text content of each id + i
        date.textContent = dateDay.format("dddd");
        temp.textContent = "Temp: " + data.list[i].main.temp + "°F";
        wind.textContent = "Wind: " + data.list[i].wind.speed + "mph";
        humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
      }
    })
    .catch(function (error) {
      console.error(
        "There was a problem with the forecast fetch operation:",
        error
      );
    });
}
// Function to show the weather display
function showDisplay() {
  windowDisplay.classList.remove("hide");
}

// Create new city button function
function newCityListItem(city) {
  // Create new button
  var storedCities = document.querySelector("#stored-cities");
  var newCity = document.createElement("button");
  storedCities.appendChild(newCity);
  newCity.textContent = city.toUpperCase();
  // Event listener added to new button
  newCity.addEventListener("click", function () {
    localStorage.setItem("cityName", city);
    // Requested URL variable
    var requestUrlToday =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      apiKey +
      "&units=imperial";
    var requestUrlForecast =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&exclude=hourly" +
      "&appid=" +
      apiKey +
      "&units=imperial";
    getApiToday(requestUrlToday);
    getApiForecast(requestUrlForecast);
  });
}

// Search button fetches data for desired city
function showCity() {
  var cityInput = document.querySelector("#city-input");
  var city = cityInput.value;
  window.city = city;
  var cityName = localStorage.setItem("cityName", city);
  window.city = cityName;
  setTimeout(function () {
    newCityListItem(city);
  }, 500);
  // Requested URL variable
  var requestUrlToday =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=imperial";
  var requestUrlForecast =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&exclude=hourly" +
    "&appid=" +
    apiKey +
    "&units=imperial";
  getApiToday(requestUrlToday);
  getApiForecast(requestUrlForecast);
  setTimeout(showDisplay, 500);
}
