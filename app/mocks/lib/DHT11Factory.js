console.log('MOCK');
// mock
function DHT11Factory() {
  return this;
}
DHT11Factory.prototype.read = function () {
  return new Promise((resolve, reject) => {
    setTimeout(()=>{
      resolve({
        air_humidity: Math.floor(Math.random() * 28) + 10,
        air_temperature: Math.floor(Math.random() * 28) + 10,
      });
    }, 3000);
  });
}

module.exports = DHT11Factory;
