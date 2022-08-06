import SignupForm from '../../components/forms/SignupForm'
import signupService from '../../services/signup'

const Signup = () => {
  const handleSignup = async (credentials) => {
    try {
      await signupService.signup(credentials)
      if (credentials.role === 'client') {
        alert('Successfully signed up. Check your email to verify your account!')
      } else {
        alert('Successfully signed up. You can now log in!')
      }

      window.location.href = 'http://localhost:3000'
    } catch (exception) {
      if (exception.message.includes('code 409')) {
        alert('There is already a user registered on this username or email:\n' + '\nPlease try again')
      } else {
        alert('SOME OTHER ERROR')
      }
    }
  }

  return (
    <div>
      <SignupForm handleSignup={handleSignup} />
    </div>
  )
}

export default Signup
