const ENV = require('./../../ENV');

const DHT11Factory = ENV.PI ? require('./../lib/dht11') : require('./../mocks/lib/dht11');
const dht = new DHT11Factory();

const piController = {
  getDHT: function (req, res, next) {
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
  getSensors: function (req, res, next) {
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
};

module.exports = piController;