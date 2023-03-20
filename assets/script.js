// Global variables for current weather
var searchButton = document.querySelector(".city-search");
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
      // Declared variables for the function
      var currentCityWeather = document.querySelector("#current-city-weather");
      var currentWeatherIcon = document.querySelector("#current-icon");
      var currentCityName = document.querySelector("#current-city-name");
      var currentTemp = document.querySelector("#current-temp");
      var currentIcon = document.querySelector("#current-icon");
      var currentWind = document.querySelector("#current-wind");
      var currentHumidity = document.querySelector("#current-humidity");
      //inserting data into the declared variables
      currentCityName.textContent = data.name;
      currentTemp.textContent = "Temp: " + data.main.temp + "°F";
      currentWind.textContent = "Wind: " + data.wind.speed + "mph";
      currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
      // pulls icon id from fetched data and combines it with params to get desired image
      var iconUrl =
        "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
      currentWeatherIcon.setAttribute("src", iconUrl);
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
      // Declared variables for the function
      var weatherIcon;
      var date;
      var temp;
      var wind;
      var humidity;
      // log the data
      console.log(data);
      for (let i = 0; i < 40; i += 8) {
        // Identifying the ids + i
        weatherIcon = document.querySelector("#icon" + (i / 8 + 1));
        date = document.querySelector("#date" + (i / 8 + 1));
        temp = document.querySelector("#temp" + (i / 8 + 1));
        wind = document.querySelector("#wind" + (i / 8 + 1));
        humidity = document.querySelector("#humidity" + (i / 8 + 1));
        // Icon URL
        var iconUrl =
          "https://openweathermap.org/img/wn/" +
          data.list[i].weather[0].icon +
          ".png";
        // Convert Unix timestamp to JavaScript Date object using dayjs
        var dateDay = dayjs.unix(data.list[i].dt);
        // Set text content of each id + i
        date.textContent = dateDay.format("dddd MM/DD/YYYY");
        temp.textContent = "Temp: " + data.list[i].main.temp + "°F";
        wind.textContent = "Wind: " + data.list[i].wind.speed + "mph";
        humidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
        // pulls icon id from fetched data and combines it with params to get desired image
        weatherIcon.setAttribute("src", iconUrl);
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
      "&exclude=current,minutely,hourly,alerts" +
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
