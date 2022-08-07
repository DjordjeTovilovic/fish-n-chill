import { useState, useEffect } from 'react'
import userService from '../../../services/user'
import ChangeUserInfoForm from '../../../components/forms/ChangeUserInfoForm'

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
    delete user.password
    delete user.authorities
    delete user.enabled
    delete user.id
    delete user.email
    if (check) {
      credentials.role = 'client'
    }
    if (
      JSON.stringify(user, Object.keys(user).sort()) === JSON.stringify(credentials, Object.keys(credentials).sort())
    ) {
      alert('You did not change any data')
    } else {
      try {
        await userService.updateUser(credentials)

        if (credentials.username !== user.username) {
          alert('You changed your username. You need to log in again with the new username!')
          window.localStorage.clear()
          window.location.href = 'http://localhost:3000/login/'
        } else {
          alert('You successfully updated your account information!')
          window.location.href = 'http://localhost:3000/users/profile/'
        }
      } catch (exception) {
        alert('Something went wrong:' + exception)
      }
    }
  }

  return (
    <>
      <ChangeUserInfoForm handleChange={handleChange} user={user} />
    </>
  )
}

export default ChangeInfo
