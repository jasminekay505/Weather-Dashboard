//Use moment to get current date
var currentDate = moment().format('LL');

$(document).ready(function () {

    // Event Listener for search button
    $("#search").on("click", function (event) {
        event.preventDefault();

        var cityName = $("#input").val().trim();
        getCurrentData(cityName);
        getForecastData(cityName);

    })

    //Function to get current weather data
    function getCurrentData(cityName) {
        var requestURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&APPID=0223917225e2fc61b70b2c4dc9942a0d"
        $.ajax({
            url: requestURL,
            method: "GET",
        }).then(displayCurrentData);
    }

    //Function to display current weather data
    function displayCurrentData(response) {
        //Clear any previous city data
        $("#current-weather-card").empty();

        //Define data needed from API call
        var currentCity = response.name;
        var currentWeatherIconCode = response.weather[0].icon;
        var currentTemp = response.main.temp;
        var currentHumidity = response.main.humidity;
        var currentWindSpeed = response.wind.speed;
        // Define data for UV index
        var currentLat = response.coord.lat;
        var currentLon = response.coord.lon;
        //Request UV index data
        var UVrequestURL = "https://api.openweathermap.org/data/2.5/uvi?appid=0223917225e2fc61b70b2c4dc9942a0d&lat=" + currentLat + "&lon=" + currentLon;
        $.ajax({
            url: UVrequestURL,
            method: "GET",
        }).then(function (response) {
            var currentUVIndex = response.value;
            formatUVIndex(currentUVIndex);
        });

        //Format UV Index data based on number
        function formatUVIndex(currentUVIndex) {
            var currentCardUVIndex = $("<span>").text(currentUVIndex);
            if (currentUVIndex > 0 && currentUVIndex < 3) {
                $(currentCardUVIndex).addClass("low");
            } else if (currentUVIndex >= 3 && currentUVIndex <= 5) {
                $(currentCardUVIndex).addClass("moderate");
            } else if (currentUVIndex >= 6 && currentUVIndex <= 7) {
                $(currentCardUVIndex).addClass("high");
            } else if (currentUVIndex >= 8 && currentUVIndex <= 10) {
                $(currentCardUVIndex).addClass("veryHigh");
            } else if (currentUVIndex >= 11) {
                $(currentCardUVIndex).addClass("Extreme");
            }

            var currentCardUVIndexP = $("<p>").addClass("card-text").text("UV Index: ").attr("id", "UV");
            $(currentCardUVIndex).appendTo(currentCardUVIndexP);
            console.log(currentCardUVIndexP)
            $("#current-weather-card").append(currentCardUVIndexP);

        }

        //Set up Card to display data
        $("#current-weather-card").css("width", "100%");
        var currentCardBody = $("<div>").addClass("card-body");
        var currentCardTitle = $("<h5>").addClass("card-title");
        var currentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + currentWeatherIconCode + "@2x.png />");
        var currentCardTemp = $("<p>").addClass("card-text");
        var currentCardHumidity = $("<p>").addClass("card-text");
        var currentCardWindSpeed = $("<p>").addClass("card-text");

        //Display Current Weather Card
        $(currentCardTitle).text(currentCity + " (" + currentDate + ")");
        $(currentCardTemp).text("Temperature: " + currentTemp);
        $(currentCardHumidity).text("Humidity: " + currentHumidity);
        $(currentCardWindSpeed).text("Windspeed: " + currentWindSpeed);
        $("#current-weather-card").append(currentCardBody);
        $(currentCardBody).append(currentCardTitle);
        $(currentCardTitle).append(currentWeatherIcon);
        $(currentCardBody).append(currentCardTemp);
        $(currentCardBody).append(currentCardHumidity);
        $(currentCardBody).append(currentCardWindSpeed);
    }
    //Function to get forecast weather data
    function getForecastData(cityName) {
        var requestURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&APPID=0223917225e2fc61b70b2c4dc9942a0d"
        $.ajax({
            url: requestURL,
            method: "GET",
        }).then(displayForecastData);
    }

    //Function to display forecast weather data
    function displayForecastData(response) {
        //Clear any previous city data
        $("#fiveDayForecast").empty();
        $("#fiveDayForecast").css("width", "100%");

        var forecastCardBody  = $("<div>").addClass("card-body");
        var forecastHeader = $("<h5>").addClass("card-title").text("Five Day Forecast")
        $("#fiveDayForecast").append(forecastCardBody);
        $(forecastCardBody).append(forecastHeader);
        var cardDeck = $("<div>").addClass("card-deck");
        $("#fiveDayForecast").append(cardDeck);

        //Define data needed from API call
        for (i = 0; i < 5; i++) {
            //var newTemp = response.list[i].main.temp;
            //var newHumiditity = response.list[i].main.humidity;
            var newDate = moment().add((1+i), "days").format("LL");
            var newCard = $("<div>").addClass("card mb-3 mt -3 forecast-card");
            var newCardBody = $("<div>").addClass("card-body" + i)
            var newCardTitle = $("<h4>").addClass("card-title");
            var newCardTemp = $("<p>").addClass("card-text");
            var newCardHumidity = $("<p>").addClass("card-text");

            $(newCardBody).text(newDate);
            $(cardDeck).append(newCard);
            $(newCard).append(newCardBody);


        }
        // var currentWeatherIconCode = response.weather[0].icon;


        // //Set up Card to display data
        // $("#current-weather-card").css("width", "100%");
        // var currentWeatherIcon = $("<img src = http://openweathermap.org/img/wn/" + currentWeatherIconCode + "@2x.png />");

        // //Display Current Weather Card
        // $(currentCardTitle).text(currentCity + " (" + currentDate + ")");
        // $(currentCardTemp).text("Temperature: " + currentTemp);
        // $(currentCardHumidity).text("Humidity: " + currentHumidity);
        // $(currentCardWindSpeed).text("Windspeed: " + currentWindSpeed);
        // //$(currentCardUVIndex).text("UV Index: " + currentUVIndex);
        // $("#current-weather-card").append(currentCardBody);
        // $(currentCardBody).append(currentCardTitle);
        // $(currentCardTitle).append(currentWeatherIcon);
        // $(currentCardBody).append(currentCardTemp);
        // $(currentCardBody).append(currentCardHumidity);
        // $(currentCardBody).append(currentCardWindSpeed);
    }


});