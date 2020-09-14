let MapView = L.map("Mapview").setView([21.1528845, -101.7113347], 13); // Sets the map location and zoom
let MapViewres = L.map("Mapviewres").setView([21.1528845, -101.7113347], 13); // Sets the map location and zoom
var tilesP  = ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png','http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png','https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png','https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png'];
L.tileLayer(tilesP[0], {
    maxZoom: 20, // Sets the zoom level
    tileSize: 512, // Sets the geographic tile size (512 is the default)
    zoomOffset: -1, // No zoom at render
    subdomains: 'abcd',
    accessToken: "pk.eyJ1IjoiemVza3kiLCJhIjoiY2p6b2k4ejJ3MDB1ZjNjcGR5aWFjcXI4YyJ9.3tK4ewbOKRAEw9BDA4xAkQ", // Map Box Default public token
}).addTo(MapView); // Creates the map
//ChangeMap(1);
var newIcon = L.icon({ // Crea un template para los Iconos.
    iconUrl:'../ubicacion.png',
    iconSize:[60,60],
    iconAnchor:[30,60],
    popupAnchor:[-3,-76]
});
document.getElementById("Mapviewres").style.display = "none";
var Global = [];
MapView.doubleClickZoom.disable(); // Deshabilitar el zoom en doble click;
MapView.on('dblclick', function(e){ 
    let latlng = MapView.mouseEventToLatLng(e.originalEvent); //
    L.marker([latlng.lat, latlng.lng],{icon:newIcon}).addTo(MapView); // Crear un nuevo Icono.
    Global.push(latlng);
    //console.log(Global);
    ClearMap();
    if (Global.length > 10) {
        ClearMapRes();
        document.getElementById("Mapviewres").style.display = "block";
        var nums = Math.floor(Math.random() * 4);
        console.log(nums);
        ChangeMap(nums);
        var Polygon = L.polygon([Global]).addTo(MapView);
        var prints= "";
        for (let i = 0; i < Global.length; i++) {
             L.marker([Global[i].lat, Global[i].lng],{icon:newIcon}).addTo(MapViewres);
             prints += 'Punto numero '+(i+1)+': '+ Global[i].lat +','+ Global[i].lng + '\n';
        }

        alert(prints);
    }
});

function ClearMap() {
    for(MapViewLayers in MapView._layers) {
        if(MapView._layers[MapViewLayers]._path != undefined) {
            MapView.removeLayer(MapView._layers[MapViewLayers]);
        }
    }
}

function ClearMapRes() {
    for(MapViewLayers in MapViewres._layers) {
        if(MapViewres._layers[MapViewLayers]._path != undefined) {
            MapViewres.removeLayer(MapViewres._layers[MapViewLayers]);
        }
    }
}
function ChangeMap(selection){
    L.tileLayer(tilesP[selection], {
        maxZoom: 20, // Sets the zoom level
        tileSize: 512, // Sets the geographic tile size (512 is the default)
        zoomOffset: -1, // No zoom at render
        subdomains: 'abcd',
        accessToken: "pk.eyJ1IjoiemVza3kiLCJhIjoiY2p6b2k4ejJ3MDB1ZjNjcGR5aWFjcXI4YyJ9.3tK4ewbOKRAEw9BDA4xAkQ", // Map Box Default public token
  }).addTo(MapViewres); // Creates the map
}
