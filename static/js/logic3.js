// Creating map object
var map3 = L.map("map3", {
    center: [39.0458, -76.6413],
    zoom: 8
});

// Adding tile layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 18,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(map2);


var organic_file = "/Markets"


// Grabbing our GeoJSON data
d3.json(organic_file, function(data){
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
//   createFeatures(data.features);
})

// var greenIcon = new L.Icon({
// 	iconUrl: 'img/marker-icon-2x-green.png',
// 	shadowUrl: 'img/marker-shadow.png',
// 	iconSize: [25, 41],
// 	iconAnchor: [12, 41],
// 	popupAnchor: [1, -34],
// 	shadowSize: [41, 41]
// });

for (var i = 0; i < organic_file.length; i++) {
    var market = organic_file[i];
    L.marker(market.location)


    // .bindPopup(“<h1>” + city.name + “</h1> <hr> <h3>Population: ” + city.pop + “</h3>“) //review toolTips here !! adding style.
    .addTo(map);
}
  
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < countries.length; i++) {

    // Conditionals for countries points
    var color = "";
    if (countries[i].points > 200) {
      color = "yellow";
    }
    else if (countries[i].points > 100) {
      color = "blue";
    }
    else if (countries[i].points > 90) {
      color = "green";
    }
    else {
      color = "red";
    }