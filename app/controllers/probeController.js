const Probe = require('./../models/Probe');

const probeController = {
  index: function (req, res, next) {
    Probe.find((err, results) => {
      if (err) {
        return next(new Error(err));
      }
      res.json(results)
    });
  },
  add: function (req, res, next) {
    Probe.create({
      air_temperature: req.body.air_temperature,
      air_humidity: req.body.air_humidity,
      is_soil_dry: req.body.is_soil_dry,
      timestamp: new Date(),
    }, (error, probe) => {
      if (error) {
        res.status(400).send('Unable to create Probe');
      }
      res.status(200).json(probe);
    });
  },
  mock: function(req, res, next) {
    Probe.collection.insert(req.body, (error, dataset) => {
      if (error) {
        res.status(400).send('Unable to create Probe');
      }
      res.status(200).json(dataset);
    });
  },
};

module.exports = probeController;