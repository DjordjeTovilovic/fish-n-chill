import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL

const getAllPastCottageReservationsForClient = async () => {
  const cottageReservations = await axios.get(baseUrl + 'cottages/whoami/reservations/past')
  const boatReservations = await axios.get(baseUrl + 'boats/whoami/reservations/past')
  const adventureReservations = await axios.get(baseUrl + 'adventures/whoami/reservations/past')

  const reservations = cottageReservations.data.concat(boatReservations.data, adventureReservations.data)

  return reservations
}

const getAllActiveCottageReservationsForClient = async () => {
  const cottageReservations = await axios.get(baseUrl + 'cottages/whoami/reservations/active')
  const boatReservations = await axios.get(baseUrl + 'boats/whoami/reservations/active')
  const adventureReservations = await axios.get(baseUrl + 'adventures/whoami/reservations/active')

  const reservations = cottageReservations.data.concat(boatReservations.data, adventureReservations.data)
  return reservations
}

const getAllPastReservationsForCottage = async (id) => {
  const res = await axios.get(baseUrl + `cottages/${id}/reservations/past`)
  return res.data
}

const getAllPastReservationsForBoat = async (id) => {
  const res = await axios.get(baseUrl + `boats/${id}/reservations/past`)
  return res.data
}

const getAllPastReservationsForAdventure = async (id) => {
  const res = await axios.get(baseUrl + `adventures/${id}/reservations/past`)
  return res.data
}

const scheduleCottageReservation = async (reservation) => {
  const res = await axios.post(baseUrl + 'cottages/reservations/', reservation)
  return res.data
}

const scheduleBoatReservation = async (reservation) => {
  const res = await axios.post(baseUrl + 'boats/reservations/', reservation)
  return res.data
}

const scheduleAdventureReservation = async (reservation) => {
  const res = await axios.post(baseUrl + 'adventures/reservations/', reservation)
  return res.data
}

const cancelReservation = async (id) => {
  const res = await axios.delete(baseUrl + 'reservations/cancel/' + id)
  return res.data
}

const setUnavailablePeriod = async (newObject) => {
  const res = await axios.post(baseUrl + 'unavailable', newObject)
  return res.data
}

const reservationService = {
  getAllPastCottageReservationsForClient,
  getAllActiveCottageReservationsForClient,
  getAllPastReservationsForCottage,
  getAllPastReservationsForBoat,
  getAllPastReservationsForAdventure,
  scheduleCottageReservation,
  scheduleBoatReservation,
  scheduleAdventureReservation,
  cancelReservation,
  setUnavailablePeriod,
}

export default reservationService
