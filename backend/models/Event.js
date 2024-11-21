import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  user: { type: String, required: true },
  times: [{ type: Date, required: true }],
});

const eventSchema = new mongoose.Schema({
  event_name: { type: String, required: true },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  availability: [availabilitySchema],
});

const Event = mongoose.model('Event', eventSchema);
export default Event;
