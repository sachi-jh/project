  // written by: Caleb, Sachi
  // tested by: caleb, Authencia
  // debugged by: Caleb, Sachi
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ShowAvailability() {
   const [availabilityData, setAvailabilityData] = useState([]);
   const [weatherData, setWeatherData] = useState([]);
   const [hoveredUsers, setHoveredUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const location = useLocation();
   const { eventName } = location.state;

   useEffect(() => {
      const fetchAvailabilityData = async () => {
         try {
            const response = await axios.get('http://localhost:5000/api/events');
            setAvailabilityData(response.data);
         } catch (error) {
            console.error("Error fetching availability data", error);
         }
      };

      const fetchWeatherData = async () => {
         try {
            // Use a geocoding API to get the coordinates for the city
            //const geocodeResponse = await axios.get(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=acrobaticguy`);
            //console.log(geocodeResponse.data);

            // Fetch weather data using the coordinates
            //const weatherResponse = await fetch(`https://api.weather.gov/points/${lat},${lng}/`);
            const weatherResponse = await fetch('https://api.weather.gov/gridpoints/FWD/92,111/forecast');
            const weatherData = await weatherResponse.json();
            setWeatherData(weatherData.properties.periods);
         } catch (error) {
            console.error("Error fetching weather data", error);
         } finally {
            setLoading(false);
         }
      };

      fetchAvailabilityData();
      fetchWeatherData();
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
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      // Create time slots from start time to end time
      for (let hour = startHour; hour <= endHour; hour++) {
         const time = `${hour < 10 ? `0${hour}` : hour}:00`;
         times.push(time);
      }
      return times;
   };

   const times = getFixedTimes();

   // Extract day and night temperatures and forecasts
   const temperatureMap = weatherData.reduce((acc, entry) => {
      const date = entry.startTime.split('T')[0];
      if (!acc[date]) {
         acc[date] = { day: null, night: null, dayForecast: '', nightForecast: '' };
      }
      if (entry.isDaytime) {
         acc[date].day = entry.temperature;
         acc[date].dayForecast = entry.shortForecast.toLowerCase();
      } else {
         acc[date].night = entry.temperature;
         acc[date].nightForecast = entry.shortForecast.toLowerCase();
      }
      return acc;
   }, {});

   // Determine the icon based on the forecast
   const getWeatherIcon = (forecast) => {
      if (forecast.includes('fair') || forecast.includes('sunny') || forecast.includes('clear')) {
         return '☀️';
      } else if (forecast.includes('cloud')) {
         return '☁️';
      } else if (forecast.includes('rain')) {
         return '🌧️';
      } else {
         return '';
      }
   };

   // Event handler to show users when hovering over a cell
   const handleMouseEnter = (cellId) => {
      const usersAvailable = event.availability
         .filter(user => user.times.includes(cellId))
         .map(user => user.user);
      setHoveredUsers(usersAvailable);
   };

   const handleMouseLeave = () => {
      setHoveredUsers([]);
   };

   return (
      <div>
         <h1>Group Availability for {event.event_name}</h1>
         <div style={{ display: 'flex' }}>
            <table>
               <thead>
                  <tr>
                     <th></th>
                     {dates.map(date => (
                        <th key={date}>{date}</th>
                     ))}
                  </tr>
                  <tr>
                     <td>Day:<br />Night:</td>
                     {dates.map(date => (
                        <td key={date}>
                           {temperatureMap[date]?.day ?? 'N/A'}°F {getWeatherIcon(temperatureMap[date]?.dayForecast)}<br />
                           {temperatureMap[date]?.night ?? 'N/A'}°F {getWeatherIcon(temperatureMap[date]?.nightForecast)}
                        </td>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {times.map(time => (
                     <tr key={time}>
                        <td>{time}</td>
                        {dates.map(date => {
                           const cellId = `${date}-${time}`;
                           const isAvailable = event.availability.some(user =>
                              user.times.includes(cellId)
                           );

                           return (
                              <td
                                 key={cellId}
                                 className={isAvailable ? "selected" : ""}
                                 onMouseEnter={() => handleMouseEnter(cellId)}
                                 onMouseLeave={handleMouseLeave}
                              >
                              </td>
                           );
                        })}
                     </tr>
                  ))}
               </tbody>
            </table>
            <div style={{ marginLeft: '20px' }}>
               <h3>Available Users</h3>
               <ul>
                  {hoveredUsers.length > 0 ? (
                     hoveredUsers.map((user, index) => <li key={index}>{user}</li>)
                  ) : (
                     <li>No users available</li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
}

export default ShowAvailability;

/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ShowAvailability() {
   const [availabilityData, setAvailabilityData] = useState([]);
   const [hoveredUsers, setHoveredUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const location = useLocation();
   const { eventName } = location.state;

   useEffect(() => {
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
      const startHour = startDate.getHours();
      const endHour = endDate.getHours();

      // Create time slots from start time to end time
      for (let hour = startHour; hour <= endHour; hour++) {
         const time = `${hour < 10 ? `0${hour}` : hour}:00`;
         times.push(time);
      }
      return times;
   };

   const times = getFixedTimes();

   // Event handler to show users when hovering over a cell
   const handleMouseEnter = (cellId) => {
      const usersAvailable = event.availability
         .filter(user => user.times.includes(cellId))
         .map(user => user.user);
      setHoveredUsers(usersAvailable);
   };

   const handleMouseLeave = () => {
      setHoveredUsers([]);
   };

   return (
      <div>
         <h1>Group Availability for {event.event_name}</h1>
         <div style={{ display: 'flex' }}>
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
                           const isAvailable = event.availability.some(user =>
                              user.times.includes(cellId)
                           );

                           return (
                              <td
                                 key={cellId}
                                 className={isAvailable ? "selected" : ""}
                                 onMouseEnter={() => handleMouseEnter(cellId)}
                                 onMouseLeave={handleMouseLeave}
                              ></td>
                           );
                        })}
                     </tr>
                  ))}
               </tbody>
            </table>
            <div style={{ marginLeft: '20px' }}>
               <h3>Available Users</h3>
               <ul>
                  {hoveredUsers.length > 0 ? (
                     hoveredUsers.map((user, index) => <li key={index}>{user}</li>)
                  ) : (
                     <li>No users available</li>
                  )}
               </ul>
            </div>
         </div>
      </div>
   );
}

export default ShowAvailability;*/