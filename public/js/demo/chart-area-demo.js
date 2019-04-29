// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = 'Nunito', '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#858796';

function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.round(n * k) / k;
        };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}
// AJAX REQUEST WITH EVENT SOURCE TO GET DATA
window.onload = () => {
    var evtSource = new EventSource('/stream');
    evtSource.onmessage = e => {
        let data = JSON.parse(e.data);
        document.getElementById('gas-conc').innerText = data.conc;
        document.getElementById('temperature').innerText = data.temperature;
        document.getElementById('humidity').innerText = data.humidity;

        let ts = document.getElementsByClassName('t_stamp');
        [].forEach.call(document.getElementsByClassName('t_stamp'), el => {
            el.innerText = `${new Date(data.time_stamp)}`;
        });
    };
};

// FusionCharts.ready(function() {
//     var fusioncharts = new FusionCharts({
//         type: 'column2d',
//         renderAt: 'chart-container',
//         width: '100%',
//         height: '400',
//         dataFormat: 'jsonurl',
//         dataSource: '/chartdata',
//         type: 'line'
//     });
//     fusioncharts.render();
// });

// draw chart with humidity  data
function drawLineChart() {

    // // Add a helper to format timestamp data
    // Date.prototype.formatMMDDYYYY = function() {
    //     return (this.getMonth() + 1) +
    //         "/" + this.getDate() +
    //         "/" + this.getFullYear();
    // }

    var jsonData = $.ajax({
        url: 'http://localhost:5000/chartdata',
        dataType: 'json',
    }).done(function(results) {

        // Split timestamp and data into separate arrays
        var labels = [],
            data = [];
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAA", results)
        results["packets"].forEach(function(packet) {
            labels.push(new Date(packet.timestamp).formatMMDDYYYY());
            data.push(parseFloat(packet.payloadString));
        });

        // Create the chart.js data structure using 'labels' and 'data'
        // var tempData = {
        //     labels: labels,
        //     datasets: [{
        //         fillColor: "rgba(151,187,205,0.2)",
        //         strokeColor: "rgba(151,187,205,1)",
        //         pointColor: "rgba(151,187,205,1)",
        //         pointStrokeColor: "#fff",
        //         pointHighlightFill: "#fff",
        //         pointHighlightStroke: "rgba(151,187,205,1)",
        //         data: data
        //     }]
        // };

        // Get the context of the canvas element we want to select
        // var ctx = document.getElementById("myLineChart").getContext("2d");

        // Instantiate a new chart
        // var myLineChart = new Chart(ctx).Line(tempData, {
        //     //bezierCurve: false
        // });
    });
}

drawLineChart();

// Area Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
            label: "Earnings",
            lineTension: 0.3,
            backgroundColor: "rgba(78, 115, 223, 0.05)",
            borderColor: "rgba(78, 115, 223, 1)",
            pointRadius: 3,
            pointBackgroundColor: "rgba(78, 115, 223, 1)",
            pointBorderColor: "rgba(78, 115, 223, 1)",
            pointHoverRadius: 3,
            pointHoverBackgroundColor: "rgba(78, 115, 223, 1)",
            pointHoverBorderColor: "rgba(78, 115, 223, 1)",
            pointHitRadius: 10,
            pointBorderWidth: 2,
            data: [0, 10000, 5000, 15000, 10000, 20000, 15000, 25000, 20000, 30000, 25000, 40000],
        }],
    },
    options: {
        maintainAspectRatio: false,
        layout: {
            padding: {
                left: 10,
                right: 25,
                top: 25,
                bottom: 0
            }
        },
        scales: {
            xAxes: [{
                time: {
                    unit: 'date'
                },
                gridLines: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    maxTicksLimit: 7
                }
            }],
            yAxes: [{
                ticks: {
                    maxTicksLimit: 5,
                    padding: 10,
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + number_format(value);
                    }
                },
                gridLines: {
                    color: "rgb(234, 236, 244)",
                    zeroLineColor: "rgb(234, 236, 244)",
                    drawBorder: false,
                    borderDash: [2],
                    zeroLineBorderDash: [2]
                }
            }],
        },
        legend: {
            display: false
        },
        tooltips: {
            backgroundColor: "rgb(255,255,255)",
            bodyFontColor: "#858796",
            titleMarginBottom: 10,
            titleFontColor: '#6e707e',
            titleFontSize: 14,
            borderColor: '#dddfeb',
            borderWidth: 1,
            xPadding: 15,
            yPadding: 15,
            displayColors: false,
            intersect: false,
            mode: 'index',
            caretPadding: 10,
            callbacks: {
                label: function(tooltipItem, chart) {
                    var datasetLabel = chart.datasets[tooltipItem.datasetIndex].label || '';
                    return datasetLabel + ': $' + number_format(tooltipItem.yLabel);
                }
            }
        }
    }
});
