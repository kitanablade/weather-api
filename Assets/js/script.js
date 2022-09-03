let now = moment();
let currentDay = now.format("MMM Do, YYYY");
// const openWXapiKey = "a8d8c2258511aba345cf88e92d799e37";
const openWXapiKey = "ddeaf2e65b5db636874978d44d4454d3";
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
  let city = inputCity.charAt(0).toUpperCase() + inputCity.slice(1);
  // Get set of cities out of local storage. If this is the first time the user accesses the
  // app, create one.
  // TODO: make array a set to avoid duplicates
  let citiesArray = JSON.parse(localStorage.getItem("cities"));
  if (citiesArray === null) {
    localStorage.setItem("cities", JSON.stringify([city]));
  } else {
    citiesArray.push(city);
    localStorage.setItem("cities", JSON.stringify(citiesArray));
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
        let wxIconLink = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;

        //Populate main current weather data section
        document.querySelector(".current-cond").innerHTML =
          city + " (" + currentDay + ")";
        document.querySelector(
          "#sky-cond-icon"
        ).innerHTML = `<img class="imgIcon" src="${wxIconLink}" alt="weather-icon">`;
        document.querySelector("#sky-cond-text").innerHTML =
          data.weather[0].main;
        document.querySelector("#current-temp").innerHTML =
          Math.round(data.main.temp) + " &#8457";
        document.querySelector("#current-wind").innerHTML =
          "Wind Direction and Speed: " +
          data.wind.deg +
          "&#176;" +
          " @ " +
          Math.round(data.wind.speed) +
          " MPH";
        document.querySelector("#current-humidity").innerHTML =
          "Humidity: " + data.main.humidity + " %";

        let lat = data.coord.lat;
        let long = data.coord.lon;
        var forcastquery = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&exclude=hourly,minutely&appid=${openWXapiKey}&units=imperial`;

        fetch(forcastquery)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {

           let uvIndex = data.current.uvi;
            let uvColor = "";
            let exposureLevel = "TEST";
            console.log(data);
            switch (true) {
              case uvIndex < 2:
                uvColor = "badge-low";
                exposureLevel = "Low";
                break;
              case uvIndex <= 5:
                uvColor = "badge-mod";
                exposureLevel = "Moderate";
                break;
              case uvIndex <= 7:
                uvColor = "badge-high";
                exposureLevel = "High";
                break;
              case uvIndex <= 10:
                uvColor = "badge-vhigh";
                exposureLevel = "Very High";
                break;
              case uvIndex >= 11:
                uvColor = "badge-extreme";
                exposureLevel = "Extreme";
            }

            document.querySelector(
              ".uv-index"
            ).innerHTML = `UV Index: <span class="badge" id="${uvColor}">${uvIndex}</span> ${exposureLevel}`;

          let forecastDays = 5;
          let forecastContainer = document.querySelector(".five-day-forecast");
          // Check to see if there are existing 5-day forecast cards. If so, remove them so 
          // the next run of the for loop does not add more on top of them
          // if(forecastContainer.firstChild != null){
          //   forecastContainer.removeChild("forecast-card");
          // }


          for (let i = 0; i < forecastDays; i++) {
            let temp = Math.round(data.daily[i].temp.day);
            console.log("TEMP: ", temp)
            let wind = Math.round(data.daily[i].wind_speed);
            let humidity = data.daily[i].humidity;
            let dailyWXIcon = `http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png`;
            let forecastDay = moment(currentDay, "MMMM-DD").add(i+1, 'days');
            forecastDay = forecastDay.format('MMM D')
            
            const forecastCard = document.createElement("div");
            forecastCard.setAttribute("id", "day-" + (i+1) + "-forecast");
            forecastCard.setAttribute("class", "forecast-card")
            let tempEl = document.createElement("h2");
            let windEl = document.createElement("h4");
            let humidEl = document.createElement("h4");
            let dayIcon = document.createElement("div");
            let dateEl = document.createElement("h2");
            dayIcon.innerHTML = `<img class="day-icon" src=${dailyWXIcon}>`
            tempEl.innerHTML=`${temp}&#8457`;
            windEl.innerHTML=`Wind: ${wind} MPH`;
            humidEl.innerHTML = `Humidity: ${humidity} %`;
            forecastContainer.append(forecastCard);
            dateEl.innerHTML = forecastDay;
            forecastCard.append(dateEl, tempEl, windEl, humidEl, dayIcon);

         
           }



          });
      });
  }
}
