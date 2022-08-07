import { Box, Divider, Typography, Container, Skeleton, Paper, Rating, Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import dateUtils from '../../utils/dateUtils'

const CottageProfile = ({ cottage, scheduleReservation, statusMessage }) => {
  const [loggedInUser, setLoggedInUser] = useState(null)
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [numberOfGuests, setNumberOfGuests] = useState(1)
  const [penalty, setPenalty] = useState(null)

  useEffect(() => {
    setLoggedInUser(JSON.parse(window.localStorage.getItem('loggedInUser')))
    setPenalty(JSON.parse(window.localStorage.getItem('penalty')))
  }, [])

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
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 8,
          }}
        >
          <Paper sx={{
            padding: 3
          }}>
            <Typography variant="h3" mx="auto" align="center" gutterBottom component="div" sx={{ ml: 1, mr: 1 }}>
              {cottage.name}
            </Typography>
            <Box textAlign="center">
              <Rating size="large" name="read-only" value={cottage.ratingAverage ?? 0} precision={0.5} readOnly />
              <Typography
                variant="subtitle1"
                mx="auto"
                align="center"
                gutterBottom
                component="div"
                sx={{ ml: 1, mr: 1 }}
              >
                ({cottage.ratingCount} ratings)
              </Typography>
            </Box>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              {cottage.images ? (
                <Image width={600} height={400} src={cottage.images[0].url} alt="cottage" />
              ) : (
                <Skeleton variant="rectangular" width={600} height={400} />
              )}
            </div>

            <Divider variant="middle" sx={{ mt: 1 }} />
            <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
              Address:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {cottage.address}
            </Typography>
            <div></div>
            <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
              Price:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {cottage.price}€/day
            </Typography>
            <div></div>
            <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
              Available:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {cottage.availabilityStart.toLocaleDateString('en-UK')}
            </Typography>
            <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 2 }} display="inline">
              -
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {cottage.availabilityEnd.toLocaleDateString('en-UK')}
            </Typography>
            <div></div>
            <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
              Capacity:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {cottage.capacity} people
            </Typography>
            <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }}>
              Description:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3, mb: 3 }}>
              {cottage.description}
            </Typography>
            {/*Ako je ulogovan user prikazati dugme za rezervisanje*/}

            {loggedInUser ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <DatePicker
                  label="Check-in"
                  style={{ marginLeft: "10px" }}
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
                <div style={{ display: "flex", flexDirection: "column", width: "200px" }}>
                  <Button
                    onClick={onReservationButtonClick}
                    disabled={penalty >= 3}
                    size="large"
                    variant="contained"
                    sx={{ ml: 3, mb: 3, height: "50px" }}
                  >
                    Schedule Reservation
                  </Button>
                  {
                    statusMessage && <p
                      style={{
                        color: statusMessage.color,
                        fontSize: '13px',
                        marginLeft: '25px',
                        marginTop: '5px',
                      }}
                    >
                      {statusMessage.message}
                    </p>
                  }
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
            ) : (
              <p
                style={{
                  color: 'red',
                  fontSize: '18px',
                  marginLeft: '25px',
                  marginTop: '5px',
                  marginBottom: '0px',
                }}
              >
                You have to be logged in to schedule a reservation!
              </p>
            )}
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default CottageProfile
