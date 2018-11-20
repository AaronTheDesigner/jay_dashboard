const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    event: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: String, required: true},
    summary: { type: String, required: true }
  }
);

// Virtual for event's URL
EventSchema
.virtual('url')
.get(function () {
  return '/dash/event' + this._id;
});

// Export Model
module.exports = mongoose.model('Event', EventSchema);