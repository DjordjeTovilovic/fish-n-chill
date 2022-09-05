import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_AUTH_URL + 'signup'

const signup = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

const verifyClient = async (token) => {
  const response = await axios.post(process.env.NEXT_PUBLIC_AUTH_URL + `verify-account/${token}`)
  return response.data
}

const signupService = { signup, verifyClient }

export default signupService
