const API_KEY = "11a3a9ba3a0259fc665e25df54b0f30a"
const LOCATION = 'location'
const weather = document.querySelector(".weather")

function getWeather (lat,lng) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name 
        weather.innerText = `${temperature} , ${place}`

    })
}
function saveCoord (coordsObj) {
    localStorage.setItem(LOCATION,JSON.stringify(coordsObj))
}

function handleGeoSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,
        longitude
    }
    saveCoord(coordsObj)
    getWeather(latitude,longitude)
}

function handleGeoErr () {
    console.log("Can't Read Any Location Info")
} 
function askForLocation () {
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr)
}

function loadLocation() {
    const loadedLocation = localStorage.getItem(LOCATION);
    if (loadedLocation === null) {
      askForLocation()
    } else {
        //getLocation()
        const parseLocation = JSON.parse(loadedLocation)
        getWeather(parseLocation.latitude,parseLocation.longitude)
    }
  }
  