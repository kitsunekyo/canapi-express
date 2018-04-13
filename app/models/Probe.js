const mongoose = require('mongoose');

const probe = new mongoose.Schema({
  air_temperature: {
    type: Number,
  },
  air_humidity: {
    type: Number,
  },
  is_soil_dry: {
    type: Boolean
  },
  timestamp: {
    type: Date
  }
}, {
  collection: 'probes'
});

module.exports = mongoose.model('Probe', probe);
