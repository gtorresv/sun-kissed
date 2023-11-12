var weatherApi = '9802870bd05c0384be22bc4151081c03';
var userInput = document.querySelector(".box");
var searchBtn = document.querySelector(".search-button");
var searchHistory = document.querySelector("#search-history");

searchBtn.addEventListener("click", function(event) {
    event.preventDefault();
    var city = userInput.value;
    getCurrentWeather(city);
    fiveDayForecast(city);
});

function getCurrentWeather(city) {
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}&units=imperial`
    fetch(url)
    .then(function(get) {
        return get.json();
    })
    .then(function(data) {
        console.log(data);
        saveToLocalStorage(city, data);
        displaySearchHistory(city);
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
    var currentDay = document.querySelector(".city-result");
    var cityName = document.createElement('h2');
    cityName.textContent = data.name;
    currentDay.append(cityName);

    var date = document.createElement('h2'); 
    date.textContent = new Date(data.dt * 1000).toLocaleDateString();
    currentDay.append(date);

    var weatherIcon = document.createElement('img');
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    currentDay.append(weatherIcon);

    var temp = document.createElement('p');
    temp.textContent = "Temperature: " + data.main.temp + " °F";
    currentDay.append(temp);

    var wind = document.createElement('p');
    wind.textContent = "Wind: " + data.wind.speed + " MPH";
    currentDay.append(wind);

    var humid = document.createElement('p');
    humid.textContent = "Humidity: " + data.main.humidity + " %";
    currentDay.append(humid)
}

function displayFiveDayForecast(data) {
    for (let i = 1; i < data.list.length; i+=8) {
        var resultCard = document.createElement('div');
        resultCard.classList.add('card');

        var resultBody = document.createElement('div');
        resultBody.classList.add('card-body');
        resultCard.appendChild(resultBody);

        var titleDate = document.createElement('h3');
        titleDate.textContent = new Date(data.list[i].dt * 1000).toLocaleDateString();
        resultBody.appendChild(titleDate);

        var weatherIconEl = document.createElement('img');
        weatherIconEl.src = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;
        resultBody.appendChild(weatherIconEl);

        var tempEl = document.createElement('p')
        tempEl.textContent = "Temperature: " + data.list[i].main.temp + " °F";
        resultBody.appendChild(tempEl);

        var windEl = document.createElement('p');
        windEl.textContent = "Wind: " + data.list[i].wind.speed + " MPH";
        resultBody.appendChild(windEl);
        
        var humidEl = document.createElement('p');
        humidEl.textContent = "Humidity: " + data.list[i].main.humidity + " %";
        resultBody.appendChild(humidEl);

        var fiveDayContainer = document.getElementById('5-day-results');
        fiveDayContainer.appendChild(resultCard);
    }
    
}

function saveToLocalStorage(city, data) {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem(city, JSON.stringify(data)); 
    } else {
        console.log("Local storage is not supported.");
    }
}

function displayCityFromStorage(city) {
    const data = JSON.parse(localStorage.getItem(city)); // Retrieve data from local storage
    if (data) {
        displayCurrentWeather(data);
        displayFiveDayForecast(data);
    }
}

function displaySearchHistory(city) {
    //if (!document.querySelector(`.city-button[data-city="${city}"]`)) {
        const cityItem = document.createElement('button');
        cityItem.classList.add('city-button');
        cityItem.textContent = city;
        //cityItem.setAttribute('data-city', city);
        cityItem.addEventListener('click', function (event) {
            event.preventDefault();
            displayCityFromStorage(city);
        });
        searchHistory.appendChild(cityItem);
    //}
    
}