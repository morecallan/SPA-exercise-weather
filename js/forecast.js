var weatherOutputContainer = document.getElementById("weatherOutput");
var buildstring = "";
var dayString = "";
var hourlyString = "";

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


function makeArrayOfObjectsForEach3HourSpan(forecastObject) {
    var arrayOfObjects = []
        for (var i = 0; i < forecastObject.list.length; i++) {
        let weatherObject = {};
        weatherObject.day = new Date(forecastObject.list[i].dt_txt).getDay();
        weatherObject.hour = new Date(forecastObject.list[i].dt_txt).getHours();
        weatherObject.icon = `<i class="wi wi-owm-${forecastObject.list[i].weather[0].id}"></i>`
        weatherObject.temp = forecastObject.list[i].main.temp.toFixed(0);
        weatherObject.description = forecastObject.list[i].weather[0].description;
        weatherObject.dt_txt = forecastObject.list[i].dt_txt
        arrayOfObjects.push(weatherObject)
    }
    buildstring += `<div class = "weatherForecast">`
    makeCards(arrayOfObjects);
    buildstring += `</div>`
    weatherOutputContainer.innerHTML = buildstring;
}

//Loop through the weatherObjects, every time it reaches hour 12am, create a new card
function makeCards(arrayOfObjects){
    for (var i = 0; i < arrayOfObjects.length; i++) {
        if (arrayOfObjects[i].hour === 0 || i === 0) {
            buildstring += makeNewCard(arrayOfObjects[i]);
        } else if (arrayOfObjects[i].hour === 21){
            buildstring += addToCurrentCard(arrayOfObjects[i])
            buildstring += `</div>`
        } else  {
            buildstring += addToCurrentCard(arrayOfObjects[i]);
        }
    }
}

function makeNewCard(currentObject) {
    dayString = `<div class="forecastDayCard">`
    var prettyDate = makeDatePretty(currentObject.dt_txt);
    dayString += `<h3>${prettyDate}</h3>`
    dayString += addToCurrentCard(currentObject);
    return dayString;
}

function addToCurrentCard(currentObject) {
    var hours = makeHourPretty(currentObject.dt_txt);
    hourlyString = `<div class="forecastHourRow">`
    hourlyString += `${currentObject.icon}`;
    hourlyString += `<p>${hours}: ${currentObject.temp}&deg;</p>`;
    hourlyString += `<p> ${currentObject.description} </p>`;
    hourlyString += `</div>`
    return hourlyString;
}
