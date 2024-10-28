import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ShowAvailability() {
   const [availabilityData, setAvailabilityData] = useState([]);
   const [loading, setLoading] = useState(true);
   const location = useLocation();
   const { eventName } = location.state;

   useEffect(() => {
      // Fetch data from the backend
      const fetchAvailabilityData = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/events');
            setAvailabilityData(response.data);
         } catch (error) {
            console.error("Error fetching availability data", error);
         } finally {
            setLoading(false);
         }
      };

      fetchAvailabilityData();
   }, []);

   if (loading) {
      return <div>Loading...</div>;
   }
   const event = availabilityData.find((e) => e.event_name === eventName);

   if (!event) {
      return <div>No availability data found for the selected event.</div>;
   }

   const startDate = new Date(event.startDateTime);
   const endDate = new Date(event.endDateTime);

   // Generate date range from startDate to endDate
   const getDatesInRange = (start, end) => {
      const dates = [];
      const currentDate = new Date(start);
      currentDate.setHours(0, 0, 0, 0);

      while (currentDate <= end) {
         dates.push(new Date(currentDate).toISOString().split('T')[0]);
         currentDate.setDate(currentDate.getDate() + 1);
      }
      return dates;
   };

   const dates = getDatesInRange(startDate, endDate);

   // Fixed time range from 9 AM to 11 PM
   const getFixedTimes = () => {
      const times = [];
      for (let hour = 9; hour <= 23; hour++) {
         const time = hour < 10 ? `0${hour}:00` : `${hour}:00`;
         times.push(time);
      }
      return times;
   };

   const times = getFixedTimes();

   // Map user availability to a set for quick lookup
   const availableTimes = new Set();
   event.availability.forEach(user => {
      user.times.forEach(time => {
         availableTimes.add(time);
      });
   });

   return (
      <div>
         <h1>Group Availability for {event.event_name}</h1>
         <table>
            <thead>
               <tr>
                  <th></th>
                  {dates.map(date => (
                     <th key={date}>{date}</th>
                  ))}
               </tr>
            </thead>
            <tbody>
               {times.map(time => (
                  <tr key={time}>
                     <td>{time}</td>
                     {dates.map(date => {
                        const cellId = `${date}-${time}`;
                        const isAvailable = availableTimes.has(cellId);

                        return (
                           <td
                              key={cellId}
                              className={isAvailable ? "selected" : ""}
                           ></td>
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
