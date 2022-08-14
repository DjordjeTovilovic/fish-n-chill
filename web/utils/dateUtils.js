import { subMinutes, differenceInDays, isWithinInterval, subDays, addDays } from 'date-fns'

// Mislim da treba pozivati samo kad se salje na back, ali nisam jos testirao
export const toUtcDate = (date) => subMinutes(date, date.getTimezoneOffset())

// Ovo je da bi prebacili ta polja u datume jer nisu datumi kad dodju na front
export const entityFieldsToDate = (entity) => {
  entity.availabilityStart = new Date(entity.availabilityStart)
  entity.availabilityEnd = new Date(entity.availabilityEnd)

  entity.reservations.map((reservation) => {
    reservation.reservationStart = new Date(reservation.reservationStart)
    reservation.reservationEnd = new Date(reservation.reservationEnd)
  })

  entity.actions.map((action) => {
    action.actionEnd = new Date(action.actionEnd)
    action.reservationStart = new Date(action.reservationStart)
    action.reservationEnd = new Date(action.reservationEnd)
  })

  entity.unavailablePeriods.map((unavailablePeriod) => {
    unavailablePeriod.startDate = new Date(unavailablePeriod.startDate)
    unavailablePeriod.endDate = new Date(unavailablePeriod.endDate)
  })
  return entity
}

export const shouldDisableStartDate = (dateParam, entity) => {
  return (
    dateParam < entity.availabilityStart ||
    dateParam > entity.availabilityEnd ||
    entity.reservations.some((reservation) =>
      isBetweenDateRange(dateParam, reservation.reservationStart, reservation.reservationEnd)
    ) ||
    entity.unavailablePeriods.some((unavailablePeriod) =>
      isBetweenDateRange(dateParam, unavailablePeriod.startDate, unavailablePeriod.endDate)
    )
  )
}

export const shouldDisableEndDate = (dateParam, checkInDate, entity) => {
  return (
    dateParam < checkInDate ||
    entity.reservations.reverse().some((reservation) => {
      if (checkInDate < reservation.reservationStart) return dateParam >= reservation.reservationStart
      else return dateParam > entity.availabilityEnd
    }) ||
    entity.unavailablePeriods.reverse().some((unavailablePeriod) => {
      if (checkInDate < unavailablePeriod.startDate) return dateParam >= unavailablePeriod.startDate
      else return dateParam > entity.availabilityEnd
    })
  )
}

export const getAvailablePeriods = (entity) => {
  const availablePeriods = [{ start: entity.availabilityStart, end: entity.availabilityEnd }]
  entity.unavailablePeriods.forEach((unavailablePeriod) => {
    availablePeriods.map((availablePeriod) => {
      if (
        isWithinInterval(unavailablePeriod.startDate, availablePeriod) &&
        isWithinInterval(unavailablePeriod.endDate, availablePeriod)
      ) {
        // pocetak desnog djela splita dostupnog perioda je dan poslje kraja nedostupnog perioda
        const start = addDays(unavailablePeriod.endDate, 1)
        const afterUnavailablePeriod = { start, end: availablePeriod.end }
        // kraj ljevog djela splita dostupnog perioda je dan prije pocetka nedostupnog perioda
        availablePeriod.end = subDays(unavailablePeriod.startDate, 1)
        availablePeriods.push(afterUnavailablePeriod)
      }
    })
  })

  entity.reservations.forEach((reservation) => {
    availablePeriods.map((availablePeriod) => {
      if (
        isWithinInterval(reservation.reservationStart, availablePeriod) &&
        isWithinInterval(reservation.reservationEnd, availablePeriod)
      ) {
        // pocetak desnog djela splita dostupnog perioda je dan poslje kraja rezervisanog perioda
        const start = addDays(reservation.reservationEnd, 1)
        const afterUnavailablePeriod = { start, end: availablePeriod.end }
        // kraj ljevog djela splita dostupnog perioda je dan prije pocetka rezervisanog perioda
        availablePeriod.end = subDays(reservation.reservationStart, 1)
        availablePeriods.push(afterUnavailablePeriod)
      }
    })
  })
  return availablePeriods
}

export const daysBetween = (startDate, endDate) => differenceInDays(endDate, startDate)

export const isBetweenDateRange = (testDate, startDate, endDate) => {
  return isWithinInterval(testDate, { start: startDate, end: endDate })
}

// funkcije koje pocinju sa fc su za fullCalendar i vjerovatno mjenjaju nesto sa end datumom
export const fcIsRangeBetweenDateRange = (startTestDate, endTestDate, startDate, endDate) => {
  endTestDate = subDays(endTestDate, 1)

  return (
    isWithinInterval(startTestDate, { start: startDate, end: endDate }) &&
    isWithinInterval(endTestDate, { start: startDate, end: endDate })
  )
}

const dateUtils = {
  toUtcDate,
  entityFieldsToDate,
  daysBetween,
  getAvailablePeriods,
  isBetweenDateRange,
  fcIsRangeBetweenDateRange,
  shouldDisableStartDate,
  shouldDisableEndDate,
}

export default dateUtils
