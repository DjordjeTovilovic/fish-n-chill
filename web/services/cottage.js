import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'cottages/'

const scheduleReservation = async (reservation) => {
  await axios.post('http://localhost:8080/api/cottages/reservations', reservation)
}

const findByPeriod = async (datePeriod) => {
  const res = await axios.post('http://localhost:8080/api/cottages/findByPeriod', datePeriod)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getByNameContaining = async (name) => {
  const res = await axios.get(baseUrl + 'name/' + name)
  return res.data
}

const getByDescriptionContaining = async (description) => {
  const res = await axios.get(baseUrl + 'description/' + description)
  return res.data
}

const getByAddressContaining = async (address) => {
  const res = await axios.get(baseUrl + 'address/' + address)
  return res.data
}

const getByAnything = async (anything) => {
  const res = await axios.get(baseUrl + 'anything/' + anything)
  return res.data
}

const getById = async (id) => {
  const res = await axios.get(baseUrl + id)
  return res.data
}

const create = async (newObject) => {
  const res = await axios.post(baseUrl, newObject)
  return res.data
}

const update = async (newObject) => {
  const res = await axios.put(baseUrl + newObject.id, newObject)
  return res.data
}

const remove = async (id) => {
  await axios.delete(baseUrl + id)
}

const cottageService = {
  getAll,
  getByNameContaining,
  getByDescriptionContaining,
  getByAddressContaining,
  getByAnything,
  getById,
  create,
  update,
  remove,
  scheduleReservation,
  findByPeriod
}

export default cottageService
