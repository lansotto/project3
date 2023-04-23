csv = "static/data/tmdb_5000_movies_countries.csv";
d3.csv(csv).then(createMarkers);

function createMap(movies) {
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
        'Mierune Colour': m_color,
        'Mierune Mono': m_mono,
        //'GSI Ort': t_ort,
        //  'OSM': o_std,
        'GSI Pale': t_pale,
    };

    // create overlayMaps object
    var overlayMaps = {
        "Production Countries": movies,

    };

    var map = L.map("map", {
        center: [38.9637, 35.2433],
        zoom: 2.5,
        layers: [streetmap, m_mono, o_std, t_pale, t_ort, movies]
    });

    L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
    }).addTo(map);

    //OpacityControl
    // L.control
    //     .opacity(overlayMaps, {
    //         label: 'Layers Opacity',
    //     })
    //     .addTo(map);


    var legend = L.control({ position: 'bottomright' });
    legend.onAdd = function () {

        var div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 100, 200, 300, 1000, 2000]
        labels = [];

        // Generate label 
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<li style="background-color:' + setColor(grades[i] + 1) + '"></li> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(map);
}
function setColor(depth) {
    if (depth < 100) {
        color = '#9ee053';
    }
    else if (depth < 200) {
        color = '#d1e36b';
    }
    else if (depth < 300) {
        color = '#faf328';
    }
    else if (depth < 1000) {
        color = '#f0cc4a';
    }
    else if (depth < 2000) {
        color = '#f0a04a';
    }
    else {
        color = '#f0694a';
    }
    return color;
}

function createMarkers(response) {
    var movie_data = response;
    var moviemarkers = [];

    for (var index = 0; index < movie_data.length; index++) {
        var prodCountry = movie_data[index];
        var depth = prodCountry.Count;
        var magnitude = prodCountry.Count;
        var markeroptions = {
            radius: setRadius(magnitude),
            color: "#000",
            weight: 1,
            opacity: .5,
            fillOpacity: 0.8,
            fillColor: setColor(depth),
        };
        var moviemarker = L.circle([prodCountry.latitude, prodCountry.longitude], markeroptions)
            .bindPopup("<body> Production Country: <b>" + prodCountry.Country + "</b><br> Number of films: <b>" + prodCountry.Count + "</b></body>");
        moviemarkers.push(moviemarker);

    }
    const mapLayer = L.layerGroup(moviemarkers);
    createMap(mapLayer);
}

function setRadius(magnitude) {
    // set size of markers
    return magnitude * 400;
}