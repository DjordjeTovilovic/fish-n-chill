import { useState } from 'react'
import { Box, Button, Tab, Tabs, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { revenueForPeriod } from '../../utils/chartUtils'
import dateUtils from '../../utils/dateUtils'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement, ArcElement } from 'chart.js'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ProfitChart = ({ reservations }) => {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [profitChart, setProfitChart] = useState(null)

  const handleDatePeriodChange = () => {
    if (startDate && endDate) {
      const start = dateUtils.toUtcDate(startDate)
      const end = dateUtils.toUtcDate(endDate)
      setProfitChart(revenueForPeriod(reservations, start, end))
    }
  }

  return (
    <div>
      <>
        <div>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => {
              setStartDate(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => {
              setEndDate(newValue)
              if (newValue < startDate) setStartDate(newValue)
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <Button onClick={handleDatePeriodChange} variant="contained" color="primary">
            See Profit For Period
          </Button>
        </div>
        {profitChart && <Pie data={profitChart.data} />}
      </>
    </div>
  )
}

export default ProfitChart
