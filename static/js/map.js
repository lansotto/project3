csv = "static/data/tmdb_5000_movies_countries.csv";
d3.csv(csv).then(createMarkers);

function createMap(movies)
{
    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    //MIERUNE Color
    const m_color = new L.tileLayer('https://tile.mierune.co.jp/mierune/{z}/{x}/{y}.png', {
        attribution:
            "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
    });

    //MIERUNE MONO
    const m_mono = new L.tileLayer('https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png', {
        attribution:
            "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
    });

    //OSM
    const o_std = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });

    //GSI Pale
    const t_pale = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png', {
        attribution:
            "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
    });

    //GSI Ort
    const t_ort = new L.tileLayer('https://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg', {
        attribution:
            "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
    });


    // create baseMaps object
    var baseMaps = {
        "Street Map": streetmap,
        'MIERUNE Color': m_color,
        'MIERUNE MONO': m_mono,
    };

    // create overlayMaps object
    var overlayMaps = {
        "Movies": movies,
        'OSM': o_std,
        'GSI Pale': t_pale,
        'GSI Ort': t_ort,
    };

    var map = L.map("map", {
        center: [38.9637, 35.2433],
        zoom: 2,
        layers:[streetmap,m_mono, o_std, t_pale, t_ort, movies]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    //OpacityControl
    L.control
    .opacity(overlayMaps, {
        label: 'Layers Opacity',
    })
    .addTo(map);

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
