//import React from 'react'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';



function ChooseDateTime() {
    //const dayjs = require('dayjs')
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [startTime, setStartTime] = useState('10:00');
    const [endTime, setEndTime] = useState('10:00');

    const [error, setError] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        // Reset end date if it’s before start date
        if (dayjs(date).isAfter(dayjs(endDate))) {
            setEndDate(date);
            setError("End date must be after or equal to start date.");
        } else {
            setError(null);
        }
    };

    // Handle end date selection
    const handleEndDateChange = (date) => {
        if (dayjs(date).isBefore(dayjs(startDate))) {
            setError("End date must be after or equal to start date.");
        } else {
            setEndDate(date);
            setError(null);
        }
    };

    // Handle start time change
    const handleStartTimeChange = (time) => {
        setStartTime(time);
        const startDateTime = getDateTime(startDate, time);
        const endDateTime = getDateTime(endDate, endTime);
        if (startDateTime.isSame(endDateTime) || startDateTime.isAfter(endDateTime)) {
            setEndTime(time);
            setError("End time must be after start time.");
        } else {
            setError(null);
        }
    };

    // Handle end time change
    const handleEndTimeChange = (time) => {
        const startDateTime = getDateTime(startDate, startTime);
        const endDateTime = getDateTime(endDate, time);
        if (endDateTime.isSame(startDateTime) || endDateTime.isBefore(startDateTime)) {
            setError("End time must be after start time.");
        } else {
            setEndTime(time);
            setError(null);
        }
    };


  return (
    <div>
        <p>Choose date range</p>
        <div>
            Start date:
            <DatePicker selected={startDate} onChange={handleStartDateChange} />
        </div>
        <div>
            End date:
            <DatePicker selected={endDate} onChange={handleEndDateChange} />
        </div>

        <p>Choose time range</p>
        <div>
            Start time:
            <TimePicker onChange={handleStartTimeChange} value={startTime} maxDetail='hour' disableClock='true'/>
        </div>
        <div>
            End time:
            <TimePicker onChange={handleEndTimeChange} value={endTime} maxDetail='hour' disableClock='true'/>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        <button onClick={''}>Submit</button>
    </div>
  )
}

export default ChooseDateTime