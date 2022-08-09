import { Button, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import cottageService from '../../services/cottage'
import dateUtils from '../../utils/dateUtils'
import Modal from '../modal/Modal'

const CottageUpdate = ({ cottage }) => {
  const router = useRouter()
  const [userRole, setUserRole] = useState(null)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [newAvailabilityStart, setNewAvailabilityStart] = useState('')
  const [newAvailabilityEnd, setNewAvailabilityEnd] = useState('')

  useEffect(() => {
    setUserRole(window.localStorage.getItem('role'))
    setNewAvailabilityStart(cottage.availabilityStart)
    setNewAvailabilityEnd(cottage.availabilityEnd)
  }, [])

  const handleAvailabilityChange = () => {
    const availabilityStart = dateUtils.toUtcDate(newAvailabilityStart)
    const availabilityEnd = dateUtils.toUtcDate(newAvailabilityEnd)
    cottageService.update(cottage.id, { availabilityStart, availabilityEnd })
  }
  const handleNewAction = () => {}

  const handleDelete = async (id) => {
    await cottageService.remove(id)
    router.push('/cottages/owned')
  }

  const changeModalState = () => setIsOpenModal(!isOpenModal)

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

  const deleteModalContent = (
    <>
      <h3>Are you sure you want to delete your account?</h3>
      <Button onClick={handleDelete} variant="contained" color="error">
        Request account deletion
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
          <Button onClick={changeModalState} size="large" variant="contained" sx={{ ml: 3, mb: 3, height: '50px' }}>
            Set availability
          </Button>
          <Button onClick={handleNewAction} size="large" variant="contained" sx={{ ml: 3, mb: 3, height: '50px' }}>
            Make New Action
          </Button>
          <Button
            onClick={() => handleDelete(cottage.id)}
            size="large"
            variant="contained"
            color="error"
            sx={{ ml: 3, mb: 3, height: '50px' }}
          >
            Delete Cottage
          </Button>
          <Modal content={availabilityModalContent} isOpenModal={isOpenModal} changeModalState={changeModalState} />
          {/* <Modal content={deleteModalContent} isOpenModal={isOpenModal} changeModalState={changeModalState} /> */}
        </div>
      )}
    </>
  )
}

export default CottageUpdate
