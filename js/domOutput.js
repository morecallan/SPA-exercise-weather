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

function outputforecastToDom(weatherToParse, heading) {
    var fiveDayList = weatherToParse.list;
    var buildstring = `<div class="weatherForecast" > <h2> ${heading}</h2>`;
    buildstring += `<div class="row">`
    for (var i = 0; i < fiveDayList.length; i = i + 8) {
        var weather = weatherToParse.list[i].weather[0].id;
        var completedWeatherIcon = `<i class="wi wi-owm-${weather}"></i>`
        buildstring += `<div class="forecastDayCard col-md-2">`
        buildstring += `<h3>${weatherToParse.list[i].dt_txt}</h3>`
        buildstring += `<p> Current Temp: ${weatherToParse.list[i].main.temp}</p>`
        buildstring += `<p> ${weatherToParse.list[i].weather[0].description} </p>`
        buildstring += `${completedWeatherIcon}</div>`
    }
    buildstring+=`</div></div>`
    
    weatherOutputContainer.innerHTML = buildstring;
}