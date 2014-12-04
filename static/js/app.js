// Instancier la carte 
var map = L.map('map', {
  scrollWheelZoom: false
});

// Donner un centre et un zoom à la carte
map.setView([47.2061, -1.5519], 13);

// Passer une chaine pour l'attribution
var attribution = 'Tuiles mise à disposition par <a href="http://openstreetmap.se/" target="_blank">OpenStreetMap Suède</a> &mdash; Données <a href="http://www.openstreetmap.org/copyright">&copy; les contributeurs OpenStreetMap</a>';

// Déclarer le motif pour les urls des tuiles qui seront utilisées
var tiles = 'http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png';
 
// Créer la couche de tuiles en passant l'url des tuiles, les sous-domaines,
// le seuil de zoom et enfin l'attribution
var layer = L.tileLayer(tiles, {
  subdomains: "1234",
  maxZoom: 18,
  attribution: attribution
});
 
// Enfin, terminer en ajoutant la couche avec les tuiles sur la carte
layer.addTo(map);

// On construit l'icone une seule fois comme elle on a choisi de faire
// un point = même icone dans tous les cas
var icon = new L.Icon({
  iconUrl:'static/img/beer1.png',
  iconSize: new L.Point(32, 37),
  iconAnchor: new L.Point(18, 37),
  popupAnchor: new L.Point(0, -37)
});

// "L'appel de la bière" qu'on ajoute à la carte
L.layerJSON({
  url: 'http://overpass-api.de/api/interpreter?data=[out:json];node({lat1},{lon1},{lat2},{lon2})[amenity=bar];out;',
  propertyItems: 'elements',
  propertyTitle: 'tags.name',
  propertyLoc: ['lat','lon'],
  buildIcon: function(data, title) {
    return icon;
  },
  buildPopup: function(data, marker) {
    return data.tags.name || null;
  }
}).addTo(map);
