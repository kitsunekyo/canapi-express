const Gpio = require('onoff').Gpio;

const EventService = require('./EventService');

function PumpFactory(pin) {
  try {
    this.gpio = new Gpio(pin, 'out');
    this.gpio.writeSync(1);
    this.status = this.gpio.readSync();
  } catch (e) {
    console.log('couldnt attach to GPIO pin #' + pin);
  }
  return this;
}
PumpFactory.prototype.on = function () {
  return new Promise((resolve, reject) => {
    this.gpio.writeSync(0);
    resolve();
  });

};
PumpFactory.prototype.off = function () {
  return new Promise((resolve, reject) => {
    this.gpio.writeSync(1);
    resolve();
  });

};
PumpFactory.prototype.runFor = function (duration = 5000) {
  return new Promise((resolve, reject) => {
    EventService.create({
      level: 'info',
      event: 'watered',
      note: `for ${duration} milliseconds`
    });
    this.off(); // shut off first
    this.on();
    setTimeout(() => {
      this.off();
    }, duration);
    resolve();
  });
};
PumpFactory.prototype.getState = function () {
  return new Promise((resolve, reject) => {
    const pinState = this.gpio;
    let status = "unknown";
    if (this.status !== undefined) {
      status = this.status === 1 ? "off" : "on";
      resolve(status);
    }
    reject();
  });
};

module.exports = PumpFactory;