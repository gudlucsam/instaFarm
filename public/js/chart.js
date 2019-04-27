window.onload = () => {
  var evtSource = new EventSource('/stream');
  evtSource.onmessage = e => {
    let data = JSON.parse(e.data);
    document.getElementById('gas-conc').innerText = data.water_level;
    document.getElementById('temperature').innerText = data.temperature;
    document.getElementById('humidity').innerText = data.humidity;
    let ts = document.getElementsByClassName('t_stamp');
    [].forEach.call(document.getElementsByClassName('t_stamp'), el => {
      el.innerText = `${new Date(data.time_stamp)}`;
    });
  };
};
FusionCharts.ready(function() {
  var fusioncharts = new FusionCharts({
    type: 'column2d',
    renderAt: 'chart-container',
    width: '100%',
    height: '400',
    dataFormat: 'jsonurl',
    dataSource: '/chartdata',
    type: 'line'
  });
  fusioncharts.render();
});
