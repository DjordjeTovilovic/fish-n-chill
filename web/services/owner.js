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

const ownerService = {
  getAllActiveCottageReservationsForOwner,
  makeReport,
}

export default ownerService