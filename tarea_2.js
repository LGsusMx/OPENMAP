const TileProvider = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'; // Sets the tile provider
let MapView = L.map("Mapview").setView([21.1528845, -101.7113347], 13); // Sets the map location and zoom

L.tileLayer(TileProvider, {
      maxZoom: 20, // Sets the zoom level
      tileSize: 512, // Sets the geographic tile size (512 is the default)
      zoomOffset: -1, // No zoom at render
      subdomains: 'abcd',
      accessToken: "pk.eyJ1IjoiemVza3kiLCJhIjoiY2p6b2k4ejJ3MDB1ZjNjcGR5aWFjcXI4YyJ9.3tK4ewbOKRAEw9BDA4xAkQ", // Map Box Default public token
}).addTo(MapView); // Creates the map

var Marker = L.marker([21.1528845, -101.7113347]).addTo(MapView); // Adds a marker to the map

var newIconEven = L.icon({ // Crea un template para los Iconos.
    iconUrl:'ubicacion.png',
    iconSize:[60,60],
    iconAnchor:[30,60],
    popupAnchor:[-3,-76]
});

var newIconOdd = L.icon({ // Crea un template para los Iconos.
    iconUrl:'ubicacion2.png',
    iconSize:[60,60],
    iconAnchor:[30,60],
    popupAnchor:[-3,-76]
});
var firebaseConfig = {
  apiKey: "AIzaSyDtdoQeXdlgm1q7E8gEVrxZeOA-8fssxOM",
  authDomain: "sistemasgeo66292.firebaseapp.com",
  databaseURL: "https://sistemasgeo66292.firebaseio.com",
  projectId: "sistemasgeo66292",
  storageBucket: "sistemasgeo66292.appspot.com",
  messagingSenderId: "50590867142",
  appId: "1:50590867142:web:824a53e20de615f8c981c7"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

var Global = [];
var coordinates = [];
var globalx;
L.marker([21.16, -101.8],{icon:newIconEven}).addTo(MapView); // Crear un nuevo Icono.
MapView.doubleClickZoom.disable(); // Deshabilitar el zoom en doble click;

MapView.on('dblclick', function(e){ 
    let latlng = MapView.mouseEventToLatLng(e.originalEvent); //
    if (isOdd(Global.length) == 0) {
        L.marker([latlng.lat, latlng.lng],{icon:newIconEven}).addTo(MapView); // Crear un nuevo Icono.
    }
    else {
        L.marker([latlng.lat, latlng.lng],{icon:newIconOdd}).addTo(MapView); // Crear un nuevo Icono.
    }
    
    coordinates.push(new firebase.firestore.GeoPoint(latlng.lat, latlng.lng));
    Global.push(latlng);
    console.log(Global);
    if (Global.length == 1) {
      db.collection('puntosPoligonos').add({
        Poligono: coordinates
      }).then(function(docRef) {
        globalx = docRef.id;
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    }
    ClearMap();
    if (Global.length > 2) {
        var Polygon = L.polygon([Global]).addTo(MapView);
        db.collection('puntosPoligonos').doc(globalx).set({
          Poligono: coordinates
      }, { merge: true });
    }
});

function ClearMap() {
    for(MapViewLayers in MapView._layers) {
        if(MapView._layers[MapViewLayers]._path != undefined) {
            MapView.removeLayer(MapView._layers[MapViewLayers]);
        }
    }
}
function isOdd(Number) { return Number % 2;}
