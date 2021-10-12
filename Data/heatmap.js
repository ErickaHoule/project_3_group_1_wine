$(document).ready(function() {
    getDataAndMakeMap();

    // EVENT LISTENER
    $("#filter").on("change", function() {
        getDataAndMakeMap();
    });
});

function getDataAndMakeMap() {
    let limit = $("#filter").val();
    // // Use this link to get the GeoJSON data.
    let url = "Data/top_wine_map.json";
    // AJAX
    $.ajax({
        type: "GET",
        url: url,
        contentType: "application/json",
        dataType: "json",
        success: function(data) {
            console.log(data);
            makeMap(data);

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error: " + errorThrown);
        },
        complete: function(data) {
            console.log("Request finished");
        }
    });
}

function makeMap(data) {
    // init map HTML
    $("#mapcontainer").empty();
    $("#mapcontainer").append(`<div id="mapid"></div>`);

    // Create the base layers.
    var dark_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/dark-v10',
        accessToken: API_KEY
    });

    var light_layer = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox/light-v10',
        accessToken: API_KEY
    });

    // Create a baseMaps object to contain the streetmap and the darkmap.
    var baseMaps = {
        "Dark": dark_layer,
        "Light": light_layer
    };

    // DO WORK AND CREATE THE OVERLAY LAYERS
    // Define arrays to hold the created  markers.
    var provinces = [];
    var heatArray = [];
    for (var i = 0; i < data.length; i++) {
        var latitude = data[i].latitude;
        var longtitude = data[i].longtitude;
        var province = data[i].province;
        var points = data[i].points;

        let marker = L.marker([latitude, longtitude]);
        marker.bindPopup("<h4>" + province + "</h4> <hr> <h4>" + points+ "</h4>");
        provinces.push(marker);
       
        // add heat map data
        heatArray.push([latitude, longtitude]);
        
    }

    // Create layer groups for markers
    var top100Layer = L.layerGroup(provinces);
    var heatLayer = L.heatLayer(heatArray, {
        radius: 40,
        blur: 10
        // color: makeColor(features[i].properties.mag),
        // fillColor: makeColor(features[i].properties.mag),

        // gradient: {
        //     0.0: 'e69ac7',
        //     0.5: 'bd6499',
        //     1.0: '94386f'
        // },
    });

    // Create an overlayMaps object to contain the "State Population" and "City Population" layers
    var overlayMaps = {
        "Top 100 Wine": top100Layer,
        "Heat Map Layer": heatLayer
    };

    // Modify the map so that it has the streetmap, states, and cities layers
    var myMap = L.map("mapid", {
        center: [37.0902, -95.7129],
        zoom: 4,
        layers: [dark_layer, heatLayer]
    });

    // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
    L.control.layers(baseMaps, overlayMaps).addTo(myMap);

//     // HELPER FUNCTION FOR COLOR
function makeColor(points) {
    let rtnColor = "red";

    // Conditionals for country points
    if (points > 90) {
        rtnColor = "yellow";
    } else if (points > 85) {
        rtnColor = "blue";
    } else if (points > 80) {
        rtnColor = "green";
    } else {
        rtnColor = "red";
    }

    return rtnColor;
}






}
