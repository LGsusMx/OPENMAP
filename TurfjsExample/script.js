L.mapbox.accessToken = 'pk.eyJ1IjoiemVza3kiLCJhIjoiY2p6b2k4ejJ3MDB1ZjNjcGR5aWFjcXI4YyJ9.3tK4ewbOKRAEw9BDA4xAkQ';

var point = turf.point([-71.6497,41.434], {
    "title": "La salle Bajío",
    "marker-color": "#3bb2d0",
    "marker-symbol": "rocket",
    "marker-size": "large"
});

var buffer = turf.buffer(point, 80, 'kilometers');
var bbox = [-71.6497,41.434,-70.4443,42.8886];
var cellSide = 1.5;
var squareGrid = turf.squareGrid(bbox,cellSide);
var map = L.mapbox.map('map')
    .setView([-71.6497,41.434], 7)
    .featureLayer.setGeoJSON([point,buffer,squareGrid]);

    var OSM = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap </a>'
        +'contributors',
        maxZoom: 18
    }).addTo(map);

    var point1 = turf.point([-71.6497,41.434]);
    var point2 = turf.point([-70.4443,42.8886]);
    var bearing = turf.bearing(point1,point2);
    console.log('La distancia entre ambos puntos es: '+bearing);
    var distnaciax= 'La distancia entre ambos puntos es: '+bearing;

    