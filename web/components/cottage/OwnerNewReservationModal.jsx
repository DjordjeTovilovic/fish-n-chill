import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useEffect, useState } from 'react'
import reservationService from '../../services/reservation'
import dateUtils from '../../utils/dateUtils'
import Modal from '../modal/Modal'

const OwnerNewReservationModal = ({ cottage, client, isReservationModalOpen, changeReservationModalState }) => {
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(cottage.price)
  }, [cottage])

  const onReservationButtonClick = () => {
    const reservationStart = dateUtils.toUtcDate(checkInDate)
    const reservationEnd = dateUtils.toUtcDate(checkOutDate)
    const duration = dateUtils.daysBetween(reservationStart, reservationEnd)

    const reservation = {
      entityId: cottage.id,
      reservationStart,
      reservationEnd,
      price: price * duration,
      numberOfGuests: cottage.numberOfGuests,
      clientId: client.id,
    }
    reservationService.scheduleCottageReservation(reservation)
    changeReservationModalState()
  }

  const reservationModalContent = (
    <>
      <h3>Add the reservation period and price</h3>
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
              cottage.reservations.some(
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
              cottage.reservations.reverse().some((reservation) => {
                if (checkInDate < new Date(reservation.reservationStart))
                  return dateParam >= new Date(reservation.reservationStart)
                else return dateParam > cottage.availabilityEnd
              })
            )
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <TextField
        type="number"
        style={{ marginLeft: '10px', width: '150px' }}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          min: 1,
          max: cottage.price,
        }}
        label="Price"
        value={price}
        onChange={(e) => {
          e.target.value > cottage.price ? setPrice(cottage.price) : setPrice(e.target.value)
        }}
      />
      <Button onClick={onReservationButtonClick} variant="contained" color="primary">
        Make new reservation
      </Button>
    </>
  )
  return (
    <Modal
      content={reservationModalContent}
      isOpenModal={isReservationModalOpen}
      changeModalState={changeReservationModalState}
    />
  )
}

export default OwnerNewReservationModal
