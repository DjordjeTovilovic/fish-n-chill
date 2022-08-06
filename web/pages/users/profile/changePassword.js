import { useState, useEffect } from 'react'
import userService from '../../../services/user'
import ChangeUserPasswordForm from '../../../components/forms/ChangeUserPasswordForm'

const ChangeInfo = () => {
  const [user, setUser] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => setUser(await userService.getMe())

  if (Object.keys(user).length === 0) {
    return <div>Loading....</div>
  }

  const handleChange = async (credentials) => {
    let check = user.authorities[0].authority === 'ROLE_CLIENT'
    if (check) {
      credentials.role = 'client'
    }
    if (credentials.oldPassword === credentials.newPassword) {
      alert('The old and new passwords are the same. Then will not change!')
    } else {
      try {
        await userService.updatePassword(credentials)
        alert('You changed your password successfully. You need to log in again with the new password!')
        window.localStorage.clear()
        window.location.href = 'http://localhost:3000/login/'
      } catch (exception) {
        alert('You old password is incorrect. Try again!')
      }
    }
  }

  return (
    <>
      <ChangeUserPasswordForm handleChange={handleChange} user={user} />
    </>
  )
}

export default ChangeInfo
