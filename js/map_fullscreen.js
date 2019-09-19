"use strict";
loadData();
function createPolylinePointsTemp (data) {
	return data.map(function (item) {
			var trkpt = L.latLng(item.Lat, item.Long, item.Temperature);
			//trkpt.meta = item.meta;
			return trkpt;
	});
}
function createPolylinePointsHumidity (data) {
	return data.map(function (item) {
		var trkpt = L.latLng(item.Lat, item.Long, item.Humidity);
		// trkpt.meta = item.meta;
		return trkpt;
	});
}
function createPolylinePointsPM2 (data) {
	return data.map(function (item) {
			var trkpt = L.latLng(item.Lat, item.Long, item.PM25);
			return trkpt;
	});
}

function loadData () {
	$.ajax({
    url: 'https://raw.githubusercontent.com/Ifgi-AFG/Ifgi-AFG.github.io/master/Data_collected_Sensebox.csv',
    dataType: 'text',
    }).done(successFunction);        
}
function successFunction(data){
	var data1 = $.csv.toObjects(data);
	console.log(data1);
	for (var i = 0; i < 100; i++) {
	data1.forEach((line, i) => {		
		if(line.Lat === "0" || line.Long === "0" ){
			data1.splice(i, 1);
		}
	})};
	console.log(data1);
	var tempPolylines = createPolylinePointsTemp(data1);
	var pmPolylines = createPolylinePointsPM2(data1);
	console.log(pmPolylines);
	createPolylineOptionsPoints(tempPolylines,pmPolylines);
}


/* init map */
var map = L.map('mapid').setView([51.965, 7.600], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
/*get sensebox data*/
function createPolylineOptionsPoints (polylines1,polylines2){

	var tempPolylines = 
L.multiOptionsPolyline(polylines1, {
    multiOptions: {
        optionIdxFn: function (latLng) {
            var i,
                altThresholds = [9, 12, 15, 18, 21, 24, 27 , 30];

            for (i = 0; i < altThresholds.length; ++i) {
                if (latLng.alt <= altThresholds[i]) {
                    return i;
                }
            }
            return altThresholds.length;
        },
        options: [
            {color: '#0000FF'}, {color: '#0040FF'}, {color: '#0080FF'},
            {color: '#00FFB0'}, {color: '#00E000'}, {color: '#80FF00'},
            {color: '#FFFF00'}, {color: '#FFC000'}, {color: '#FF0000'}
        ]
    },
    weight: 5,
    lineCap: 'butt',
    opacity: 0.75,
    smoothFactor: 1});
	var pmPolylines = L.multiOptionsPolyline(polylines2, {
    multiOptions: {
        optionIdxFn: function (latLng) {
            var i,
                altThresholds = [2.5, 2.7, 2.9, 3.1, 3.3, 3.5, 3.7 , 3.9];

            for (i = 0; i < altThresholds.length; ++i) {
                if (latLng.alt <= altThresholds[i]) {
                    return i;
                }
            }
            return altThresholds.length;
        },
        options: [
            {color: '#0000FF'}, {color: '#0040FF'}, {color: '#0080FF'},
            {color: '#00FFB0'}, {color: '#00E000'}, {color: '#80FF00'},
            {color: '#FFFF00'}, {color: '#FFC000'}, {color: '#FF0000'}
        ]
    },
    weight: 5,
    lineCap: 'butt',
    opacity: 0.75,
    smoothFactor: 1});
    var  layers = {
		"Temperatur": tempPolylines,
		"Feinstaub": pmPolylines
	}
    tempPolylines.addTo(map);
    L.control.layers(layers,null,{collapsed:false}).addTo(map);

}
var legend = L.control({position: 'bottomleft'});
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend');
    /*var labels = ['<strong>Categories</strong>'],
    categories = ['Low','Signage','Line Markings','Roadside Hazards','Other'];

    for (var i = 0; i < categories.length; i++) {
        div.innerHTML += 
        labels.push('<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +  (categories[i] ? categories[i] : '+'));
    }
    div.innerHTML = labels.join('<br>');*/
    div.innerHTML = "<div style='display:inline; background-color: white;'><img src='images/Unterwegs_ChatBot.jpg' style=' width: 20%'><br> Die angezeigten Daten wurden mit Hilfe von E-Scootern und Senseboxen gesammelt.<br>Niedrig <img style='width: 20%; height: 5%;'src='images/legendColor.png'> Hoch</div>";
    return div;
};
legend.addTo(map);
