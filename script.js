//Declare global variable
var currentDate = moment().format('LLL');

$(document).ready(function () {

    // Event Listener for search button
    $("#search").on("click", function (event) {
        event.preventDefault();

        var cityName = $("#input").val().trim();
        getCurrentData(cityName);
        //getForecastData(cityName);

    })

    //function to get and display weather
    function getCurrentData(cityName) {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=0223917225e2fc61b70b2c4dc9942a0d"
        $.ajax({
            url: requestURL,
            method: "GET",
        }).then(displayCurrentData);
    }

    function displayCurrentData(response) {
       console.log(response)
       var currentCity = response.name;
       console.log(currentCity)
       var currentWeatherIcon = response.weather[0].icon;
       var currentTemp = response.main.temp;
       var currentHumidity = response.main.humidity;
       var currentWindSpeed = response.main.wind.speed;
       //ar currentUVIndex = 

    }


});