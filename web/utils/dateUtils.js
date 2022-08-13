import { subMinutes, differenceInDays, isWithinInterval } from 'date-fns'

// Mislim da treba pozivati samo kad se salje na back, ali nisam jos testirao
export const toUtcDate = (date) => subMinutes(date, date.getTimezoneOffset())

// Ovo je da bi prebacili ta polja u datume jer nisu datumi kad dodju na front
export const entityFieldsToDate = (entity) => {
  entity.availabilityStart = new Date(entity.availabilityStart)
  entity.availabilityEnd = new Date(entity.availabilityEnd)
  // entity.availabilityEnd = addMinutes(entity.availabilityEnd, 1)

  entity.reservations.map((reservation) => {
    reservation.reservationStart = new Date(reservation.reservationStart)
    reservation.reservationEnd = new Date(reservation.reservationEnd)
  })

  entity.actions.map((action) => {
    action.actionEnd = new Date(action.actionEnd)
    action.reservationStart = new Date(action.reservationStart)
    action.reservationEnd = new Date(action.reservationEnd)
  })
  console.log(typeof entity.actions[0].reservationStart)
  return entity
}

export const daysBetween = (startDate, endDate) => differenceInDays(endDate, startDate)

export const isBetweenDateRange = (testDate, startDate, endDate) =>
  isWithinInterval(testDate, { start: startDate, end: endDate })

const dateUtils = { toUtcDate, entityFieldsToDate, daysBetween, isBetweenDateRange }

export default dateUtils
