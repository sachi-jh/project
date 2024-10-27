//import React from 'react'
//import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    const [value, onChange] = useState('10:00');

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
                    <Link
                            to={{
                                    pathname: "/chooseAvailability",
                                    state: {
                                            startDate: startDate,
                                            endDate: endDate,
                                            startTime: startTime,
                                            endTime: value
                                    }
                            }}
                    >
                            Go to Choose Availability
                    </Link>
            </div>
    </div>
)
}

export default ChooseDateTime