var weatherOutputContainer = document.getElementById("weatherOutput");
var icon = "";
var monthNames = [
  "January", "February", "March",
  "April", "May", "June", "July",
  "August", "September", "October",
  "November", "December"
];

function makeDatePretty(dateToMakePretty) {
    var date = new Date(dateToMakePretty);
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var prettyDate = `${day}, ${monthNames[monthIndex]}, ${year}`
    return prettyDate
}

function makeHourPretty(dateToMakePretty) {
    var date = new Date(dateToMakePretty);
    var hour = date.getHours();
    return hour;
}


var dates = new Date();
    console.log("dates", dates);

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
    var i = 0
    var j = 0;
    for (j; j < fiveDayList.length; j = j+8) {
            buildstring += `<div class="forecastDayCard col-md-2">`
            var prettyDate = makeDatePretty(weatherToParse.list[j].dt_txt)
            buildstring += `<h3>${prettyDate}</h3>`
            for (i + j; i <= j + 5 && i < 39; i++) {
                var weatherID = weatherToParse.list[i].weather[0].id;
                var completedWeatherIcon = `<i class="wi wi-owm-${weatherID}"></i>`
                var hours = makeHourPretty(weatherToParse.list[i].dt_txt)
                buildstring += `<p>${hours}: ${weatherToParse.list[i].main.temp}</p>`
                buildstring += `<p> ${weatherToParse.list[i].weather[0].description} </p>`
                buildstring += `${completedWeatherIcon}`
            }
            buildstring += `</div>`
        }
    buildstring+=`</div></div>`
    
    weatherOutputContainer.innerHTML = buildstring;
}