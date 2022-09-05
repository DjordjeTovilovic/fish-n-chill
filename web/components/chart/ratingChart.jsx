import { useEffect, useState } from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, Title, Tooltip, Legend, BarElement } from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { entityRatings } from '../../utils/chartUtils'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const RatingChart = ({ entities }) => {
  const [chart, setChart] = useState({})

  useEffect(() => {
    setChart(entityRatings(entities))
  }, [entities])

  if (Object.keys(chart).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <div>
      <Bar options={chart.options} data={chart.data} />
    </div>
  )
}

export default RatingChart
