const TileProvider = 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png'; // Sets the tile provider
let MapView = L.map("Mapview").setView([21.1528845, -101.7113347], 13); // Sets the map location and zoom

L.tileLayer(TileProvider, {
      maxZoom: 20, // Sets the zoom level
      tileSize: 512, // Sets the geographic tile size (512 is the default)
      zoomOffset: -1, // No zoom at render
      subdomains: 'abcd',
      accessToken: "pk.eyJ1IjoiemVza3kiLCJhIjoiY2p6b2k4ejJ3MDB1ZjNjcGR5aWFjcXI4YyJ9.3tK4ewbOKRAEw9BDA4xAkQ", // Map Box Default public token
}).addTo(MapView); // Creates the map
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


var Marker = L.marker([21.1528845, -101.7113347]).addTo(MapView); // Adds a marker to the map
var newIcon = L.icon({ // Crea un template para los Iconos.
    iconUrl:'ubicacion.png',
    iconSize:[60,60],
    iconAnchor:[30,60],
    popupAnchor:[-3,-76]
});
var positionOptions = {
    enableHighAccuracy: true,
    timeout: 10 * 1000,  //10 segundos
    maximumAge: 30 * 1000  //30 segundos
};
var Global = [];

//L.marker([21.16, -101.8],{icon:newIcon}).addTo(MapView); // Crear un nuevo Icono.
MapView.doubleClickZoom.disable(); // Deshabilitar el zoom en doble click;

function getLocation() {
    db.collection("personasGuardadas").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            L.marker([doc.data().ubicacion.latitude, doc.data().ubicacion.longitude]).addTo(MapView); 
        });
    });
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(updatePosition);
        document.getElementById("mlatitud").style.display = "none";
        document.getElementById("mlongitud").style.display = "none";
        document.getElementById("btnGuardar").style.display = "none";
      } else {
        document.getElementById("mlatitud").style.display = "block";
        document.getElementById("mlongitud").style.display = "block";
        document.getElementById("btnGuardar").style.display = "block";
        document.getElementById("btnGuardar").addEventListener("click", guardadoManual); 
    }
}
var globalx;
var watchId = null;
function updatePosition(position) {
    watchId = navigator.geolocation.watchPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        var newLatLng = new L.LatLng(lat, lng);
        MapView.panTo(newLatLng);
        Marker.setLatLng(newLatLng);
        SaveFireBase(lat,lng,'WatchPosition');
        console.log(lat +' '+ lng); 
    }, error, positionOptions);
}
function guardadoManual(){
    var lat = parseFloat(document.getElementById("mlatitud").value);
    var lng = parseFloat(document.getElementById("mlongitud").value); 
    var newLatLng = new L.LatLng(lat, lng);
    MapView.panTo(newLatLng);
    Marker.setLatLng(newLatLng);
    SaveFireBase(lat,lng,'manual');
}
function error(positioError) {
    console.log(positioError.messsage);
}
getLocation();

function SaveFireBase(lat,lng,type){
    var coordinates= new firebase.firestore.GeoPoint(lat, lng);
    if (globalx == null) {
        db.collection('personasGuardadas').add({
            ubicacion: coordinates,
            metodo:type
          }).then(function(docRef) {
            globalx = docRef.id;
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    else{
        db.collection('personasGuardadas').doc(globalx).set({
            ubicacion: coordinates
        }, { merge: true });
    }
    
}