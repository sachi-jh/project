import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from "dayjs";



function ChooseDateTime() {
    //const dayjs = require('dayjs')

  return (
    <div>
        <LocalizationProvider dateAdapter={dayjs}>
            <DatePicker label="Basic date picker" />
        </LocalizationProvider>
        
    </div>
  )
}

export default ChooseDateTime