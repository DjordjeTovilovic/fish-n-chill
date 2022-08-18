import InactiveOwners from 'components/lists/InactiveOwners'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ownerService from 'services/owner'

const Admin = () => {
  const [users, setUsers] = useState([])
  const router = useRouter()

  useEffect(() => {
    ownerService
      .getAllInactiveOwners()
      .then((gotUsers) => setUsers(gotUsers))
      .catch((err) => console.log(err))
  }, [])

  const handleConfirm = (id) => {
    ownerService.enableOwnerProfile(id)
    router.push('/')
  }
  return (
    <>
      <InactiveOwners users={users} handleConfirm={handleConfirm} />
    </>
  )
}

export default Admin
