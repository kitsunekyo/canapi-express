// mock
const moistureSensorFactory = (pin) => {
  const gpio = 1;
  return {
    gpio,
    read: () => {
      return new Promise((resolve, reject) => {
        try {
          const read = gpio;
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
