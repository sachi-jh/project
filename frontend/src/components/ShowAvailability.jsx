import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShowAvailability.css';
import { useLocation } from 'react-router-dom';

function ShowAvailability() {
  const location = useLocation();
  //const { eventName, userName, startDate, endDate, startTime, endTime } = location.state;
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [availability, setAvailability] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/path/to/events.json');
        const eventsData = response.data;
        setEvents(eventsData);

        if (eventsData.length > 0) {
          const event = eventsData[0]; // Assuming we are displaying the first event
          const startDate = new Date(event.startDateTime);
          const endDate = new Date(event.endDateTime);
          const datesInRange = getDatesInRange(startDate, endDate);
          const timesInRange = getTimesInRange('00:00', '23:00'); // Assuming 24-hour range

          setDates(datesInRange);
          setTimes(timesInRange);

          const availabilityMap = {};
          event.availability.forEach(user => {
            user.times.forEach(time => {
              if (!availabilityMap[time]) {
                availabilityMap[time] = [];
              }
              availabilityMap[time].push(user.user);
            });
          });

          setAvailability(availabilityMap);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchData();
  }, []);

  const getDatesInRange = (start, end) => {
    const date = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    start.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    while (date <= endDate) {
      dates.push(new Date(date).toISOString().split('T')[0]);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const getTimesInRange = (start, end) => {
    const times = [];
    const startTime = new Date(`1970-01-01T${start}:00`);
    const endTime = new Date(`1970-01-01T${end}:00`);

    while (startTime <= endTime) {
      times.push(startTime.toTimeString().split(' ')[0].substring(0, 5));
      startTime.setHours(startTime.getHours() + 1); // Increment by 1 hour
    }

    return times;
  };

  return (
    <div>
      <h1>{} Availability</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            {dates.map((date) => (
              <th key={date}>{date}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {times.map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {dates.map((date) => {
                const cellId = `${date}-${time}`;
                return (
                  <td key={cellId} className="readonly">
                    {availability[cellId] ? availability[cellId].join(', ') : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ShowAvailability;