import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import dateUtils from '../../utils/dateUtils'

const ActiveReservationCard = ({ reservation, index, cancelReservation, entityType }) => {
  return (
    <Card sx={{ my: 3, display: 'flex', width: '80%', height: '170px' }} key={reservation.id}>
      <CardMedia component="img" sx={{ width: 170, height: '100%' }} image={reservation.entity.images[0].url} />
      <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
        <Typography borderBottom={1} gutterBottom variant="h5" align="left">
          {entityType}
        </Typography>
        <Typography gutterBottom align="left">
          Name: {reservation.entity.name}
        </Typography>
        <Typography gutterBottom align="left">
          Address: {reservation.entity.address}
        </Typography>
        <Typography gutterBottom align="left">
          Price: {reservation.entity.price}€/day
        </Typography>
      </CardContent>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', maxWidth: '30%' }}>
        <Typography borderBottom={1} gutterBottom variant="h5" align="left">
          RESERVATION
        </Typography>
        <Typography gutterBottom align="left">
          Schedule:{' '}
          {`${new Date(reservation.reservationStart).toLocaleDateString('en-UK')}
           - ${new Date(reservation.reservationEnd).toLocaleDateString('en-UK')}`}
        </Typography>
        <Typography gutterBottom align="left">
          Number of guests: {reservation.numberOfGuests}
        </Typography>
        <Typography gutterBottom align="left">
          Price: {reservation.price}€
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
        <Button
          size="small"
          variant="contained"
          color="error"
          onClick={() => cancelReservation(reservation.id, index)}
          disabled={dateUtils.daysBetween(new Date(), new Date(reservation.reservationStart)) < 3}
        >
          Cancel reservation
        </Button>
        {dateUtils.daysBetween(new Date(), new Date(reservation.reservationStart)) < 3 && (
          <p style={{ color: 'red', width: '200px', fontSize: '10px', textAlign: 'center' }}>
            You can't cancel the reservation 3 or less days before start or while it's active!
            {`(Today: ${new Date().toLocaleDateString('en-UK')})`}
          </p>
        )}
      </CardActions>
    </Card>
  )
}
export default ActiveReservationCard
