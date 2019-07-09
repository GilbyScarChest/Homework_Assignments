
var satelite = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  id: 'mapbox.satellite', 
  maxZoom: 18,
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>", 
  accessToken: API_KEY
});

var normal = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-basic",
  accessToken: API_KEY
})

// Create a map object
var myMap = L.map("map", {
  center: [36.7783, -119.4179],
  zoom: 5,
  layers: [satelite, normal]
});

var baseMaps = {
  "Satelite": satelite,
  "Map": normal
};

L.control.layers(baseMaps).addTo(myMap);

var baseMaps = {
  "<span style='color: gray'>Satelite</span>": satelite,
  "<span style='color: gray'>Map</span>": normal
};


// Store our API endpoint inside queryUrl
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl, function(data){

  // console.log(data) // This is working
  // console.log(data.features.length) //This works
  // console.log(data.features[1].properties.mag) // this works

  // Loop through the json and create one marker for each object
  for (var i = 0; i < data.features.length; i++) {
  
    //console.log(data.features[i].properties.mag)
    // Conditionals for earthquake mag

    function getColor(d) {
      return d > 5  ? '#FF0000' :
             d > 4  ? '#FF7B00' :
             d > 3  ? '#FFC100' :
             d > 2  ? '#F7FF00' :
             d > 1  ? '#C2FF00' :
                      '#00FF00';
    }
  
    // Add circles to map
    L.circle([data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]], {
      fillOpacity: 0.75,
      color: "white",
      fillColor: getColor(data.features[i].properties.mag),
      // Adjust radius
      radius: data.features[i].properties.mag * 15000
    }).bindPopup("<h1>" + data.features[i].properties.place + "</h1> <hr> <h3>Magnitude: " + data.features[i].properties.mag + "</h3>").addTo(myMap);
  }
  
  // Add Legend
  var legend = L.control({position: 'bottomright'});
  
  
  legend.onAdd = function (map) {
  
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 1, 2, 3, 4, 5],
          labels = [];
  
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }
  
      return div;
  };
  
  legend.addTo(myMap);
})



