"use strict";
/* init map */
var map = L.map('mapid').setView([51.505, -0.09], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
/*get sensebox data*/
$.get( "https://api.opensensemap.org/boxes/599449ce7e280a00106ee978", function( data ) {
  console.log(data);
});