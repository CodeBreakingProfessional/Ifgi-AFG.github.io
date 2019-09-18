var ctx = $('#tempChart');
var tempChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [23,24,25,26,27,28,29],
      datasets: [{ 
          data: [10,12,13,14,10,11,13],
          label: "Münster",
          borderColor: "#3e95cd",
          fill: false
        }, { 
          data: [10,11,13,8,9,10, 11],
          label: "Havixbeck",
          borderColor: "#8e5ea2",
          fill: false
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: 'Temperatur in Münster und Havixbeck vom 23.10.19 - 29.10.19'
      },
      scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});