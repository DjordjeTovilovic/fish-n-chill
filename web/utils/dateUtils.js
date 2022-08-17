import { subMinutes, differenceInDays, isWithinInterval, subDays, addDays, format, isEqual } from 'date-fns'

// Mislim da treba pozivati samo kad se salje na back, ali nisam jos testirao
export const toUtcDate = (date) => subMinutes(date, date.getTimezoneOffset())

// Ovo je da bi prebacili ta polja u datume jer nisu datumi kad dodju na front
export const entityFieldsToDate = (entity) => {
  if (entity.availabilityStart !== null && entity.availabilityEnd !== null) {
    entity.availabilityStart = new Date(entity.availabilityStart)
    entity.availabilityEnd = new Date(entity.availabilityEnd)

    if (entity.availabilityStart < new Date()) {
      const today = new Date()
      const todayDateStart = new Date(format(today, `yyyy-MM-dd'T'00:00:00`))
      entity.availabilityStart = todayDateStart
    }
  }

  entity.reservations?.map((reservation) => {
    reservation.reservationStart = new Date(reservation.reservationStart)
    reservation.reservationEnd = new Date(reservation.reservationEnd)
  })

  entity.actions?.map((action) => {
    action.actionEnd = new Date(action.actionEnd)
    action.reservationStart = new Date(action.reservationStart)
    action.reservationEnd = new Date(action.reservationEnd)
  })

  entity.unavailablePeriods?.map((unavailablePeriod) => {
    unavailablePeriod.startDate = new Date(unavailablePeriod.startDate)
    unavailablePeriod.endDate = new Date(unavailablePeriod.endDate)
  })
  return entity
}

export const reservationFieldsToDate = (reservation) => {
  reservation.reservationStart = new Date(reservation.reservationStart)
  reservation.reservationEnd = new Date(reservation.reservationEnd)
  reservation.entity = entityFieldsToDate(reservation.entity)
  return reservation
}

export const reservationListFieldsToDate = (reservations) => {
  reservations.map((reservation) => {
    reservation.reservationStart = new Date(reservation.reservationStart)
    reservation.reservationEnd = new Date(reservation.reservationEnd)
    reservation.entity = entityFieldsToDate(reservation.entity)
    return reservation
  })

  return reservations
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
    availablePeriods.forEach((availablePeriod, index) => {
      if (
        isWithinInterval(unavailablePeriod.startDate, availablePeriod) &&
        isWithinInterval(unavailablePeriod.endDate, availablePeriod)
      ) {
        // Ako nedostupan period pokriva cijeli dostupan period: obrisati taj dostupan period
        if (
          isEqual(unavailablePeriod.startDate, availablePeriod.start) &&
          isEqual(unavailablePeriod.endDate, availablePeriod.end)
        ) {
          availablePeriods.splice(index, 1)
        } else if (isEqual(unavailablePeriod.startDate, availablePeriod.start)) {
          // Ako je pocetak dostupnog i nedostupnog perioda isti ne treba praviti ljevi split
          // Samo staviti pocetak dostupnog perioda dan poslje kraja nedostupnog
          availablePeriods[index].start = addDays(unavailablePeriod.endDate, 1)
        } else {
          // Ako je kraj nedostupnog perioa jednak kraju dostupnog ne treba praviti desni split
          // Inace dostupni period djelimo na dva perioda
          if (!isEqual(unavailablePeriod.endDate, availablePeriod.end)) {
            // Pocetak desnog djela splita dostupnog perioda je dan poslje kraja nedostupnog perioda
            const start = addDays(unavailablePeriod.endDate, 1)
            const afterUnavailablePeriod = { start: start, end: availablePeriod.end }
            availablePeriods.push(afterUnavailablePeriod)
          }
          // kraj ljevog djela splita dostupnog perioda je dan prije pocetka nedostupnog perioda
          availablePeriods[index].end = subDays(unavailablePeriod.startDate, 1)
        }
      }
    })
  })

  // Isto kao i gore samo za rezervacije
  entity.reservations.forEach((reservation) => {
    availablePeriods.forEach((availablePeriod, index) => {
      if (
        isWithinInterval(reservation.reservationStart, availablePeriod) &&
        isWithinInterval(reservation.reservationEnd, availablePeriod)
      ) {
        if (
          isEqual(reservation.reservationStart, availablePeriod.start) &&
          isEqual(reservation.reservationEnd, availablePeriod.end)
        ) {
          availablePeriods.splice(index, 1)
        } else if (isEqual(reservation.reservationStart, availablePeriod.start)) {
          availablePeriods[index].start = addDays(reservation.reservationEnd, 1)
        } else {
          if (!isEqual(reservation.reservationEnd, availablePeriod.end)) {
            const start = addDays(reservation.reservationEnd, 1)
            const afterUnavailablePeriod = { start: start, end: availablePeriod.end }
            availablePeriods.push(afterUnavailablePeriod)
          }
          availablePeriods[index].end = subDays(reservation.reservationStart, 1)
        }
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

export const fcIsSelectedInAvailableDates = (startTestDate, endTestDate, entity) => {
  endTestDate = subDays(endTestDate, 1)
  const availablePeriods = getAvailablePeriods(entity)
  return availablePeriods.some((availablePeriod) => {
    return isWithinInterval(startTestDate, availablePeriod) && isWithinInterval(endTestDate, availablePeriod)
  })
}

export const fcToEndDate = (date) => {
  const time = format(date, 'HH:mm')
  // Treba povecati end date za jedan dan samo ako je vrjeme datuma 00:00
  // Obratiti paznju na ovo ako budemo radili sa vremenima
  if (time === '00:00') {
    date = addDays(date, 1)
  }
  return date
}

const dateUtils = {
  toUtcDate,
  entityFieldsToDate,
  reservationFieldsToDate,
  reservationListFieldsToDate,
  daysBetween,
  getAvailablePeriods,
  isBetweenDateRange,
  fcIsRangeBetweenDateRange,
  shouldDisableStartDate,
  shouldDisableEndDate,
  fcIsSelectedInAvailableDates,
  fcToEndDate,
}

export default dateUtils
