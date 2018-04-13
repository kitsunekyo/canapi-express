const Gpio = require('onoff').Gpio;

function PumpFactory(pin) {
  try {
    this.gpio = new Gpio(pin, 'out');
    this.gpio.writeSync(1);
    this.status = this.gpio.readSync();
  } catch(e) {
    console.log('couldnt attach to GPIO pin #' + pin);
  }
  return this;
}
PumpFactory.prototype.on = function() {
  this.gpio.writeSync(0);
};
PumpFactory.prototype.off = function() {
  this.gpio.writeSync(1);
};
PumpFactory.prototype.runFor = function(duration) {
  this.off(); // shut off first
  this.on();
  setTimeout(this.off(), 1500);
}
module.exports = PumpFactory;
