// Use this link to get the geojson data.
var file = "/Market";

// Grabbing our GeoJSON data
d3.json("/Market", function(data){
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  
})

function createFeatures(organicData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.properties.store_name + "</h3><hr><h4> Address: </h4>" + feature.properties.address + "<h4>Rating: </h4>" + feature.properties.rating);
  }

  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var organic_markets = L.geoJSON(organicData, {
    onEachFeature: onEachFeature
  });

  // Sending our earthquakes layer to the createMap function
  createMap(organic_markets);

}

function createMap(organic_markets){
  

  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    minZoom: 6,
    id: "light-v10",
    accessToken: API_KEY
  })

  var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var baseMaps = {
    "Street Map": streetmap,
    "Light Map": lightmap
  };

  var overlayMaps = { 
    "Organic Markets": organic_markets
  };

  var myMap = L.map("map", {
    center: [39.0458, -76.6413],
    zoom: 9,
    layers: [lightmap, organic_markets]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}


// [39.3343, -76.4394]