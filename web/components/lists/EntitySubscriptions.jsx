import SubscriptionCard from 'components/shared/SubscriptionCard'

const EntitySubscriptions = ({ subscriptions }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <h1>Subscriptions</h1>
      {subscriptions.map((subscription) => (
        <SubscriptionCard subscription={subscription} key={subscription.id} />
      ))}
    </div>
  )
}
export default EntitySubscriptions
