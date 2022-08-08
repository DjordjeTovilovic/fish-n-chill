// @ts-nocheck
import { useState, useEffect } from 'react'
import userService from '../../../services/user'
import UserProfile from '../../../components/profiles/UserProfile'
import clientService from 'services/client'

const User = () => {
  const [user, setUser] = useState({})

  const handleDelete = async () => {
    const deleteRequest = {
      clientId: user.id,
      ownerId: null,
      entityId: null,
      explanation: 'reason',
    }
    clientService
      .deleteAccountRequest(deleteRequest)
      .then((delReq) => alert('Account deletion request issued. You will be informed when it gets deleted!'))
      .catch((err) => console.log(err))
  }
  useEffect(() => {
    userService
      .getMe()
      .then((gotUser) => {
        console.log(gotUser)
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
