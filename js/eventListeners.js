var currentWeatherButton = document.getElementById("current");
var forecastWeatherButton = document.getElementById("forecast");

function activateEventListeners() {
    currentWeatherButton.addEventListener("click", collectCurrentWeatherData);
    forecastWeatherButton.addEventListener("click", collectForecastWeatherData);
};

function disableEventListeners() {
    currentWeatherButton.removeEventListener("click", collectCurrentWeatherData);
    forecastWeatherButton.removeEventListener("click", collectForecastWeatherData);
};

function collectCurrentWeatherData() {
    let userInputZip = document.getElementsByName("postalCode")[0].value
    Weather.loadWeatherForecastFromAPI(userInputZip, "weather", outputCurrentWeather);
};

function collectForecastWeatherData() {
    let userInputZip = document.getElementsByName("postalCode")[0].value
    Weather.loadWeatherForecastFromAPI(userInputZip, "forecast", outputForecastWeather);
}


function outputCurrentWeather() {
    var currentWeather = Weather.getWeather();
    outputWeatherToDom(currentWeather, "Your Current Weather is");
    console.log("currentWeather", currentWeather);
}

function outputForecastWeather() {
    var forecastWeather = Weather.getWeather();
    outputforecastToDom(forecastWeather, "Your 5-day Forecast is");
}