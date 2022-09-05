import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import {
  entityReservationsPerMonthData,
  entityReservationsPerWeekData,
  entityReservationsPerYearData,
} from '../../utils/chartUtils'
import { Box, Tab, Tabs } from '@mui/material'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const ReservationsChart = ({ reservations }) => {
  const [chart, setChart] = useState({})
  const [tabValue, setTabValue] = useState(1)

  useEffect(() => {
    setChart(entityReservationsPerMonthData(reservations))
  }, [reservations])

  useEffect(() => {
    switch (tabValue) {
      case 0:
        setChart(entityReservationsPerWeekData(reservations))
        break
      case 1:
        setChart(entityReservationsPerMonthData(reservations))
        break
      case 2:
        setChart(entityReservationsPerYearData(reservations))
        break

      default:
        break
    }
  }, [tabValue, reservations])

  if (Object.keys(chart).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <Bar options={chart.options} data={chart.data} />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue)
          }}
          aria-label="basic tabs"
        >
          <Tab label="Per Week" />
          <Tab label="Per Month" />
          <Tab label="Per Year" />
        </Tabs>
      </Box>
    </div>
  )
}

export default ReservationsChart
