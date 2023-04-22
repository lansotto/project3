csv = "static/data/tmdb_5000_movies_countries.csv";
d3.csv(csv).then(createMarkers);

function createMap(movies)
{
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    // create baseMaps object
    var baseMaps = {
        "Street Map": streetmap
    };

    // create overlayMaps object
    var overlayMaps = {
        "Movies": movies
    };

    var map = L.map("map", {
        center: [38.9637, 35.2433],
        zoom: 2,
        layers:[streetmap,movies]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    // Create a legend -  https://gis.stackexchange.com/questions/133630/adding-leaflet-legend 
    let getColor = ["red", "orangered", "orange", "yellow", "greenyellow", "limegreen"];

    let legend = L.control({position: 'bottomright'});
        legend.onAdd = function () {

    let div = L.DomUtil.create('div', 'info legend');
    let labels = ["<strong>Movies Count</strong>"];
    let categories = ['0-50', '50-100', '100-250', '250-500', '500-1000', '>1000'];

    for (let i = 0; i < categories.length; i++) {
            div.innerHTML += 
            labels.push(
                        '<li class="circle" style="background-color:' + getColor[i] + '">' + categories[i] + '</li> '
                    );
            }
            div.innerHTML = '<ul style="list-style-type:none; text-align: center">' + labels.join('') + '</ul>'
            return div;
        };
    legend.addTo(map);
}

function createMarkers(response)
{
    var movie_data = response;
    var moviemarkers = [];
      
    for(var index = 0; index < movie_data.length; index++)
    {
        var prodCountry = movie_data[index];
        var depth = prodCountry.Count;
        var magnitude = prodCountry.Count;
        var markeroptions = {
            radius: setRadius(magnitude),
            color: "#000",
            weight: 1,
            opacity: .75,
            fillOpacity: 0.8,
            fillColor: setColor(depth),
         };
        var moviemarker = L.circle([prodCountry.latitude,prodCountry.longitude], markeroptions)
            .bindPopup("<h3> Production Country: " + prodCountry.Country + "<br> Number of films: " + prodCountry.Count + "</h3>");
            moviemarkers.push(moviemarker);

    }
    const mapLayer = L.layerGroup(moviemarkers);
    createMap(mapLayer);
}

function setRadius(magnitude)
{
    // set size of markers
    return magnitude * 400;
}

function setColor(depth)
{
    if(depth < 10)
    {
        color = '#9ee053';
    }
    else if (depth < 30)
    {
        color = '#d1e36b';
    }
    else if (depth < 50)
    {
        color = '#faf328';
    }
    else if (depth < 70)
    {
        color = '#f0cc4a';
    }
    else if (depth < 90)
    {
        color = '#f0a04a';
    }
    else
    {
        color = '#f0694a';
    }
    return color;
}
