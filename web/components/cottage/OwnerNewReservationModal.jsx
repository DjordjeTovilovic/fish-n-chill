import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import dateUtils from '../../utils/dateUtils'
import Modal from '../modal/Modal'

const OwnerNewReservationModal = ({
  entity,
  client,
  isReservationModalOpen,
  changeReservationModalState,
  scheduleReservation,
}) => {
  const { enqueueSnackbar } = useSnackbar()
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [price, setPrice] = useState(0)

  useEffect(() => {
    setPrice(entity.price)
  }, [entity])

  const onReservationButtonClick = () => {
    const reservationStart = dateUtils.toUtcDate(checkInDate)
    const reservationEnd = dateUtils.toUtcDate(checkOutDate)
    const duration = dateUtils.daysBetween(reservationStart, reservationEnd)

    const reservation = {
      entityId: entity.id,
      reservationStart,
      reservationEnd,
      price: price * duration,
      numberOfGuests: entity.numberOfGuests,
      clientId: client.id,
    }

    scheduleReservation(reservation)
    setCheckInDate(null)
    setCheckOutDate(null)
    changeReservationModalState()
    enqueueSnackbar('Reservation successfully made', { variant: 'success' })
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
      </div>
      <TextField
        type="number"
        style={{ marginLeft: '10px', width: '150px' }}
        inputProps={{
          inputMode: 'numeric',
          pattern: '[0-9]*',
          min: 0,
        }}
        label="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
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
