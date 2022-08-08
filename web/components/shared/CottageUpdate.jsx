import { Button } from '@mui/material'
import { useEffect, useState } from 'react'

const CottageUpdate = ({ cottage }) => {
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    setUserRole(window.localStorage.getItem('role'))
  }, [])

  const setAvailability = () => {}
  const setFastReservation = () => {}
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
            Update
          </Button>
          <Button onClick={setAvailability} size="large" variant="contained" sx={{ ml: 3, mb: 3, height: '50px' }}>
            Set availability
          </Button>
          <Button onClick={setFastReservation} size="large" variant="contained" sx={{ ml: 3, mb: 3, height: '50px' }}>
            Set Fast Reservation
          </Button>
        </div>
      )}
    </>
  )
}

export default CottageUpdate
