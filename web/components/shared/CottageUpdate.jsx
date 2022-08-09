import { Button } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import cottageService from '../../services/cottage'

const CottageUpdate = ({ cottage }) => {
  const router = useRouter()
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    setUserRole(window.localStorage.getItem('role'))
  }, [])

  const setAvailability = () => {}
  const handleNewAction = () => {}

  const handleDelete = async (id) => {
    await cottageService.remove(id)
    router.push('/cottages/owned')
    // window.location.reload()
  }

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
          <Button onClick={setAvailability} size="large" variant="contained" sx={{ ml: 3, mb: 3, height: '50px' }}>
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
            Delete
          </Button>
        </div>
      )}
    </>
  )
}

export default CottageUpdate
