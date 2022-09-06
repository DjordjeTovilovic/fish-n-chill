import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'adventures/'

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

const getAllForOwner = async () => {
  const res = await axios.get(baseUrl + 'owned')
  return res.data
}

const adventureService = {
  getAll,
  getById,
  create,
  update,
  remove,
  getAllForOwner,
}

export default adventureService
