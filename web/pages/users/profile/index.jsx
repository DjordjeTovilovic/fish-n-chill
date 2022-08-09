// @ts-nocheck
import { useState, useEffect } from 'react'
import UserProfile from '../../../components/profiles/UserProfile'
import userService from 'services/user'

const User = () => {
  const [user, setUser] = useState({})

  const handleDelete = async () => {
    const deleteRequest = {
      userId: user.id,
      explanation: 'reason',
    }
    userService
      .deleteAccountRequest(deleteRequest)
      .then(() => alert('Account deletion request issued. You will be informed when it gets deleted!'))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    userService
      .getMe()
      .then((gotUser) => {
        setUser(gotUser)
      })
      .catch((err) => console.log(err))
  }, [])

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
