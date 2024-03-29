import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL
const baseUrlAuth = process.env.NEXT_PUBLIC_AUTH_URL

const getAllActiveCottageOwnerReservations = async () => {
  const res = await axios.get(baseUrl + `owner/cottages/reservations/active`)
  return res.data
}

const getAllActiveBoatOwnerReservations = async () => {
  const res = await axios.get(baseUrl + `owner/boats/reservations/active`)
  return res.data
}

const getAllActiveAdventureOwnerReservations = async () => {
  const res = await axios.get(baseUrl + `owner/adventures/reservations/active`)
  return res.data
}

const getAllPastCottageOwnerReservations = async () => {
  const res = await axios.get(baseUrl + `owner/cottages/reservations/past`)
  return res.data
}

const getAllPastBoatOwnerReservations = async () => {
  const res = await axios.get(baseUrl + `owner/boats/reservations/past`)
  return res.data
}

const getAllPastAdventureOwnerReservations = async () => {
  const res = await axios.get(baseUrl + `owner/adventures/reservations/past`)
  return res.data
}

const makeCottageReport = async (newObject) => {
  const res = await axios.post(baseUrl + `cottages/reservations/reports`, newObject)
  return res.data
}

const makeBoatReport = async (newObject) => {
  const res = await axios.post(baseUrl + `boats/reservations/reports`, newObject)
  return res.data
}

const makeAdventureReport = async (newObject) => {
  const res = await axios.post(baseUrl + `adventures/reservations/reports`, newObject)
  return res.data
}

const getAllInactiveOwners = async () => {
  const res = await axios.get(baseUrl + 'owner/all-unactivated-owners')
  return res.data
}

const enableOwnerProfile = async (id) => {
  const res = await axios.post(baseUrlAuth + 'verify-owner-account/' + id)
  return res
}

const ownerService = {
  getAllActiveCottageOwnerReservations,
  getAllActiveBoatOwnerReservations,
  getAllActiveAdventureOwnerReservations,
  getAllPastCottageOwnerReservations,
  getAllPastBoatOwnerReservations,
  getAllPastAdventureOwnerReservations,
  makeCottageReport,
  makeBoatReport,
  makeAdventureReport,
  getAllInactiveOwners,
  enableOwnerProfile,
}

export default ownerService
