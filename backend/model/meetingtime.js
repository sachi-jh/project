import mongoose from 'mongoose';

const meetingTimeSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true,
        unique: false,
        minlength: 3,
      },
      users: {
        type: Array,
        required: true,
      },
      startdate: {
        type: String,
        required: true,
      },
      enddate: {
        type: String,
        required: true,
      },
      starttime: {
        type: String,
        required: true,
      },
      endtime: {
        type: String,
        required: true,
      },
      availability: {
        type: Object,
      },
    },
    { timestamps: true 
});

const User = mongoose.model("User", eventSchema);
module.exports = User;