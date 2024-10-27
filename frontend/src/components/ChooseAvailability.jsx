import React from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import './ChooseAvailabilty.css'

//to choose the times availavle from that table idk how to make that :(
function ChooseAvailability() {
  const location = useLocation();
  const { startDate, endDate, startTime, endTime } = location.state;
  console.log({ startDate, endDate, startTime, endTime });
  const [selectedCells, setSelectedCells] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);

  const getDatesInRange = (start, end) => {
    const date = new Date(start);
    const endDate = new Date(end);
    const dates = [];

    while (date <= endDate) {
      dates.push(new Date(date).toISOString().split('T')[0]);
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  const dates = getDatesInRange(startDate, endDate);
  // Example dates and times for rows and columns
  // const dates = ["2024-10-27", "2024-10-28", "2024-10-29", "I am a monkey", "Bonkers"];
  const times = ["08:00", "10:00", "12:00", "14:00", "16:00"];

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
      return newSelectedCells;
    });
  };



  return (
    
    <>
    <div onMouseUp={handleMouseUp}>
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
    </div>
    
    </>

    
  )
}

export default ChooseAvailability