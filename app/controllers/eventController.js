const Event = require('./../models/Event');
const EventService = require('./../lib/EventService');

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
    EventService.create(req.body).then((probe) => {
      res.status(200).json(probe);
    }, (err) => {
      res.status(400).send(err);
    });
  },
};

module.exports = eventController;