import express from "express";
import cors from "cors";
import router from "./routes.js";
import path from 'path';
import fs from 'fs';
import { domainToASCII, fileURLToPath } from 'url';
import { dirname } from 'path';
import connectDB from './db.js';
import Event from "./models/Event.js";
import dotenv from 'dotenv';  // Import dotenv package

dotenv.config();  // Load environment variables from .env file

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//const express = require('express');
//const connectDB = require('./db'); // Import the database connection
//const Event = require('./models/Event');

const app = express();

app.use(express.json());
app.use(cors());

connectDB(); // Connect to the database
app.post('/api/createEvent', async (req, res) => {
  console.log("Route /api/createEvent hit");
  try {
    const { event_name, startDateTime, endDateTime} = req.body;
    //console.log("Request body:", req.body);


    const newEvent = new Event({
      event_name,
      startDateTime,
      endDateTime,
      //availability: [], // Initialize an empty availability array
    });

    await newEvent.save();

    res.status(201).json({ message: "Event created successfully", event: newEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post('/api/submitAvailability', async (req, res) => {
  try {
    const { event_name, username, availability } = req.body; // Add `username` to the request body
    if (!event_name || !username || !availability) {
      return res.status(400).json({ message: 'Missing required fields: event_name, username, or availability' });
    }

    // Ensure `availability` is an array
    const availabilityArray = Array.isArray(availability) ? availability : [availability];

    // Find the event
    const event = await Event.findOne({ event_name });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Check if the user already has availability submitted
    const userAvailability = event.availability.find((entry) => entry.user === username);

    if (userAvailability) {
      // If user exists, append new times (avoiding duplicates)
      userAvailability.times = [...new Set([...userAvailability.times, ...availabilityArray])];
    } else {
      // If user does not exist, add new user availability
      event.availability.push({ user: username, times: availabilityArray });
    }

    // Save the updated event
    await event.save();

    res.status(201).json({ message: 'Availability added successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/*app.post('/api/submitAvailability', async (req, res) => {
  try {
    const { event_name, availability } = req.body;
    const availabilityArray = Array.isArray(availability) ? availability : [availability];

    const event = await Event.findOne({ event_name });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    event.availability.push(...availabilityArray);
    await event.save();

    res.status(201).json({ message: 'Availability added successfully', event });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});*/
app.get('/api/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/getAvailability/:eventName', async (req, res) => {
  try {
    const { eventName } = req.params;
    const event = await Event.findOne({ event_name: eventName });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(event.availability);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

/*app.post('/api/createEvent/file', async (req, res) => {
  try {
      const { event_name, startDateTime, endDateTime, city } = req.body;

      const newEvent = {
          event_name,
          startDateTime,
          endDateTime,
          city
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
});*/
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
