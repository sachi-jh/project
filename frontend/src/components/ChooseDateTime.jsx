//import React from 'react'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

import axios from "axios";

function ChooseDateTime() {
    const [eventName, setEventName] = useState('');
    const [userName, setUserName] = useState('');

    const navigate = useNavigate();

    const handleNavigation = () => {
        // Error checking to ensure event name and username are not empty
        if (!eventName || !userName) {
            alert("Please provide both Event Name and User Name.");
            return;
        }

        // Navigate to the chooseAvailability page with the event name and user name
        navigate("/chooseAvailability", {
            state: {
                eventName: eventName,
                userName: userName
            }
        });
    };

    return (
        <div>
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
                <label>User Name:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                />
            </div>

            <div>
                <button onClick={handleNavigation}>Go to Choose Availability</button>
            </div>
        </div>
    );
}

export default ChooseDateTime;



/*function ChooseDateTime() {
        const [eventName, setEventName] = useState('');
        const [startDate, setStartDate] = useState(new Date());
        const [userName, setUserName] = useState('');

        const [endDate, setEndDate] = useState(new Date());
        const [startTime, setStartTime] = useState('10:00');
        const [value, onChange] = useState('10:00');

        const navigate = useNavigate();

        const handleNavigation = () => {
        //error checking
        if ((startTime > value) || (startDate > endDate)) {
                alert("Please choose a valid date or time range.");
                return;
        }

        navigate("/chooseAvailability", {
        state: {
        eventName: eventName,
        userName: userName,
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: value,
        },
        });
        };

return (
    <div>
        <div>
          <label>Event Name:</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
          />
                <div>
        <label>User Name:</label>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
                </div>

        </div>
            <p>Choose date range</p>
            <div>
                    Start date:
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
            <div>
                    End date:
                    <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
            </div>

            <p>Choose time range</p>
            <div>
                    Start time:
                    <TimePicker onChange={setStartTime} value={startTime} maxDetail='hour' disableClock={true} />
            </div>
            <div>
                    End time:
                    <TimePicker onChange={onChange} value={value} maxDetail='hour' disableClock={true} />
            </div>
            <div>        
            <button onClick={handleNavigation}>Go to Choose Availability</button>
            </div>
    </div>
)
}

export default ChooseDateTime*/