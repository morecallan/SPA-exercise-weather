"use strict"

var Weather = (() => {

    var weatherObject = {};

    return {
        loadWeatherForecastFromAPI: (zip, typeOfForecast, callbackFunc) => {
            //Step 1: Set up http req for weather
              let newRew = new XMLHttpRequest;

              // api.openweathermap.org/data/2.5/weather
              // api.openweathermap.org/data/2.5/forecast

            //Step 2: Go get it
              let APIReq = "http://api.openweathermap.org/data/2.5/" + typeOfForecast + "?zip=" + zip + ",us&units=imperial&APPID=1014566b9e328e7826d250c827d7eb54";
              newRew.open("GET", APIReq);
              newRew.send();

            //Step 3: Event Listener
              newRew.addEventListener("load", messagesSuccess);
              newRew.addEventListener("failed", failedExecution);

            //Step 4: If json fails to load
              function failedExecution() {
                alert("Error loading page. Please refresh.")
              };

              //Step 5: Translate into JS
              //Step 6: Create callback for once the messages page loads
              function messagesSuccess() {
                weatherObject = JSON.parse(this.responseText);
                callbackFunc();
            }
        },

        getWeather: () => {
            return weatherObject;
        }
    }
})();