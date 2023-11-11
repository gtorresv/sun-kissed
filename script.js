var weatherApi = '9802870bd05c0384be22bc4151081c03';
var userInput = document.querySelector(".box");
var searchBtn = document.querySelector(".search-button");

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    getCurrentWeather(userInput.value);
    fiveDayForecast(userInput.value);
});

function getCurrentWeather(city) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=imperial`
    fetch(url)
    .then(function(get) {
        return get.json();
    })
    .then(function(data) {
        console.log(data);
        displayCurrentWeather(data);
    })
}

function fiveDayForecast(city) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherApi}&units=imperial`
    fetch(url)
    .then(function(get) {
        return get.json();
    })
    .then(function(data) {
        console.log(data);
        displayFiveDayForecast(data);
    });
}

function displayCurrentWeather(data) {

}

function displayFiveDayForecast(data) {
    var resultCard = document.createElement('div');
    resultCard.classList.add('card');
}