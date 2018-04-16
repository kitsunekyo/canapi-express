const ENV = require('./../../ENV');

const PumpFactory = ENV.PI ? require('./../lib/pump') : require('./../mocks/lib/pump');
const DHT11Factory = ENV.PI ? require('./../lib/dht11') : require('./../mocks/lib/dht11');

const pump = new PumpFactory(27);

const piController = {
  getDHT: function (req, res, next) {
    const dht = new DHT11Factory();
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
  startPump: function (req, res, next) {
    // const pump = new PumpFactory(27);
    pump.on().then(() => {
      res.send('pump started');
    }, (err) => {
      //
    });
  },
  stopPump: function (req, res, next) {
    // const pump = new PumpFactory(27);
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
    // const pump = new PumpFactory(27);
    pump.getState().then((state) => {
      res.send(state);
    }, (e) => {
      console.log(e);
    });
  },
  water: function (req, res, next) {
    // const pump = new PumpFactory(27);
    pump.runFor(5000).then(() => {
      res.send({
        message: 'watering',
        data: {
          timeout: 5000,
        },
      });
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