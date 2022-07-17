
var map = L.map("map").setView([36.866537, 10.164723], 13);

var Stadia_OSMBright = L.tileLayer(
  "https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png",
  {
    maxZoom: 20,
    attribution:
      '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
  }
);

Stadia_OSMBright.addTo(map);


var popup = L.popup()

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Fetching weather info")
        .openOn(map);

    fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + e.latlng.lat + '&lon=' + e.latlng.lng + '&appid=f25b9494a832a4e68b17426a0ab2b26a&units=metric')
        .then(r => r.json()) 
        .then(data => {   
          console.log(data)
            let weatherData = `
                              <img src='http://openweathermap.org/img/wn/${data.weather[0].icon}.png'><br>
                              <b>name: </b> ${data.name}<br>
                              <b>Description:</b>${data.weather.map(w => w.description).join(", ")}<br>
                              <b>humidity:</b> ${data.main.humidity}<br>
                              <b>temperature :</b> ${data.main.temp}<br>
                              <b>temp max:</b> ${data.main.temp_max}<br>
                              <b>temp min :</b> ${data.main.temp_min}<br>
                              <b>wind speed :</b> ${data.wind.speed}<br> 
            `
              popup.setContent(
                weatherData
                )
    
        })
}

map.on('click', onMapClick)