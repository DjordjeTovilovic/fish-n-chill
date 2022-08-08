import { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dateUtils from '../../utils/dateUtils'

const ReservationScheduling = ({ cottage, entityService }) => {
  const [userRole, setUserRole] = useState(null)
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [penalty, setPenalty] = useState(null)
  const [statusMessage, setStatusMessage] = useState({})

  useEffect(() => {
    setUserRole(window.localStorage.getItem('role'))
    setPenalty(JSON.parse(window.localStorage.getItem('penalty')))
  }, [])

  const scheduleReservation = (reservation) => {
    entityService
      .scheduleReservation(reservation)
      .then(() => setStatusMessage({ color: 'green', message: 'Reservation scheduled!' }))
      .catch((err) => setStatusMessage({ color: 'red', message: 'Somthing went wrong!' }))
  }

  const onChangeNumberOfGuests = (e) => {
    if (e.target.value === null) setNumberOfGuests(1)
    else if (e.target.value > cottage.capacity) setNumberOfGuests(cottage.capacity)
    else if (e.target.value === '-' || e.target.value === 0) setNumberOfGuests(null)
    else setNumberOfGuests(e.target.value)
  }

  const onReservationButtonClick = () => {
    // Pomjera datum za vremensku zonu da bi bila UTC kad se salju na back
    const reservationStart = dateUtils.toUtcDate(checkInDate)
    const reservationEnd = dateUtils.toUtcDate(checkOutDate)
    const duration = dateUtils.daysBetween(reservationStart, reservationEnd)

    const reservation = {
      entityId: cottage.id,
      reservationStart,
      reservationEnd,
      duration,
      price: cottage.price * duration,
      numberOfGuests: numberOfGuests,
    }
    scheduleReservation(reservation)
  }

  return (
    <>
      {/*Ako je ulogovan client prikazati polja za rezervisanje*/}
      {userRole === 'ROLE_CLIENT' && (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <DatePicker
            label="Check-in"
            value={checkInDate}
            disablePast={true}
            onChange={(newValue) => {
              setCheckInDate(newValue)
              setCheckOutDate(null)
            }}
            shouldDisableDate={(dateParam) => {
              return (
                dateParam < cottage.availabilityStart ||
                dateParam > cottage.availabilityEnd ||
                cottage.cottageReservations.some(
                  (reservation) =>
                    dateParam >= new Date(reservation.reservationStart) &&
                    dateParam <= new Date(reservation.reservationEnd)
                )
              )
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="Check-out"
            value={checkOutDate}
            disablePast={true}
            disabled={checkInDate === null}
            onChange={(newValue) => {
              setCheckOutDate(newValue)
            }}
            shouldDisableDate={(dateParam) => {
              return (
                dateParam < checkInDate ||
                cottage.cottageReservations.reverse().some((reservation) => {
                  if (checkInDate < new Date(reservation.reservationStart))
                    return dateParam >= new Date(reservation.reservationStart)
                  else return dateParam > cottage.availabilityEnd
                })
              )
            }}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            type="number"
            style={{ marginLeft: '10px', width: '150px' }}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              max: cottage.capacity,
              min: 1,
            }}
            label="Guests"
            value={numberOfGuests}
            onChange={(e) => onChangeNumberOfGuests(e)}
          />
          <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
            <Button
              onClick={onReservationButtonClick}
              disabled={penalty >= 3}
              size="large"
              variant="contained"
              sx={{ ml: 3, mb: 3, height: '50px' }}
            >
              Schedule Reservation
            </Button>
            {statusMessage && (
              <p
                style={{
                  color: statusMessage.color,
                  fontSize: '13px',
                  marginLeft: '25px',
                  marginTop: '5px',
                }}
              >
                {statusMessage.message}
              </p>
            )}
            {penalty >= 3 && (
              <p
                style={{
                  color: 'red',
                  fontSize: '13px',
                  marginLeft: '25px',
                  marginTop: '5px',
                }}
              >
                You have 3 or more penalties and can't schedule reservations
              </p>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ReservationScheduling
