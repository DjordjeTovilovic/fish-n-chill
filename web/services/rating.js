import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'clients/'

const getRatings = async () => {
  const res = await axios.get(baseUrl + 'whoami/ratings')
  return res.data

}

const rateEntity = async (ratingInfo) => {
  const res = await axios.post(baseUrl + 'rate', ratingInfo)
  return res.data

}

const ratingService = {
  getRatings,
  rateEntity
}

export default ratingService
