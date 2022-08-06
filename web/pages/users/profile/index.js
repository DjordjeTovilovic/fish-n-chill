import { useState, useEffect } from 'react'
import userService from '../../../services/user'
import UserProfile from '../../../components/profiles/UserProfile'

const User = () => {
  const handleDelete = async () => {
    try {
      await userService.deleteMe()
      alert('Account successfully deleted')
      window.localStorage.clear()
      window.location.href = 'http://localhost:3000'
    } catch (exception) {
      console.log(exception)
    }
  }

  const [user, setUser] = useState({})

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => setUser(await userService.getMe())

  if (Object.keys(user).length === 0) {
    return <div>Loading....</div>
  }
  return (
    <>
      <UserProfile user={user} handleDelete={handleDelete}></UserProfile>
    </>
  )
}

export default User
