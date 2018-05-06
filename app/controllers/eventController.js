const Event = require('./../models/Event');

const eventController = {
  index: function (req, res, next) {
    Event.find((err, results) => {
      if (err) {
        return next(new Error(err));
      }
      res.json(results)
    });
  },
  add: function (req, res, next) {
    Event.create({
      level: req.body.level,
      event: req.body.event,
      note: req.body.note,
      timestamp: new Date(),
    }, (error, probe) => {
      if (error) {
        res.status(400).send('Unable to create Probe');
      }
      res.status(200).json(probe);
    });
  },
};

module.exports = eventController;