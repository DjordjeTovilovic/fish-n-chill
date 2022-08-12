import EntitySubscriptions from 'components/lists/EntitySubscriptions'
import { useEffect, useState } from 'react'
import subscriptionService from 'services/subscription'

const Subscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([])

  useEffect(() => {
    subscriptionService
      .getAllForClient(JSON.parse(window.localStorage.getItem('id')))
      .then((gotSubs) => setSubscriptions(gotSubs))
      .catch((err) => console.log(err))
  }, [])

  return <EntitySubscriptions subscriptions={subscriptions} />
}
export default Subscriptions
