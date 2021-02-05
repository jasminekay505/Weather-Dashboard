//Declare global variables
var cityName = "";
var cityList = [];


$(document).ready(function () {

// Event handler for search button
$("#search").on("click", function (event) {
    event.preventDefault();

    cityName = $("#input").val().trim();
    if (cityName != "") { 
        console.log(cityName);
        cityList.push(cityName);
        console.log(cityList);
    } else { 
        alert("Please enter a city!");
    }
    getWeatherData();
    
})

//function to get and display weather
function getWeatherData() {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=Seattle&units=imperial&appid=0223917225e2fc61b70b2c4dc9942a0d";

        fetch(requestURL)
        .then(function(response) { 
            return response.json();
        })
        .then(function(data) {
            var currentWeather = $("<div>")
            $(currentWeather).addClass("card-body");
            $(currentWeather).attr("id", "current-weather");
            
            console.log(data);
        })
    
}

getWeatherData();


});