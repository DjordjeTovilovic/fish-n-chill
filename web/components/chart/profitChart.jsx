import { useState } from 'react'
import { Button, TextField } from '@mui/material'
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
  const [maxProfit, setMaxProfit] = useState(0)

  const handleDatePeriodChange = () => {
    if (startDate && endDate) {
      const start = dateUtils.toUtcDate(startDate)
      const end = dateUtils.toUtcDate(endDate)
      const profit = revenueForPeriod(reservations, start, end)
      setProfitChart(profit)
      setMaxProfit(Math.max(...profit.data.datasets[0].data) ?? 0)
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
              if (newValue > endDate) setEndDate(newValue)
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
        <div style={{ width: 550, height: 550 }}>
          {profitChart && maxProfit > 0 ? <Pie data={profitChart.data} /> : <h1>No revenue for that period</h1>}
        </div>
      </>
    </div>
  )
}

export default ProfitChart
