import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import axios from 'axios';
import './ChooseAvailabilty.css'

//to choose the times availavle from that table idk how to make that :(
function ChooseAvailability() {
  const location = useLocation();
  const { eventName, userName, startDate, endDate, startTime, endTime } = location.state;
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);
  const navigate = useNavigate();

  //grabs dates from range passed by ChooseDateTime
  const getDatesInRange = (start, end) => {
    const date = new Date(start);
    const endDate = new Date(end);
    const dates = [];
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(0, 0, 0, 0);

    while (date <= endDate) {
      dates.push(new Date(date).toISOString().split('T')[0]);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  //grabs times from range passed by ChooseDateTime
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

  const dates = getDatesInRange(startDate, endDate);
  const times = getTimesInRange(startTime, endTime);


  // Event handlers
  const handleMouseDown = (cellId) => {
    setIsSelecting(true);
    toggleCellSelection(cellId);
  };

  const handleMouseEnter = (cellId) => {
    if (isSelecting) toggleCellSelection(cellId);
  };

  const handleMouseUp = () => {
    setIsSelecting(false);
  };

  // Toggle cell selection
  const toggleCellSelection = (cellId) => {
    setSelectedCells((prevSelectedCells) => {
      const newSelectedCells = new Set(prevSelectedCells);
      if (newSelectedCells.has(cellId)) newSelectedCells.delete(cellId);
      else newSelectedCells.add(cellId);
      console.log(newSelectedCells)
      return newSelectedCells;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      event_name: eventName,
      availability: {
        user: userName,
        times: Array.from(selectedCells)
      }
    };

    try {
      const response = await axios.post('http://localhost:5000/api/submitAvailability/file', eventData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert('Error creating event');
    }
    navigate("/showAvailability", {
      state: {
      eventName: eventName,
      userName: userName,
      startDate: startDate,
      endDate: endDate,
      startTime: startTime,
      endTime: endTime,
      },
      });
  };


  return (
    
    <>
    <div onMouseUp={handleMouseUp}>
    <h1>{eventName}</h1>
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
                  <td
                    key={cellId}
                    className={selectedCells.has(cellId) ? "selected" : ""}
                    onMouseDown={() => handleMouseDown(cellId)}
                    onMouseEnter={() => handleMouseEnter(cellId)}
                  ></td>
                );
              })}
            </tr>
          ))}

        </tbody>
      </table>
      <button onClick={handleSubmit}>Submit</button>

    </div>
    
    </>

    
  )
}

export default ChooseAvailability