import InactiveOwners from 'components/lists/InactiveOwners'
import { useSnackbar } from 'notistack'
import { useEffect, useState } from 'react'
import ownerService from 'services/owner'
import userService from 'services/user'

const Admin = () => {
  const [users, setUsers] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    ownerService
      .getAllInactiveOwners()
      .then((gotUsers) => setUsers(gotUsers))
      .catch((err) => console.log(err))
  }, [])

  const removeUserFromList = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

  const handleConfirm = (id) => {
    ownerService.enableOwnerProfile(id)
    removeUserFromList(id)
    enqueueSnackbar('New owner is successfully added!', { variant: 'success' })
  }

  const handleDelete = (id) => {
    userService.deleteById(id)
    removeUserFromList(id)
    enqueueSnackbar('Owner request is successfully deleted!', { variant: 'success' })
  }
  return (
    <>
      <InactiveOwners users={users} handleConfirm={handleConfirm} handleDelet={handleDelete} />
    </>
  )
}

export default Admin
