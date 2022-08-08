import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'clients/'

const getRatings = async () => {
  const res = await axios.get(baseUrl + 'whoami/ratings')
  return res.data
}

const deleteAccountRequest = async (deleteRequest) => {
  const res = await axios.post(baseUrl + 'deleteAccountRequest', deleteRequest)
  return res.data
}

const clientService = {
  getRatings,
  deleteAccountRequest
}

export default clientService
