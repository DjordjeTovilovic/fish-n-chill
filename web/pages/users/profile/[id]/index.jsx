import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import UserProfile from 'components/profiles/UserProfile'
import userService from 'services/user'

const User = () => {
  const router = useRouter()
  const { id } = router.query
  const [user, setUser] = useState({})

  const [clientResponse, setClientResponse] = useState({
    userId: null,
    explanation: '',
  })
  const handleDelete = async () => {
    userService
      .deleteAccountRequest(clientResponse)
      .then(() => alert('Account deletion request issued. You will be informed when it gets deleted!'))
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    if (router.isReady)
      userService
        .getById(id)
        .then((gotUser) => {
          setUser(gotUser)
        })
        .catch((err) => console.log(err))
  }, [id, router.isReady])

  if (Object.keys(user).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <UserProfile user={user} handleDelete={handleDelete} setClientResponse={setClientResponse} />
    </>
  )
}

export default User
