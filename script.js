//Declare global variables
var currentDate = moment().format('LLL');

$(document).ready(function () {

    // Event Listener for search button
    $("#search").on("click", function (event) {
        event.preventDefault();

        var cityName = $("#input").val().trim();
        console.log(cityName);
        getWeatherData(cityName);

    })

    //function to get and display weather
    function getWeatherData(cityName) {
        var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&APPID=0223917225e2fc61b70b2c4dc9942a0d"
        $.ajax({
            url: requestURL,
            method: "GET",
        }).then(displayWeatherData);
    }

    function displayWeatherData(response) {
        console.log(response);
    }


});