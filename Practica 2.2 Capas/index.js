let MapView = L.map("Mapview").setView([21.1528845, -101.7113347], 13); // Sets the map location and zoom
var tilesP  = ['https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png','https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png','http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png','https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png','https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png'];
L.tileLayer(tilesP[0], {
    maxZoom: 20, // Sets the zoom level
    tileSize: 512, // Sets the geographic tile size (512 is the default)
    zoomOffset: -1, // No zoom at render
    subdomains: 'abcd',
    accessToken: "pk.eyJ1IjoiemVza3kiLCJhIjoiY2p6b2k4ejJ3MDB1ZjNjcGR5aWFjcXI4YyJ9.3tK4ewbOKRAEw9BDA4xAkQ", // Map Box Default public token
}).addTo(MapView); // Creates the map
MapView.doubleClickZoom.disable(); // Deshabilitar el zoom en doble click;
document.getElementById("btnBorrar").addEventListener("click", borradoTotal); 
var newIcon = L.icon({ // Crea un template para los Iconos.
    iconUrl:'../ubicacion.png',
    iconSize:[60,60],
    iconAnchor:[30,60],
    popupAnchor:[-3,-76]
});
var newIconOdd = L.icon({ // Crea un template para los Iconos.
    iconUrl:'../ubicacion2.png',
    iconSize:[60,60],
    iconAnchor:[30,60],
    popupAnchor:[-3,-76]
});
var marcadores = [];
var contador = 0;
var actual = newIcon;
MapView.on('dblclick', function(e){ 
    let latlng = MapView.mouseEventToLatLng(e.originalEvent); //
    if (contador < 3) {
        contador++;
    }else{
        contador = 1;
        actual = actual == newIcon ? newIconOdd : newIcon;
    }
    var markert= L.marker([latlng.lat, latlng.lng],{icon:actual}).addTo(MapView); // Crear un nuevo Icono.
    marcadores.push(markert);
});

function ChangeMap(selection){
    L.tileLayer(tilesP[selection], {
        maxZoom: 20, // Sets the zoom level
        tileSize: 512, // Sets the geographic tile size (512 is the default)
        zoomOffset: -1, // No zoom at render
        subdomains: 'abcd',
        accessToken: "pk.eyJ1IjoiemVza3kiLCJhIjoiY2p6b2k4ejJ3MDB1ZjNjcGR5aWFjcXI4YyJ9.3tK4ewbOKRAEw9BDA4xAkQ", // Map Box Default public token
  }).addTo(MapView); // Creates the map
}

function borradoTotal(){
    contador = 0;
    ChangeMap(0);
    marcadores.forEach(element => {
        MapView.removeLayer(element);
    });
    marcadores = [];
    let element = document.getElementById('Tile');
    element.value = "0";
}