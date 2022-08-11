import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import cottageService from '../../services/cottage'
import cottageAction from '../../services/cottagesAction'
import dateUtils from '../../utils/dateUtils'
import Modal from '../modal/Modal'

const CottageUpdate = ({ cottage }) => {
  const router = useRouter()
  const [userRole, setUserRole] = useState(null)
  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false)
  const [isActionModalOpen, setIsActionModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [newAvailabilityStart, setNewAvailabilityStart] = useState('')
  const [newAvailabilityEnd, setNewAvailabilityEnd] = useState('')
  const [checkInDate, setCheckInDate] = useState(null)
  const [checkOutDate, setCheckOutDate] = useState(null)
  const [actionEndDate, setActionEndDate] = useState(null)
  const [price, setPrice] = useState(cottage.price)

  useEffect(() => {
    setUserRole(window.localStorage.getItem('role'))
    setNewAvailabilityStart(cottage.availabilityStart)
    setNewAvailabilityEnd(cottage.availabilityEnd)
  }, [cottage])

  const handleAvailabilityChange = async () => {
    const availabilityStart = dateUtils.toUtcDate(newAvailabilityStart)
    const availabilityEnd = dateUtils.toUtcDate(newAvailabilityEnd)
    await cottageService.update(cottage.id, { availabilityStart, availabilityEnd })
    router.reload()
  }
  const handleNewAction = async () => {
    const reservationStart = dateUtils.toUtcDate(checkInDate)
    const reservationEnd = dateUtils.toUtcDate(checkOutDate)
    const actionEnd = dateUtils.toUtcDate(actionEndDate)

    const action = {
      entityId: cottage.id,
      reservationStart,
      reservationEnd,
      price,
      actionEnd,
    }
    await cottageAction.create(action)
  }

  const handleDelete = async () => {
    await cottageService.remove(cottage.id)
    router.push('/cottages/owned')
  }

  const changeAvailabilityModalState = () => setIsAvailabilityModalOpen(!isAvailabilityModalOpen)
  const changeActionModalState = () => setIsActionModalOpen(!isActionModalOpen)
  const changeDeleteModalState = () => setIsDeleteModalOpen(!isDeleteModalOpen)

  const availabilityModalContent = (
    <>
      <h3>Set new availability time</h3>
      <div>
        <DatePicker
          label="AvailabilityStart"
          value={newAvailabilityStart}
          disablePast={true}
          onChange={(newValue) => {
            setNewAvailabilityStart(newValue)
            if (newValue > newAvailabilityEnd) setNewAvailabilityEnd(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        <DatePicker
          label="AvailabilityEnd"
          value={newAvailabilityEnd}
          disablePast={true}
          onChange={(newValue) => {
            setNewAvailabilityEnd(newValue)
            if (newValue < newAvailabilityStart) setNewAvailabilityStart(newValue)
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </div>
      <br />
      <Button onClick={handleAvailabilityChange} variant="contained" color="primary">
        Change Availability
      </Button>
    </>
  )

  const actionModalContent = (
    <>
      <h3>Add the reservation period, action end date and action price</h3>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <DatePicker
          label="Check-in"
          value={checkInDate}
          disablePast={true}
          onChange={(newValue) => {
            if (newValue < actionEndDate) setActionEndDate(checkInDate)
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
      <br />
      <DatePicker
        label="ActionEnd"
        value={actionEndDate}
        disablePast={true}
        onChange={(newValue) => {
          setActionEndDate(newValue)
        }}
        shouldDisableDate={(dateParam) => {
          return dateParam > checkInDate
        }}
        renderInput={(params) => <TextField {...params} />}
      />
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
      <Button onClick={handleNewAction} variant="contained" color="primary">
        Make new action
      </Button>
    </>
  )

  const deleteModalContent = (
    <>
      <h3>Are you sure you want to delete this cottage?</h3>
      <Button onClick={handleDelete} variant="contained" color="error">
        Delete cottage
      </Button>
    </>
  )

  return (
    <>
      {userRole === 'ROLE_COTTAGE_OWNER' && (
        <div>
          <Button
            href={'/cottages/update/' + cottage.id}
            size="large"
            variant="contained"
            sx={{ ml: 3, mb: 3, height: '50px' }}
          >
            Update Cottage
          </Button>
          <Button
            onClick={changeAvailabilityModalState}
            size="large"
            variant="contained"
            sx={{ ml: 3, mb: 3, height: '50px' }}
          >
            Set availability
          </Button>
          <Button
            onClick={changeActionModalState}
            size="large"
            variant="contained"
            sx={{ ml: 3, mb: 3, height: '50px' }}
          >
            Make New Action
          </Button>
          <Button
            href={'/cottages/' + cottage.id + '/past'}
            size="large"
            variant="contained"
            sx={{ ml: 3, mb: 3, height: '50px' }}
          >
            See Past Reservations
          </Button>
          <Button
            href={'/cottages/owned/active'}
            size="large"
            variant="contained"
            sx={{ ml: 3, mb: 3, height: '50px' }}
          >
            See Active Reservations
          </Button>
          <Button
            onClick={changeDeleteModalState}
            size="large"
            variant="contained"
            color="error"
            sx={{ ml: 3, mb: 3, height: '50px' }}
          >
            Delete Cottage
          </Button>
          <Modal
            content={availabilityModalContent}
            isOpenModal={isAvailabilityModalOpen}
            changeModalState={changeAvailabilityModalState}
          />
          <Modal
            content={actionModalContent}
            isOpenModal={isActionModalOpen}
            changeModalState={changeActionModalState}
          />
          <Modal
            content={deleteModalContent}
            isOpenModal={isDeleteModalOpen}
            changeModalState={changeDeleteModalState}
          />
        </div>
      )}
    </>
  )
}

export default CottageUpdate
