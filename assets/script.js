// var searchButton = document.querySelector(".city-search");

// API key
var apiKey = "f99598aacae7785a52e71cedad2a806e";
// City variable
var city = "chicago";
// Requested URL variable
var requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?q=" +
  city +
  "&appid=" +
  apiKey;
// function searchCity() {
//   var urlCurrentDay =
//     "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
// }

fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => console.log(data));
