// Creating map object
var map3 = L.map("map3", {
    center: [39.0458, -76.6413],
    zoom: 7,
    zoomControl: false

});

// Adding tile layer
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
tileSize: 512,
maxZoom: 13,
zoomOffset: -1,
id: "mapbox/streets-v11",
accessToken: API_KEY
}).addTo(map3);


// Load in geojson data
var county_file = "/County"

var geojson;

// Grab data with d3
d3.json(county_file, function(data) {
  console.log(data)

  // Create a new choropleth layer
  geojson = L.choropleth(data, {
    // Define what  property in the features to use
    valueProperty: "total_population",
    
    // Set color scale
    scale: ["#f6eff7", "#014636"],
    
    // Number of breaks in step range
    steps: 8,
    
    // q for quartile, e for equidistant, k for k-means
     mode: "q",
     style: {
       
    // Border color
    color: "#fff",
    weight: 1,
    fillOpacity: .9
    },
    
    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h4>County: " + feature.properties.county_name + "</h4><hr>Total Population: " + feature.properties.total_population);
    }
  }).addTo(map3);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Total Population</h1>" +
    "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
    "</div>";

    div.innerHTML = legendInfo;

        limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
        });

        div.innerHTML += "<ul>" + labels.join("") + "</ul>";
        return div;
    };

    // Adding legend to the map
    legend.addTo(map3);

});