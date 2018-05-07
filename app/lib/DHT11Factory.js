const PythonShell = require('python-shell');

function DHT11Factory() {
  return this;
};
DHT11Factory.prototype.read = function () {
  return new Promise((resolve, reject) => {
    PythonShell.run('app/python-scripts/dht.py', (err, results) => {
      if (err) throw err;
      if (results.length > 1) {
        let air_humidity = parseFloat(results[0]);
        let air_temperature = parseFloat(results[1]);
        resolve({
          air_humidity,
          air_temperature,
        });
      } else {
        reject();
      }
    });
  });
};

module.exports = DHT11Factory;
