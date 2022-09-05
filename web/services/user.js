import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'users/'

const getMe = async () => {
  const res = await axios.get(baseUrl + 'whoami/')
  return res.data
}

const getById = async (id) => {
  const res = await axios.get(baseUrl + 'profile/' + id)
  return res.data
}

const updateUser = async (credentials) => {
  const response = await axios.post(baseUrl + 'update/', credentials)
  return response.data
}

const updatePassword = async (credentials) => {
  const response = await axios.post(baseUrl + 'change-password/', credentials)
  return response.data
}

const deleteMe = async () => {
  await axios.post(baseUrl + 'deleteAccount/')
}

const deleteById = async (id) => {
  await axios.delete(baseUrl + 'delete/' + id)
}

const deleteAccountRequest = async (deleteRequest) => {
  const res = await axios.post(baseUrl + 'deleteAccountRequest', deleteRequest)
  return res.data
}

const userService = {
  getMe,
  getById,
  updateUser,
  updatePassword,
  deleteMe,
  deleteAccountRequest,
  deleteById,
}

export default userService
