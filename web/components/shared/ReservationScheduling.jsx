import { useState, useEffect } from 'react'
import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dateUtils from '../../utils/dateUtils'
import subscriptionService from 'services/subscription'
import { useSnackbar } from 'notistack'

const ReservationScheduling = ({ entity, scheduleReservation }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [userRole, setUserRole] = useState(null)
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [penalty, setPenalty] = useState(null)
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    setUserRole(window.localStorage.getItem('role'))
    setPenalty(JSON.parse(window.localStorage.getItem('penalty')))
    subscriptionService
      .exists({
        clientId: JSON.parse(window.localStorage.getItem('id')),
        entityId: entity.id,
      })
      .then((res) => setSubscribed(res))
      .catch((err) => console.log(err))
  }, [])

  const onChangeNumberOfGuests = (e) => {
    if (e.target.value === null) setNumberOfGuests(1)
    else if (e.target.value > entity.capacity) setNumberOfGuests(entity.capacity)
    else if (e.target.value === '-' || e.target.value === 0) setNumberOfGuests(null)
    else setNumberOfGuests(e.target.value)
  }

  const onReservationButtonClick = () => {
    // Pomjera datum za vremensku zonu da bi bila UTC kad se salju na back
    const reservationStart = dateUtils.toUtcDate(checkInDate)
    const reservationEnd = dateUtils.toUtcDate(checkOutDate)
    const duration = dateUtils.daysBetween(reservationStart, reservationEnd)

    const reservation = {
      entityId: entity.id,
      reservationStart,
      reservationEnd,
      price: entity.price * (1 - localStorage.getItem('loyaltyPoints') / 1000) * duration,
      numberOfGuests: numberOfGuests,
    }

    scheduleReservation(reservation)
      .then(() => enqueueSnackbar('Reservation successfully made', { variant: 'success' }))
      .then(localStorage.setItem('loyaltyPoints', parseInt(localStorage.getItem('loyaltyPoints')) + 10))
      .catch((err) => {
        // TODO treba vidjeti jel ima bolji response status od 404 za kad je period rezervacije zauzet
        if (err.response.status === 404)
          enqueueSnackbar('Failed scheduling reservation: reservation period is not available', { variant: 'error' })
        else if (err.response.status === 409)
          enqueueSnackbar('Failed scheduling reservation: conflict while scheduling. Try again', { variant: 'error' })
        else enqueueSnackbar('Failed scheduling reservation', { variant: 'error' })
      })
  }

  const alterSubscription = () => {
    subscribed
      ? subscriptionService
          .unsubscribe({
            clientId: JSON.parse(window.localStorage.getItem('id')),
            entityId: entity.id,
          })
          .then(() => setSubscribed(!subscribed))
          .catch((err) => console.log(err))
      : subscriptionService
          .subscribe({
            clientId: JSON.parse(window.localStorage.getItem('id')),
            entityId: entity.id,
            type: 'COTTAGE',
          })
          .then(() => setSubscribed(!subscribed))
          .catch((err) => console.log(err))
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
            shouldDisableDate={(dateParam) => dateUtils.shouldDisableStartDate(dateParam, entity)}
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
            shouldDisableDate={(dateParam) => dateUtils.shouldDisableEndDate(dateParam, checkInDate, entity)}
            renderInput={(params) => <TextField {...params} />}
          />
          <TextField
            type="number"
            style={{ marginLeft: '10px', width: '150px' }}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              max: entity.capacity,
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
          <Button
            onClick={() => alterSubscription()}
            color={subscribed ? 'warning' : 'secondary'}
            size="large"
            variant="contained"
            sx={{ minWidth: '150px', ml: 18, mb: 3, height: '50px' }}
          >
            {subscribed ? 'UNSubscribe' : 'Subscribe'}
          </Button>
        </div>
      )}
    </>
  )
}

export default ReservationScheduling
