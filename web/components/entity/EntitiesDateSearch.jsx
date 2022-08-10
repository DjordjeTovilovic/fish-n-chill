import { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { DatePicker } from '@mui/x-date-pickers'
import dateUtils from '../../utils/dateUtils'

const EntitiesDateSearch = ({ searchForDatePeriod }) => {
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)

  const searchPeriod = () => {
    searchForDatePeriod({
      startDate: dateUtils.toUtcDate(checkInDate),
      endDate: dateUtils.toUtcDate(checkOutDate),
    })
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '170px', maxHeight: '100px' }}>
        <DatePicker
          label="Check-in"
          value={checkInDate}
          disablePast={true}
          onChange={(newValue) => {
            setCheckInDate(newValue)
          }}
          shouldDisableDate={(dateParam) => {
            return checkOutDate !== null && dateParam > checkOutDate
          }}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
        <div style={{ height: '10px' }}></div>

        <DatePicker
          label="Check-out"
          value={checkOutDate}
          disablePast={true}
          onChange={(newValue) => {
            setCheckOutDate(newValue)
          }}
          shouldDisableDate={(dateParam) => {
            return checkInDate !== null && dateParam < checkInDate
          }}
          renderInput={(params) => <TextField size="small" {...params} />}
        />
      </div>

      <Button
        variant="contained"
        sx={{ ml: 3 }}
        disabled={checkInDate === null || checkOutDate === null}
        onClick={searchPeriod}
      >
        Search
      </Button>
    </>
  )
}

export default EntitiesDateSearch
