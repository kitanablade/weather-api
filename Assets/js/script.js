var now = moment();
var currentDay = now.format("MMM Do, YYYY");
const openWXapiKey = "a8d8c2258511aba345cf88e92d799e37";
/*
Search or saved buttons onclick ->

getWXdata(cityName){
    if city = null, polite error message
    if city ! null:
    get data from API
    populate info on main display
    populate info on cards (loop)}
    add city to set, local storage

    loop through set and create buttons
*/

function getSrchInput(event) {
  event.preventDefault();
  // Get raw city input, then capitalize the first letter
  inputCity = document.querySelector("#cityTextInput").value;
  var city = inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
  // Get set of cities out of local storage. If this is the first time the user accesses the
  // app, create one.
  // TODO: make array a set to avoid duplicates
  var citiesArray = JSON.parse(localStorage.getItem("cities"));
  if (citiesArray === null) {
    localStorage.setItem("cities", JSON.stringify([city]));
  } else {
    citiesArray.push(city);
    localStorage.setItem("cities", JSON.stringify(citiesArray));
    console.log("Local Storage: ", citiesArray);
  }
  getWXdata(city);
}

function getWXdata(city) {
  const currWeatherURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    openWXapiKey +
    "&units=imperial";
  if (city === null) {
    return alert("Sorry, that city wasn't found. Please try again.");
  } else {
    fetch(currWeatherURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let wxIconLink = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`

        //Populate main current weather data section
        document.querySelector(".current-cond").innerHTML =
          city + " (" + currentDay + ")";
        document.querySelector(
          "#sky-cond-icon"
        ).innerHTML = `<img class="imgIcon" src="${wxIconLink}" alt="weather-icon">`;
        document.querySelector("#current-temp").innerHTML = Math.round(data.main.temp) + " &#8457";
        document.querySelector("#current-wind").innerHTML =
          "Wind Direction and Speed: " + data.wind.deg + " @ " + Math.round(data.wind.speed) + " MPH";
        document.querySelector("#current-humidity").innerHTML =
          "Humidity: " + data.main.humidity + " %";
      });
  }
}
