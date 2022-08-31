import { useRouter } from 'next/router'
import LoginForm from '../components/forms/LoginForm'
import loginService from '../services/login'
import userService from '../services/user'

const Login = () => {
  const router = useRouter()
  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      const user = await userService.getMe()
      window.localStorage.setItem('id', user.id)
      window.localStorage.setItem('role', user.authorities[0].authority)
      window.localStorage.setItem('penalty', user.penaltyCount)
      router.push('/')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <>
      <LoginForm handleLogin={handleLogin} />
    </>
  )
}

export default Login
