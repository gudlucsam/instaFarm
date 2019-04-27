const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Sensor = new Schema({
  ser_no: String,
  last_online: {
    type: Date,
    default: Date.now,
    required: false
  },
  logs: [ 
    {
      //humidity: Number,
      temperature: Number,
      concentration: Number,
      time_stamp: {
        type: Date,
        default: Date.now,
        required: false 
      }
    }
  ]
});

module.exports = mongoose.model('Sensor', Sensor);
