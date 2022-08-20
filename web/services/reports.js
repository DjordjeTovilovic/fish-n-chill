import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'reports/'

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const reportApprovedByAdmin = async (id) => {
  const res = await axios.post(baseUrl + 'approved/' + id)
  return res.data
}

const reportDeclinedByAdmin = async (id) => {
  const res = await axios.delete(baseUrl + 'delete/' + id)
  return res.data
}

const reportService = {
  getAll,
  reportApprovedByAdmin,
  reportDeclinedByAdmin,
}

export default reportService
