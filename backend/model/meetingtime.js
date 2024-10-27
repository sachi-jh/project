import mongoose from 'mongoose';

const meetingTimeSchema = new mongoose.Schema({
    event_name: {
        type: String,
        required: true,
        minlength: 3,
    },
    users: {
        type: [String],
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    availability: {
        type: Object,
    },
},
    { timestamps: true 
});

const Event = mongoose.model("Event", meetingTimeSchema);
module.exports = Event;