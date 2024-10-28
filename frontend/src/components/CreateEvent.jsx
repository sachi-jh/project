import React, { useState } from 'react';
import axios from 'axios';

const CreateEvent = () => {
  const [eventName, setEventName] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      event_name: eventName,
      startDateTime,
      endDateTime,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/createEvent/file', eventData);
      console.log(response.data);
      alert('Event created successfully!');
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
  };

  return (
    <div>
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Start Date and Time:</label>
          <input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date and Time:</label>
          <input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default CreateEvent;