// mock
function PumpFactory(pin) {
  try {
    this.gpio = 1;
    this.status = this.gpio;
  } catch (e) {
    console.log('couldnt attach to GPIO pin #' + pin);
  }
  return this;
};
PumpFactory.prototype.on = function () {
  return new Promise((resolve, reject) => {
    this.gpio = 0;
    resolve();
  });
};
PumpFactory.prototype.off = function () {
  return new Promise((resolve, reject) => {
    this.gpio = 1;
    resolve();
  });
};
PumpFactory.prototype.runFor = function (duration = 5000) {
  return new Promise((resolve, reject) => {
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