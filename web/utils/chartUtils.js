import dateUtils from './dateUtils'
const _ = require('lodash')
import { getWeek } from 'date-fns'

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

const weeks = _.range(1, 53)

const years = [2018, 2019, 2020, 2021, 2022]

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

const reservationsPerWeek = (reservations) => {
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
    const reservedDatesByWeek = _.chain(reservedDates[key])
      .groupBy((date) => weeks[getWeek(date)])
      .mapValues((val) => val.length)
      .value()
    reservedDates[key] = reservedDatesByWeek
    reservedDates[key].name = entityNames[key]
  })
  return reservedDates
}

export const entityReservationsPerWeekData = (reservations) => {
  let datasets = []
  const entityReservationsPerWeek = reservationsPerWeek(reservations)

  Object.keys(entityReservationsPerWeek).map((key) => {
    const dataset = {
      label: entityReservationsPerWeek[key].name,
      data: weeks.map((week) => {
        if (week in entityReservationsPerWeek[key]) return entityReservationsPerWeek[key][week]
        return 0
      }),
      backgroundColor: randomRGB(),
      yAxisID: 'y',
    }
    datasets.push(dataset)
  })

  const data = {
    labels: weeks,
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
        text: 'Reservations per week',
      },
    },
  }

  return { data, options }
}

const reservationsPerYear = (reservations) => {
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
    const reservedDatesByYear = _.chain(reservedDates[key])
      .groupBy((date) => date.getFullYear())
      .mapValues((val) => val.length)
      .value()
    reservedDates[key] = reservedDatesByYear
    reservedDates[key].name = entityNames[key]
  })
  return reservedDates
}

export const entityReservationsPerYearData = (reservations) => {
  let datasets = []
  const entityReservationsPerYear = reservationsPerYear(reservations)

  Object.keys(entityReservationsPerYear).map((key) => {
    const dataset = {
      label: entityReservationsPerYear[key].name,
      data: years.map((year) => {
        if (year in entityReservationsPerYear[key]) return entityReservationsPerYear[key][year]
        return 0
      }),
      backgroundColor: randomRGB(),
      yAxisID: 'y',
    }
    datasets.push(dataset)
  })

  const data = {
    labels: years,
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
        text: 'Reservations per year',
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

export const entityRatings = (entities) => {
  let datasets = []

  entities.map((entity) => {
    const dataset = {
      label: entity.name,
      data: [entity.ratingAverage] ?? [0],
      backgroundColor: randomRGB(),
      yAxisID: 'y',
    }
    datasets.push(dataset)
  })

  const data = {
    labels: ['Average Rating'],
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
        text: 'Average rating',
      },
    },
  }

  return { data, options }
}
