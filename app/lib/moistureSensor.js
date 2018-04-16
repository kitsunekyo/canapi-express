const Gpio = require('onoff').Gpio;

const moistureSensorFactory = (pin) => {
  const gpio = new Gpio(pin, 'in');
  return {
    gpio,
    read: () => {
      return new Promise((resolve, reject) => {
        try {
          const read = gpio.readSync();
          const readable = (read === 1) ? 'dry' : 'wet';
          resolve({
            'soil_raw_data': read,
            'soil_status': readable,
          });
        } catch (e) {
          reject(e);
        }
      });
    }
  };
}
module.exports = moistureSensorFactory;
