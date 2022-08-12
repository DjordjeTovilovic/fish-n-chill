import { Rating } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import subscriptionService from '../../services/subscription'

const SubscriptionCard = ({ subscription }) => {
  const [subscribed, setSubscribed] = useState(true)

  const alterSubscription = () => {
    subscribed
      ? subscriptionService
          .unsubscribe({
            clientId: JSON.parse(window.localStorage.getItem('id')),
            entityId: subscription.entity.id,
          })
          .then(() => setSubscribed(!subscribed))
          .catch((err) => console.log(err))
      : subscriptionService
          .subscribe({
            clientId: JSON.parse(window.localStorage.getItem('id')),
            entityId: subscription.entity.id,
          })
          .then(() => setSubscribed(!subscribed))
          .catch((err) => console.log(err))
  }
  return (
    <Card sx={{ my: 3, display: 'flex', width: '75%', height: '200px' }} key={subscription.id}>
      <CardMedia component="img" sx={{ width: 200, height: '100%' }} image={subscription.entity.images[0].url} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, mr: 3, maxWidth: '30%' }}>
        <Typography borderBottom={1} gutterBottom variant="h5" align="left">
          {subscription.type}
        </Typography>
        <Typography gutterBottom align="left">
          Name: {subscription.entity.name}
        </Typography>
        <Typography gutterBottom align="left">
          Address: {subscription.entity.address}
        </Typography>
        <Typography gutterBottom align="left">
          Price: {subscription.entity.price}€/day
        </Typography>
        <Typography gutterBottom align="left">
          Capacity: {subscription.entity.capacity}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          ml: 3,
          maxWidth: '30%',
        }}
      >
        <Rating name="rate" value={subscription.entity.ratingAverage} precision={0.5} readOnly />
        <Typography gutterBottom align="left">
          ({subscription.entity.ratingCount} ratings)
        </Typography>
      </CardContent>
      <CardActions
        sx={{ ml: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
      >
        <Button
          color={subscribed ? 'warning' : 'secondary'}
          size="small"
          variant="contained"
          sx={{ minWidth: '150px', mb: 3, height: '40px' }}
          onClick={() => alterSubscription()}
        >
          {subscribed ? 'UNSubscribe' : 'Subscribe'}
        </Button>
      </CardActions>
    </Card>
  )
}
export default SubscriptionCard
