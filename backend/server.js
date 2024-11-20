import express from "express";
import cors from "cors";
import router from "./routes.js";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();

app.use(express.json());
app.use(cors());

app.post('/api/createEvent/file', async (req, res) => {
  try {
      const { event_name, startDateTime, endDateTime } = req.body;

      const newEvent = {
          event_name,
          startDateTime,
          endDateTime,
      };


      const filePath = path.join(__dirname, '/jsonStorage/events.json');
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

app.post('/api/submitAvailability/file', async (req, res) => {
    try {
      const { event_name, availability } = req.body;
      const availabilityArray = Array.isArray(availability) ? availability : [availability];

      const filePath = path.join(__dirname, 'jsonStorage/events.json');
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Server error' });
        }
  
        const events = data ? JSON.parse(data) : [];
        const eventIndex = events.findIndex(event => event.event_name === event_name);
  
        if (eventIndex === -1) {
          return res.status(404).json({ message: 'Event not found' });
        }
  
        // Add availability to the existing event
        if (!events[eventIndex].availability) {
          events[eventIndex].availability = [];
        }

        events[eventIndex].availability.push(...availabilityArray);
  
        fs.writeFile(filePath, JSON.stringify(events, null, 2), 'utf8', (err) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
          }
  
          res.status(201).json({ message: 'Availability added successfully' });
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.get('/api/events', (req, res) => {
    const filePath = path.join(__dirname, 'jsonStorage/events.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Server error' });
        }

        const events = data ? JSON.parse(data) : [];
        res.status(200).json(events);
    });
});
/*
app.get('/api/getAvailability/:eventName', (req, res) => {
  const { eventName } = req.params;
  const data = JSON.parse(fs.readFileSync('events.json'));

  const event = data.find(event => event.event_name === eventName);
  if (event) {
      res.json(event);
  } else {
      res.status(404).json({ message: "Event not found" });
  }
});*/

//if (process.env.NODE_ENV === "production") {
// if (true) {
//   // static folder
//   app.use(express.static("../frontend/dist/"));

//   // handle SPA
//   app.get(/.*/, (req, res) => res.sendFile("../frontend/dist/index.html"));
// }

const port = process.env.PORT || 5000 ;
app.listen(port, () => console.log(`Listening to port ${port}`));
