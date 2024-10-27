import express from 'express';
import Event from './models/meetingtime.js'; 

const router = express.Router();

router.post('/api/events', async (req, res) => {
    try {
        const { event_name, users, startDateTime, endDateTime, availability } = req.body;

        const newEvent = new Event({
            event_name,
            users,
            startDateTime,
            endDateTime,
            availability,
        });

        await newEvent.save();
        res.status(201).json({ message: "Event created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
