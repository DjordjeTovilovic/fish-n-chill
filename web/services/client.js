import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'clients/'

const getRatings = async () => {
  const res = await axios.get(baseUrl + 'whoami/ratings')
  return res.data

}
const clientService = {
  getRatings
}

export default clientService
