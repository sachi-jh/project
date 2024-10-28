//import React from 'react'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import TimePicker from 'react-time-picker';
import "react-datepicker/dist/react-datepicker.css";
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';



function ChooseDateTime() {
        const [startDate, setStartDate] = useState(new Date());
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
        startDate: startDate,
        endDate: endDate,
        startTime: startTime,
        endTime: value,
        },
        });
        };

return (
    <div>
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

export default ChooseDateTime