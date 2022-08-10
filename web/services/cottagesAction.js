import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'cottages/actions'

const checkIfAnyExist = async () => {
  const res = await axios.get(baseUrl + '/exist')
  return res.data
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getAllActiveActions = async () => {
  const res = await axios.get(baseUrl + "/active")
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

const cottageActionService = {
  checkIfAnyExist,
  getAll,
  getAllActiveActions,
  getById,
  create,
  update,
  remove,
}

export default cottageActionService
