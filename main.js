let latitude,
  longitude,
  mymap = L.map("mapid").setView([51.505, -0.09], 6),
  issIcon = new L.icon({
    iconUrl: "issIcon.png",

    iconSize: [12, 12], // size of the icon
    iconAnchor: [0, 0] // point of the icon which will correspond to marker's location
  }),
  marker = new L.marker([-1000, -1000], { icon: issIcon }).addTo(mymap);

L.tileLayer(
  "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoib2xpdmlhY2ExMDI3IiwiYSI6ImNqdXlleGJhaTAxdTk0M2xjZTlsa2h6MmIifQ.o9i9uPWGJ__bXoQI7gh-sQ",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken:
      "pk.eyJ1Ijoib2xpdmlhY2ExMDI3IiwiYSI6ImNqdXlleGJhaTAxdTk0M2xjZTlsa2h6MmIifQ.o9i9uPWGJ__bXoQI7gh-sQ"
  }
).addTo(mymap);

function getISSLocation() {
  fetch("https://api.wheretheiss.at/v1/satellites/25544")
    .then(response => response.json())
    .then(data => {
      let latitude = data.latitude,
        longitude = data.longitude;

      marker = L.marker([latitude, longitude], { icon: issIcon }).addTo(
        mymap.addLayer(marker)
      );
      mymap.panTo([latitude, longitude]);
      updateDisplayInfo(data, latitude, longitude);
    });
}

function updateDisplayInfo(data, lat, long) {
  document.getElementById("lat").innerHTML = "Latitude " + lat.toFixed(2);
  document.getElementById("long").innerHTML = "Longitude " + long.toFixed(2);
  document.getElementById("alt").innerHTML =
    "Altitude " + data.altitude.toFixed(2) + " Kilometers";
  document.getElementById("vel").innerHTML =
    "Velocity " + data.velocity.toFixed(2) + " KM/H";
}

setInterval(getISSLocation, 2000);
getISSLocation();
