import LoginForm from '../components/forms/LoginForm'
import loginService from '../services/login'
import userService from '../services/user'

const Login = () => {
  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await loginService.login(credentials)
      window.localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser))
      const user = await userService.getMe()
      window.localStorage.setItem('role', user.authorities[0].authority)
      window.localStorage.setItem('penalty', user.penaltyCount)
      // TODO Ne koristiti ovako url
      window.location.href = 'http://localhost:3000'
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
