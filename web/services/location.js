import axios from 'axios'
const baseUrl = `https://nominatim.openstreetmap.org/`

const getByQuery = async (query) => {
  const res = await axios.get(baseUrl + `search?q=${query}&format=json`)
  return res.data
}

const locationService = { getByQuery }

export default locationService
