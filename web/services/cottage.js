import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'cottages/'

const getAllForOwner = async () => {
  const res = await axios.get(baseUrl + 'owned')
  return res.data
}

const findByPeriod = async (datePeriod) => {
  const res = await axios.post(baseUrl + 'findByPeriod/', datePeriod)
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
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

const update = async (id, newObject) => {
  const res = await axios.put(baseUrl + id, newObject)
  return res.data
}

const remove = async (id) => {
  await axios.delete(baseUrl + id)
}

const cottageService = {
  getAll,
  getById,
  create,
  update,
  remove,
  findByPeriod,
  getAllForOwner,
}

export default cottageService
