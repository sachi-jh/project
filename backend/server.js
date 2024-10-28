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

//if (process.env.NODE_ENV === "production") {
if (true) {
  // static folder
  app.use(express.static("C:\Users\acrob\Box\Classes\SE 3354\project-1\frontend\dist"));

  // handle SPA
  app.get(/.*/, (req, res) => res.sendFile("C:\Users\acrob\Box\Classes\SE 3354\project-1\frontend\dist\index.html"));
}

const port = process.env.PORT || 5000 ;
app.listen(port, () => console.log(`Listening to port ${port}`));
