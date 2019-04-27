const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Sensor = new Schema({
    name: String, //channel
    logs: [{
        humidity: Number, //moisture sensor
        temperature: Number, //temperature sensor
        water_level: Number, //water level sensor
        time_stamp: {
            type: Date,
            default: Date.now,
            required: false
        }
    }]
});

module.exports = mongoose.model('Sensor', Sensor);