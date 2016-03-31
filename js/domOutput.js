var weatherOutputContainer = document.getElementById("weatherOutput");
var icon = "";
var monthNames = [
  "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
];

var dayNames = [
  "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"
];

var hourNames = [
    "12<p class=smallText>AM</p>", "1<p class=smallText>AM</p>", "2<p class=smallText>AM</p>", "3<p class=smallText>AM</p>", "4<p class=smallText>AM</p>", "5<p class=smallText>AM</p>", "6<p class=smallText>AM</p>", "7<p class=smallText>AM</p>", "8<p class=smallText>AM</p>", "9<p class=smallText>AM</p>", "10<p class=smallText>AM</p>", "11<p class=smallText>AM</p>",
    "12<p class=smallText>PM</p>", "1<p class=smallText>PM</p>", "2<p class=smallText>PM</p>", "3<p class=smallText>PM</p>", "4<p class=smallText>PM</p>", "5<p class=smallText>PM</p>", "6<p class=smallText>PM</p>", "7<p class=smallText>PM</p>", "8<p class=smallText>PM</p>", "9<p class=smallText>PM</p>", "10<p class=smallText>PM</p>", "11<p class=smallText>PM</p>"
];

//Make an array of days
    //Array of 3-hour chunks
    //Object of icon, temp, description
var forecast = ["days":[]];

function parsingAPIToUsefulArray(weatherToParse) {
    //Determine day of weeks that will need to be added into Forecast array
    var firstDay = new Date(weatherToParse.list[0].dt_txt).getDay();
    var lastDay =  new Date(weatherToParse.list[39].dt_txt).getDay();
    var howManyDaysToDisplay =  firstDay - lastDay; //Make sure to make this postive int
    console.log("howManyDaysToDisplay", howManyDaysToDisplay);
    //Create and object for each item to be pushed to the array
    function makeEach3HourSpanIntoObject(weatherToParse) {
        for (var i = 0; i < weatherToParse.list.length; i++) {
        let weatherToObject = {};
        weatherObject.day = new Date(weatherToParse.list[0].dt_txt).getDay();
        weatherToObject.hour = new Date(weatherToParse.list[0].dt_txt).getHours();
        weatherObject.icon = `<i class="wi wi-owm-${weatherToParse.list[i].weather[0].id}"></i>`
        weatherObject.temp = weatherToParse.list[i].main.temp.toFixed(0);
        weatherObject.description = weatherToParse.list[i].weather[0].description;
    }

    //Cycle through days and create an array of objects using switch statement
    case: firstDay
        forecast.days[0].push(weatherToParse.makeEach3HourSpanIntoObject(weatherToParse));
    case: secondDay
        forecast.days[1].push(weatherToParse.makeEach3HourSpanIntoObject(weatherToParse));
    case: thirdDay
        forecast.days[2].push(weatherToParse.makeEach3HourSpanIntoObject(weatherToParse));
    case: fourthDay
        forecast.days[3].push(weatherToParse.makeEach3HourSpanIntoObject(weatherToParse));
    case: fifthDay
        forecast.days[4].push(weatherToParse.makeEach3HourSpanIntoObject(weatherToParse));
    case: sixthDay
        forecast.days[5].push(weatherToParse.makeEach3HourSpanIntoObject(weatherToParse));



    //Cycle through each array object and appropriate
    for (var i = 0; i < weatherToParse.list.length; i++) {
        if (weatherToParse.list[i].dt_txt.includes(firstHoursDay) {
            forecast.push(weatherToParse.list)
        }
    } 
}

function makeDatePretty(dateToMakePretty) {
    var date = new Date(dateToMakePretty);
    var dayOfWeek = date.getDay();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var prettyDate = `${dayNames[dayOfWeek]} ${monthNames[monthIndex]} ${day}, ${year}`
    return prettyDate
}

function makeHourPretty(dateToMakePretty) {
    var date = new Date(dateToMakePretty);
    var hour = date.getHours();
    var prettyHour = hourNames[hour];
    return prettyHour;
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
    var completedWeatherIcon = `<i class="wi wi-owm-${dayOrNight}-${weather}"></i>`
    buildstring += `<div class="currentWeather"><h2> ${heading} </h2>`
    buildstring += `<p> Current Temp: ${weatherToParse.main.temp}</p>`
    buildstring += `<p> ${weatherToParse.weather[0].description} </p>`
    buildstring += `${completedWeatherIcon}</div>`
    weatherOutputContainer.innerHTML = buildstring;
}

function outputforecastToDom(weatherToParse, heading) {
    var fiveDayList = weatherToParse.list;
    var buildstring = `<div class="weatherForecast"> <h2>${heading}</h2>`;
    buildstring += `<div class="row-fluid">`
    var i = 0
    var j = 0;
    for (j; j < fiveDayList.length; j = j+8) {
            buildstring += `<div class="forecastDayCard">`
            var prettyDate = makeDatePretty(weatherToParse.list[j].dt_txt)
            buildstring += `<h3>${prettyDate}</h3>`
            for (i + j; i <= j + 5 && i < 39; i++) {
                var weatherID = weatherToParse.list[i].weather[0].id;
                var completedWeatherIcon = `<i class="wi wi-owm-${weatherID}"></i>`;
                var hours = makeHourPretty(weatherToParse.list[i].dt_txt);
                buildstring += `<div class="forecastHourRow">`
                buildstring += `${completedWeatherIcon}`;
                buildstring += `<p>${hours}: ${weatherToParse.list[i].main.temp.toFixed(0)}&deg;</p>`;
                buildstring += `<p> ${weatherToParse.list[i].weather[0].description} </p>`;
                buildstring += `</div>`
            }
            buildstring += `</div>`
        }
    buildstring+=`</div></div>`
    
    weatherOutputContainer.innerHTML = buildstring;
}