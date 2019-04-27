const url = require('url');
const mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
const mqtt_auth = (mqtt_url.auth || ':').split(':');

module.exports = {
<<<<<<< HEAD:instaFarm/config/env.js
    database: {
        url: process.env.MONGODB_URI
    },
    mqtt: {
        url: mqtt_url,
        channel: process.env.MQTT_CHANNEL,
        options: {
            port: mqtt_url.port,
            host: mqtt_url.host,
            username: mqtt_auth[0],
            password: mqtt_auth[1],
            keepalive: 60,
            reconnectPeriod: 1000,
            protocolId: 'MQIsdp',
            protocolVersion: 3,
            clean: true,
            encoding: 'utf8'
        }
=======
  database: {
    url: process.env.MONGODB_URI
  },
  mqtt: {
    url: mqtt_url,
    //channel: process.env.MQTT_CHANNEL,
    options: {
      port: mqtt_url.port,
      host: mqtt_url.host,
      username: mqtt_auth[0],
      password: mqtt_auth[1],
      keepalive: 60,
      reconnectPeriod: 1000,
      protocolId: 'MQIsdp',
      protocolVersion: 3,
      clean: true,
      encoding: 'utf8'
>>>>>>> 9c762fa0967fa83f474fbe57114be1b77d48d793:config/env.js
    }
};