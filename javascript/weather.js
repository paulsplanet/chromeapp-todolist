const weather = document.querySelector(".js-weather");
const weatherIcon = document.querySelector(".weather-icon");
const description = document.querySelector(".description");

const iconIn24h = document.querySelector(".weather-24h__icon"),
    tempIn24h = document.querySelector(".weather-24h__temp"),
    desIn24h = document.querySelector(".weather-24h__des");

const iconIn48h = document.querySelector(".weather-48h__icon"),
    tempIn48h = document.querySelector(".weather-48h__temp"),
    desIn48h = document.querySelector(".weather-48h__des");

const API_KEY = "47f31d8ff9f939f094a958fcbd7a5d60";
const COORDS = 'coords';

function getWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temperature = json.main.temp;
        const place = json.name;
        const icon = json.weather[0].icon;
        const iconurl = `http://openweathermap.org/img/w/${icon}.png`;
        const weatherDescription = json.weather[0].description;
        weatherIcon.src = iconurl;
        description.innerHTML = `${weatherDescription}`;
        weather.innerHTML = `${temperature} &ordm;C @ ${place}`;
    });
}

function hourWeather(lat, lng) {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude={current}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        const temp24h = json.hourly[23].temp;
        const temp48h = json.hourly[37].temp;
        const icon24h = json.hourly[23].weather[0].icon;
        const icon48h = json.hourly[37].weather[0].icon;
        const icon24hUrl = `http://openweathermap.org/img/w/${icon24h}.png`;
        const icon48hUrl = `http://openweathermap.org/img/w/${icon48h}.png`;
        const des24h = json.hourly[23].weather[0].description;
        const des48h = json.hourly[37].weather[0].description;
        iconIn24h.src = icon24hUrl;
        tempIn24h.innerHTML = `${temp24h} &ordm;C`;
        desIn24h.innerHTML = `${des24h}`;
        iconIn48h.src = icon48hUrl;
        tempIn48h.innerHTML = `${temp48h} &ordm;C`;
        desIn48h.innerHTML = `${des48h}`;
    });
    console.log(url);
}

function saveCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
    hourWeather(latitude, longitude);
}

function handleGeoError() {
    console.log("We can't find your location")
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError)
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null) {
        askForCoords();
    } else {
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        hourWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init() {
    loadCoords();
}
init();