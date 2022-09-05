import { useRouter } from 'next/router'
import { useState } from 'react'
import { useEffect } from 'react'
import signupService from 'services/signup'

const VerifyClient = () => {
  const [status, setStatus] = useState({ message: 'Verifying account...', color: 'black' })
  const router = useRouter()
  const { token } = router.query
  useEffect(() => {
    if (router.isReady)
      signupService
        .verifyClient(token)
        .then(() =>
          setStatus({ message: 'You successfully verified your account. You can now log in!', color: 'green' })
        )
        .catch((err) => {
          if (err.response.status === 404)
            setStatus({
              message: 'Verification token is invalid. Please make sure the token is correct!',
              color: 'red',
            })
          if (err.response.status === 409)
            setStatus({
              message: 'This verification token has expired. Please sign up again to get a new one!',
              color: 'red',
            })
        })
  }, [token, router.isReady])

  return <h2 style={{ textAlign: 'center', color: `${status.color}` }}>{status.message}</h2>
}
export default VerifyClient
