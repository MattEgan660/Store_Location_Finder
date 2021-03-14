// Creating map object
var map2 = L.map("map2", {
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

// Load in geojson data
var county_file = "/County"

var geojson;

// Grab data with d3
d3.json(county_file, function(data) {
    console.log(data)

    // Create a new choropleth layer
    geojson = L.choropleth(data, {

        // Define what  property in the features to use
        valueProperty: "median_household_income",

        // Set color scale
        scale: ["#ffffb2", "#b10026"],

        // Number of breaks in step range
        steps: 10,

        // q for quartile, e for equidistant, k for k-means
        mode: "q",
        style: {
        // Border color
        color: "#fff",
        weight: 1,
        fillOpacity: 0.8
        },

        // Binding a pop-up to each layer
        onEachFeature: function(feature, layer) {
        layer.bindPopup("<h3>County: " + feature.properties.county_name + "</h3><br>Median Household Income:<br>" +
            "$" + feature.properties.median_household_income);
        }
    }).addTo(map2);

    // Set up the legend
    var legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
        var div = L.DomUtil.create("div", "info legend");
        var limits = geojson.options.limits;
        var colors = geojson.options.colors;
        var labels = [];

        // Add min & max
        var legendInfo = "<h1>Median Income</h1>" +
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
    legend.addTo(map2);

});
