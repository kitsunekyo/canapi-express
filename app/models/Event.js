const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
mongoosePaginate.paginate.options = {
  lean: true,
  limit: 20
};

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

event.plugin(mongoosePaginate);
module.exports = mongoose.model('Event', event);