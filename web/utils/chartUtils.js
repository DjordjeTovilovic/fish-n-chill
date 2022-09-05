import dateUtils from './dateUtils'
const _ = require('lodash')

const labels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const randomNum = () => Math.floor(Math.random() * (235 - 52 + 1) + 52)

const randomRGB = () => `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`

const reservationsPerMonth = (reservations) => {
  const reservedDates = {}
  const entityNames = {}
  reservations.forEach((reservation) => {
    const dateRange = dateUtils.toDateList(reservation.reservationStart, reservation.reservationEnd)

    reservation.entity.id in reservedDates
      ? reservedDates[reservation.entity.id].concat(dateRange)
      : (reservedDates[reservation.entity.id] = dateRange)

    entityNames[reservation.entity.id] = reservation.entity.name
  })

  Object.keys(reservedDates).map((key) => {
    const reservedDatesByMonth = _.chain(reservedDates[key])
      .groupBy((date) => labels[date.getMonth()])
      .mapValues((val) => val.length)
      .value()
    reservedDates[key] = reservedDatesByMonth
    reservedDates[key].name = entityNames[key]
  })
  return reservedDates
}

export const entityReservationsPerMonthData = (reservations) => {
  let datasets = []
  const entityReservationsPerMonth = reservationsPerMonth(reservations)

  Object.keys(entityReservationsPerMonth).map((key) => {
    const dataset = {
      label: entityReservationsPerMonth[key].name,
      data: labels.map((month) => {
        if (month in entityReservationsPerMonth[key]) return entityReservationsPerMonth[key][month]
        return 0
      }),
      backgroundColor: randomRGB(),
      yAxisID: 'y',
    }
    datasets.push(dataset)
  })

  const data = {
    labels,
    datasets,
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Reservations per month',
      },
    },
  }

  return { data, options }
}

export const revenueForPeriod = (reservations, startDate, endDate) => {
  const revenue = {}
  reservations.forEach((reservation) => {
    const dateRange = dateUtils.toDateList(reservation.reservationStart, reservation.reservationEnd)
    const pricePerDay =
      reservation.price / dateUtils.daysBetween(reservation.reservationStart, reservation.reservationEnd)

    const sum = dateRange.reduce((partialSum, date) => {
      if (dateUtils.isBetweenDateRange(date, startDate, endDate)) {
        partialSum += pricePerDay
      }
      return partialSum
    }, 0)

    revenue[reservation.entity.id] = { revenue: sum }
    revenue[reservation.entity.id].name = reservation.entity.name
  })

  let revenueLabels = []
  let revenueData = []
  let revenueBackgroundColor = []

  Object.keys(revenue).map((key) => {
    revenueLabels.push(revenue[key].name)
    revenueData.push(revenue[key].revenue)
    revenueBackgroundColor.push(randomRGB())
  })

  const dataset = {
    label: 'Revenue for entity',
    data: revenueData,
    backgroundColor: revenueBackgroundColor,
  }

  const data = {
    labels: revenueLabels,
    datasets: [dataset],
  }

  return { data }
}
