const mongoose = require('mongoose');

const event = new mongoose.Schema({
  timestamp: {
    type: Date,
  },
  level: {
    type: String,
    required: true,
  },
  event: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  }
}, {
  collection: 'events'
});

module.exports = mongoose.model('Event', event);