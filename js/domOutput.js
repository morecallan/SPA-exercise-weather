var weatherOutputContainer = document.getElementById("weatherOutput");
var icon = "";

function outputWeatherToDom(weatherToParse, heading) {
    var buildstring = "";
    var weather = weatherToParse.weather[0].id;
    var dayOrNight = "";
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    if (currentTime <= weatherToParse.sys.sunrise) {
        dayOrNight = "day";
    } else if (currentTime >= weatherToParse.sys.sunrise) {
        dayOrNight = "night";
    }
    var completedWeatherIcon = `<i class="wi wi-owm-${dayOrNight}-${weather}""></i>`
    buildstring += `<div class="currentWeather"><h2> ${heading} </h2>`
    buildstring += `<p> Current Temp: ${weatherToParse.main.temp}</p>`
    buildstring += `<p> ${weatherToParse.weather[0].description} </p>`
    buildstring += `${completedWeatherIcon}</div>`
    weatherOutputContainer.innerHTML = buildstring;
}