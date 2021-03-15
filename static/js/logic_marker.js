// Use this link to get the geojson data.
// var file = "static/data/organic_markets.json";
var organic_file = "/Markets"
// var county_file = "/County"


// Grabbing our GeoJSON data
d3.json(organic_file, function(data){
  console.log(data);
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
  
})

function createFeatures(organicData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup description
  function onEachFeature(feature, layer) {

    // Filter data
    data.features = data.features.filter(function(d) {return d.properties.store_name=="Mom's Organic Market"} )
    
    var momsIcon = L.Icon.extend({
      iconUrl: 'img/marker-icon_green.png',
      iconSize: [17, 30]
    });

    data.forEach(function(d, i) {
      if (d.store_name === "Mom's Organic Market") {
        var markerIcon = momsIcon;
      }
      if (d.store_name === "Whole Foods Market") {
        markerIcon = wfoodsIcon;
      }
      if (d.store_name === "Sprouts Market") {
        markerIcon = wfoodsIcon;
      }


    })


  };
    layer.bindPopup("<h3>" + feature.properties.store_name + "</h3><hr><h4> Address: </h4>" + feature.properties.address + "<h4>Rating: </h4>" + feature.properties.rating);
    
  }


  // Create a GeoJSON layer containing the features array 
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

  // Initialize all of the LayerGroups 
  var layers = {
    Moms: new L.LayerGroup(),
    Whole_Foods: new L.LayerGroup(),
    Sprouts: new L.LayerGroup()
  };

  // Create an overlays object to add to the layer control
  var overlayMaps = { 
    "Organic Markets": organic_markets,
    "Mom's Organic Market": layers.Moms,
    "Whole Foods Market": layers.Whole_Foods,
    "Sprouts Farmers Market": layers.Sprouts
  };

  // Create the map with our layers
  var myMap = L.map("map", {
    center: [39.0458, -76.6413],
    zoom: 9,
    layers: [
      lightmap, 
      streetmap, 
      organic_markets,
      layers.Moms,
      layers.Whole_Foods,
      layers.Sprouts
    ]
  });

  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  // Initialize an object containing icons for each layer group
  var icons = {
    Moms: L.ExtraMarkers.icon({
    icon: "ion-settings",
    iconColor: "white",
    markerColor: "yellow",
    shape: "star"
    }),
    Whole_Foods: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
    }),
    Sprouts: L.ExtraMarkers.icon({
    icon: "ion-minus-circled",
    iconColor: "white",
    markerColor: "blue-dark",
    shape: "penta"
    })
  };

}

