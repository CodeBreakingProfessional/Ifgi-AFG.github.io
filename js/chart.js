var senseboxIds = ["59ba6c8ad67eb50011922fff", "5a0c2cc89fd3c200111118f0"];
var tempSensorIds = ["59ba6c8ad67eb50011923006", "5a0c2cc89fd3c200111118f7"];
/*get sensebox data*/
var x = 0;
var requestsArray = [];
var fromDate = new Date();
fromDate.setMonth(fromDate.getMonth() - 1);
fromDate = fromDate.toISOString();
console.log(fromDate);
for(x; x < senseboxIds.length; x++){
  requestsArray.push($.get( "https://api.opensensemap.org/boxes/" + senseboxIds[x] + "/data/" + tempSensorIds[x] + "?from-date=" + fromDate ));
}
$.when.apply($, requestsArray).done(function (data1, data2) {
  console.log(data1);
  console.log(data2);
  chart(data1[0], data2[0]);
});
function chart(data1, data2){
var tempDataH = [];
var tempDataM = [];
var x = 0;
var y = 0;
for (var i = 0; i < data1.length; i++) {
    y = y + parseFloat(data1[i].value);
    if(i % 199 == 0 && i != 0){ 
        console.log(y);
        var value = {
        x: data1[i -50].createdAt ,
        y: y/200,
        }
        tempDataH.push(value);
        y = 0;
    }
}
for (var j = 0; j < data2.length; j++) {
    x = x + parseFloat(data2[j].value);
    if(j % 99 == 0 && j != 0){
        console.log(x);  
        var value = {
        x: data2[j -50].createdAt,
        y: x/100,
    }
        tempDataM.push(value);
        x = 0;
    }
}

var timeFormat = 'YYYY-MM-DDTHH:mm:ss.sssZ';
  var ctx = $('#tempChart');
  var tempChart = new Chart(ctx, {
        type:'line',
        data:{
            datasets: [
                {
                    label: "Nottuln-Darup",
                    data: tempDataH,
                    fill: false,
                    borderColor: "#3e95cd"
                },
                {
                    label: "Münster",
                    data: tempDataM,
                    fill: false,
                    borderColor: "#8e5ea2"

                }
            ]
        },
        options: {
            
            scales:     {
                xAxes: [{
                    type:"time",
                    time:{
                        parser: timeFormat,
                        tooltipFormat: 'll'
                    },
                    scaleLabel: {
                        display:true,
                        labelString: 'Datum'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display:     true,
                        labelString: 'Temperatur in °C'
                    }
                }]
            }
        }
});}
