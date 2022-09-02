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
    var citiesArray = JSON.parse(localStorage.getItem("cities"));
    city = document.querySelector("#cityTextInput").value;
    if (citiesArray === null) {
        localStorage.setItem("cities", JSON.stringify([city]));
    }else{
        citiesArray.push(city);
        localStorage.setItem("cities", JSON.stringify(citiesArray));
        console.log("Local Storage: ", citiesArray);
    }
    // cities.push(storedCities);
    // localStorage.setItem("city" + cities);
    // citySearch(nameCapitalized);
    // const openWeatherURL =
    //   "https://api.openweathermap.org/data/2.5/weather?q=" +
    //   city +
    //   "&appid=" +
    //   openWXapiKey +
    //   "&units=imperial";
}

function getWXdata(city) {
  if (cityName === null) {
    return;
  } else {
    const wxData = fetch(openWeatherURL)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }
}
