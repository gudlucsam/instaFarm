var express = require('express');
var router = express.Router();
const moment = require('moment');
const { connect } = require('mqtt');
const debug = require('debug')('lpg:index.js');
const async = require('async');

//Local imports
const Sensor = require('../models/sensor');
const { mqtt } = require('../config/env');

let i = 20000;

//Debug the index module

//MQTT setup
const client = connect(
    mqtt.url,
    mqtt.options
);

client.once('connect', () => {
    debug('MQTT client connected.');
    client.subscribe("#", (err, granted) => {
        if (err) return debug(err);
        debug(`Subscribed to ${granted[0].topic}`);
    });
});

router.get('/', function(req, res, next) {
    res.render('home', {
        title: 'InstaFarm'
    });
});

router.get('/login', function(req, res, next) {
    res.render('login', {
        title: 'InstaFarm'
    });
});

/* GET home page. */
router.get('/dashboard', function(req, res, next) {
    Sensor.findOne({}, {
        logs: {
            $slice: -1
        }
    }, function(err, result) {
        if (err) return res.status(500).render('error', {
                error: err
            })
            // console.log("dsfdfsdfsdfd", result)
        res.render('index2', {
            title: 'instaFarm Admin - Dashboard',
            result: result.logs[0]
        });
    });
});


router.get('/ping', function(req, res, next) {
    res.send('PONG');
});

// Humidity chart
router.get('/chartdata', (req, res) => {
    Sensor.findOne({}, {
        logs: {
            $slice: -10
        }
    }).exec((err, logs) => {
        if (err) return res.send(err);
        var chart = {
            chart: {
                caption: 'Moisture in the Soil',
                subCaption: 'In grams of water vapor per cubic meter of air(g/m3)',
                xAxisName: 'Time',
                yAxisName: 'Humidity',
                numberSuffix: "g/m³",
                theme: 'fusion'
            },
            data: []
        };

        async.forEachOf(
            logs.logs,
            (value, key, callback) => {
                try {
                    chart.data[key] = {
                        label: moment(value.time_stamp).fromNow('m'),
                        value: value.humidity
                    };
                } catch (e) {
                    return callback(e);
                }
                callback();
            },
            err => {
                if (err) return res.status(500).send(err);
                res.json(chart);
            }
        );
    });
});

// Water level chart
router.get('/water-level', (req, res) => {
    Sensor.findOne({}, {
        logs: {
            $slice: -10
        }
    }).exec((err, logs) => {
        if (err) return res.send(err);
        var chart = {
            chart: {
                caption: 'Water level of the soil',
                subCaption: 'In cumic meters',
                xAxisName: 'Time',
                yAxisName: 'Water level',
                numberSuffix: "m³",
                theme: 'fusion'
            },
            data: []
        };
        async.forEachOf(
            logs.logs,
            (value, key, callback) => {
                try {
                    chart.data[key] = {
                        label: moment(value.time_stamp).fromNow('m'),
                        value: value.water_level
                    };
                } catch (e) {
                    return callback(e);
                }
                callback();
            },
            err => {
                if (err) return res.status(500).send(err);
                res.json(chart);
            }
        );
    });
});

// Temperature chart 
router.get('/temperature', (req, res) => {
    Sensor.findOne({}, {
        logs: {
            $slice: -10
        }
    }).exec((err, logs) => {
        if (err) return res.send(err);
        var chart = {
            chart: {
                caption: 'Temperature of the soil',
                subCaption: 'In degree celcius',
                xAxisName: 'Time',
                yAxisName: 'Temperature',
                numberSuffix: "°C",
                theme: 'fusion'
            },
            data: []
        };
        async.forEachOf(
            logs.logs,
            (value, key, callback) => {
                try {
                    chart.data[key] = {
                        label: moment(value.time_stamp).fromNow('m'),
                        value: value.temperature
                    };
                } catch (e) {
                    return callback(e);
                }
                callback();
            },
            err => {
                if (err) return res.status(500).send(err);
                res.json(chart);
            }
        );
    });
});

router.get('/logs', function(req, res, next) {
    res.render('table', {
        title: 'Raw Data'
    });
});

// sensor reading history
router.get('/rawdata', function(req, res, next) {

    Sensor.findOne({}, {
        logs: 1
    }).exec((err, result) => {
        console.log(result.logs);
        if (err) return debug(err);
        res.render('tables2', {
            results: result.logs
        });

    });

});

// Sensor reading history
// router.get('/tabledata', function(req, res) {
//     Sensor.findOne({}, {
//         logs: 1
//     }).exec((err, result) => {
//         if (err) return debug(err);
//         res.json(result);
//     });
// });

//MQTT endpoints
router.get('/update', (req, res, next) => {
    let query = req.query;
    query.time_stamp = new Date();

    client.publish(req.query.name, JSON.stringify(query), err => {
        if (err) {
            debug(err);
            return res.status(500).send(err.message);
        }
        Sensor.findOneAndUpdate({
            name: req.query.name
        }, {
            $addToSet: {
                logs: {
                    humidity: req.query.humidity,
                    water_level: req.query.water_level,
                    temperature: req.query.temperature,
                    time_stamp: query.time_stamp
                }
            }
        }).exec((err, result) => {
            if (err) debug(err);
            debug(result);
        });
        return res.status(204).end();
    });
});

router.post('/create-sensor', function(req, res, next) {
    var newSensor = new Sensor(req.body);
    newSensor.save((err, result) => {
        if (err) return debug(err);
        res.json(result)
    })
});


router.get('/stream', (req, res) => {
    req.socket.setTimeout(Number.MAX_SAFE_INTEGER);
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive'
    });
    res.write('\n');

    var timer = setInterval(() => {
        res.write(':' + '\n');
    }, 18000);

    // When the data arrives, send it in the form
    client.on('message', (topic, message) => {

        res.write('data:' + message + '\n\n');
    });

    req.on('close', () => {
        clearTimeout(timer);
    });
});

module.exports = router;

client.on('error', err => {
    console.error(err);
    debug(err);
});