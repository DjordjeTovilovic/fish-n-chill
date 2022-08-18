import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL

const getAllActiveCottageReservationsForOwner = async () => {
  const res = await axios.get(baseUrl + `owner/cottages/reservations/active`)
  return res.data
}

const makeReport = async (newObject) => {
  const res = await axios.post(baseUrl + `cottages/reservations/reports`, newObject)
  return res.data
}

const getAllInactiveOwners = async () => {
  const res = await axios.get(baseUrl + 'owner/all-unactivated-owners')
  return res.data
}

const enableOwnerProfile = async (id) => {
  const res = await axios.post('http://localhost:8080/auth/verify-owner-account/' + id)
  return res
}

const ownerService = {
  getAllActiveCottageReservationsForOwner,
  makeReport,
  getAllInactiveOwners,
  enableOwnerProfile,
}

export default ownerService
