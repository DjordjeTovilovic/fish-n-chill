import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL

const getAllPastCottageReservationsForClient = async () => {
  const res = await axios.get(baseUrl + 'cottages/whoami/reservations/past')
  return res.data
}

const getAllActiveCottageReservationsForClient = async () => {
  const res = await axios.get(baseUrl + 'cottages/whoami/reservations/active')
  return res.data
}


const scheduleReservation = async (reservation) => {
  const res = await axios.post(baseUrl + 'cottages/reservations/', reservation)
  return res.data
}

const cancelReservation = async (id) => {
  const res = await axios.delete(baseUrl + 'reservations/cancel/' + id)
  return res.data
}

const reservationService = {
  getAllPastCottageReservationsForClient,
  getAllActiveCottageReservationsForClient,
  scheduleReservation,
  cancelReservation
}

export default reservationService
