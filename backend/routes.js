import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

// router.post('/api/events', async (req, res) => {
//     try {
//         const { event_name, users, startDateTime, endDateTime, availability } = req.body;

//         const newEvent = new Event({
//             event_name,
//             users,
//             startDateTime,
//             endDateTime,
//             availability,
//         });

//         await newEvent.save();
//         res.status(201).json({ message: "Event created successfully" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Server error" });
//     }
// });

router.post('/api/events/file', async (req, res) => {
    try {
        const { event_name, startDateTime, endDateTime } = req.body;

        const newEvent = {
            event_name,
            startDateTime,
            endDateTime,
        };

        const filePath = path.join(__dirname, 'events.json');
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Server error" });
            }

            const events = data ? JSON.parse(data) : [];
            events.push(newEvent);

            fs.writeFile(filePath, JSON.stringify(events, null, 2), 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Server error" });
                }

                res.status(201).json({ message: "Event saved to file successfully" });
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});

export default router;
