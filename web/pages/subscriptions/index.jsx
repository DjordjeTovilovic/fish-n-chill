import { useEffect } from 'react'
import subscriptionService from 'services/subscription'

const Subscriptions = () => {
  useEffect(() => {
    subscriptionService
      .getAllForClient(JSON.parse(window.localStorage.getItem('id')))
      .then((gotSubs) => console.log(gotSubs))
      .catch((err) => console.log(err))
  }, [])

  return <h1>Subscriptions</h1>
}
export default Subscriptions
