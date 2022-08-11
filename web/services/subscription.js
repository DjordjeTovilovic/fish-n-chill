import axios from 'axios'
const baseUrl = process.env.NEXT_PUBLIC_API_URL + 'subscriptions/'

const exists = async (subscriptionsInfo) => {
  const res = await axios.post(baseUrl + 'exists', subscriptionsInfo)
  return res.data

}

const subscribe = async (subscriptionsInfo) => {
  const res = await axios.post(baseUrl + 'subscribe', subscriptionsInfo)
  return res.data
}

const unsubscribe = async (subscriptionsInfo) => {
  const res = await axios.delete(baseUrl + `unsubscribe?clientId=${subscriptionsInfo.clientId}&entityId=${subscriptionsInfo.entityId}`)
  return res.data
}

const subscriptionService = {
  exists,
  subscribe,
  unsubscribe
}

export default subscriptionService
