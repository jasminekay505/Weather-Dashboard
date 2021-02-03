//Declare global variables
var cityName = "";
var cityList = [];


$(document).ready(function () {

// Event handler for search button
$("#search").on("click", function (event) {
    event.preventDefault();

    cityName = $("#input").val().trim();
    console.log = cityName;
    cityName.push(cityName);
    console.log(cityList);
})

});