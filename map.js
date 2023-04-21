const country_csv = "Resources/tmdb_5000_movies_countries.csv";

// Perform a GET request to the query URL.

d3.csv(country_csv).then(function(data) {
  console.log(data);
  // console.log(data[0].Country);
  // console.log(data[0].Count);
  // console.log(data[0].latitude);
  // console.log(data[0].longitude);


 let production_countries = [];
 for (let i = 0; i < data.length; i++) {
      production_countries.push({
        "Production Country": data[i].Country,
        "Count": data[i].Count,
        "Lat": data[i].latitude,
        "Lon": data[i].longitude,
      });
    };
    console.log(production_countries); 
    
    // Send object to createFeatures function
    createFeatures(data);
});


// Create marker size function
function markerSize(Count) {
  return Count * 500000;
};


// Create marker color function. Colour determined by movie count
function markerColour(Count){
  if (Count < 50) return "limegreen";
  else if (Count < 100) return "greenyellow";
  else if (Count < 250) return "yellow";
  else if (Count < 500) return "orange";
  else if (Count < 1000) return "orangered";
  else return "red";
}

// Code for createFeatures 
function createFeatures(countriesData) {

  // Create onEachFeature Function to create layer.bindPopup
  function onEachFeature(data, layer) {
    layer.bindPopup(`<h3>Country: ${data.Country}</h3><hr>
    <p>Total Movie Count: ${data.Count}</p>`);
  }

  // Create a GeoJSON layer with the features array on the movies object
  let movies = L.geoJSON(countriesData, {
    onEachFeature: onEachFeature,

    // Point to layer used to alter markers
    pointToLayer: function(data, coord) {

      // Determine the style of markers based on properties
      let markers = {
        color: "black",
        fillColor: markerColour(data.Count),
        fillOpacity: 0.8,
        radius: markerSize(data.Count),
        stroke: true,
        weight: 0.5
      }
      return L.circle(coord, markers);
    }
  });

  // Send our movies layer to the createMap function
  createMap(movies);
}

// Create map function
function createMap(movies) {
    // Create the base layers.
    let streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    
      // Create a baseMaps object to contain the streetmap and the darkmap.
    let baseMaps = {
        "Street": streetLayer
    };

    // Create overlay object to hold our overlay layer	
    let overlayMaps = {
        "Movies": movies
    };

    // Modify the map with appropriate layers
    let myMap = L.map("map", {
        center: [
            29.749907, -95.358421
        ],
        zoom: 5,
        layers: [streetLayer, movies]
    });


    // Create a legend -  https://gis.stackexchange.com/questions/133630/adding-leaflet-legend 
    // let getColor = ["red", "orangered", "orange", "yellow", "greenyellow", "limegreen"];

    // let legend = L.control({position: 'bottomright'});
    //     legend.onAdd = function () {

    // let div = L.DomUtil.create('div', 'info legend');
    // let labels = ["<strong>Movies Count</strong>"];
    // let categories = ['0-50', '50-100', '100-250', '250-500', '500-1000', '>1000'];

    // for (let i = 0; i < categories.length; i++) {
    //         div.innerHTML += 
    //         labels.push(
    //                     '<li class="circle" style="background-color:' + getColor[i] + '">' + categories[i] + '</li> '
    //                 );
    //         }
    //         div.innerHTML = '<ul style="list-style-type:none; text-align: center">' + labels.join('') + '</ul>'
    //         return div;
    //     };
    // legend.addTo(myMap);

    
    // Adding a scale to a map
    // L.control.scale()
    //     .addTo(myMap);

    // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
    L.control.layers(baseMaps, overlayMaps, {
        collapsed: true
      }).addTo(myMap);    
}