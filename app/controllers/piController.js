// const PumpFactory = require('./../lib/pump');
const DHT11Factory = require('./../lib/dht11');

const piController = {
  getDHT: function (req, res, next) {
    const dht = new DHT11Factory();
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
  startPump: function (req, res, next) {
    const pump = new PumpFactory(27);
    pump.on();
    res.render('index');
  },
  stopPump: function (req, res, next) {
    const pump = new PumpFactory(27);
    pump.off();
    res.render('index');
  },
};

module.exports = piController;