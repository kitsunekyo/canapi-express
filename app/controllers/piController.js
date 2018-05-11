const DHT11Factory = process.env.NODE_ENV === 'production' ? require('./../lib/DHT11Factory') : require('./../mocks/lib/DHT11Factory');
const dht = new DHT11Factory();
const moistureSensorFactory = process.env.NODE_ENV === 'production' ? require('./../lib/MoistureSensorFactory') : require('./../mocks/lib/MoistureSensorFactory');
const moistureSensor = moistureSensorFactory(17);

const piController = {
  getDHT: function (req, res, next) {
    dht.read().then((reading) => {
      res.send(reading);
    });
  },
  getMoisture: function (req, res, next) {
    moistureSensor.read().then((reading) => {
      res.send(reading);
    });
  },
  getSensors: function (req, res, next) {
    let response = null;
    moistureSensor.read()
      .then((res_moisture) => {
        response = res_moisture
        return res_moisture;
      }, () => {
        response = {
          "soil_raw_data": null,
          "soil_status": null,
        };
        return {};
      })
      .then(() => { return dht.read() })
      .then((res_dht) => {
        response = Object.assign(res_dht, response);
        res.send(response);
      }, () => {
        response = Object.assign({
          air_temperature: null,
          air_humidity: null,
        }, response)
      });
  },
};

module.exports = piController;