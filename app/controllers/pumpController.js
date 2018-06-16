const PumpFactory = process.env.NODE_ENV === 'production' ? require('./../lib/PumpFactory') : require('./../mocks/lib/PumpFactory');
const pump = new PumpFactory(27);

const pumpController = {
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
    pump.runFor(7000).then(() => {
      res.send({
        message: 'watering',
        data: {
          timeout: 7000,
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
}
module.exports = pumpController;