import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'clients/'

const getRatings = async () => {
  const res = await axios.get(baseUrl + 'whoami/ratings')
  return res.data
}
const writeRevision = async (clientResponse) => {
  const res = await axios.post(baseUrl + 'writeRevision', clientResponse)
  return res.data
}
const writeComplaint = async (clientResponse) => {
  const res = await axios.post(baseUrl + 'writeComplaint', clientResponse)
  return res.data
}

const clientService = {
  getRatings,
  writeRevision,
  writeComplaint
}

export default clientService
