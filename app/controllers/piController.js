// const PumpFactory = require('./../lib/pump');
// const DHT11Factory = require('./../lib/dht11');

const PumpFactory = require('./../mocks/lib/pump');
const DHT11Factory = require('./../mocks/lib/dht11');

const piController = {
  getDHT: function (req, res, next) {
    const dht = new DHT11Factory();
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
  startPump: function (req, res, next) {
    const pump = new PumpFactory(27);
    pump.on().then(() => {
      res.send('pump started');
    }, (err) => {
      //
    });
  },
  stopPump: function (req, res, next) {
    const pump = new PumpFactory(27);
    pump.off().then(() => {
      res.send('pump stopped');
    }, (err) => {
      //
    });
  },
  getSensors: function (req, res, next) {
    const dht = new DHT11Factory();
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
  getPumpStatus: function (req, res, next) {
    const pump = new PumpFactory(27);
    pump.getState().then((state) => {
      res.send(state);
    }, (e) => {
      console.log(e);
    });
  },
  water: function (req, res, next) {
    const pump = new PumpFactory(27);
    pump.runFor(5000).then(() => {
      res.send('watered');
    }, (err) => {
      pump.off().then(() => {
        res.send('pump stopped');
      }, (err) => {
        //
      });
    });
  },
};

module.exports = piController;