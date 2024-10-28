import React from 'react'
import { useState } from 'react'
import './ChooseAvailabilty.css'

//to choose the times availavle from that table idk how to make that :(
function ChooseAvailability() {
    const [selectedCells, setSelectedCells] = useState(new Set());
  const [isSelecting, setIsSelecting] = useState(false);

  // Example dates and times for rows and columns
  const dates = ["2024-10-27", "2024-10-28", "2024-10-29"];
  const times = ["08:00 AM", "10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM"];

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
    <h1>Choose your availability</h1>
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