import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'

const PastReservations = ({ reservations, ratingsProp, changeRating, rateEntity, beginingRatings, statusMessage }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <h1>Reservation history</h1>
      {reservations.map((reservation, index) => (
        <Card sx={{ my: 3, display: 'flex', width: '80%', height: '170px' }} key={reservation.id}>
          <CardMedia component="img" sx={{ width: 170, height: '100%' }} image={reservation.cottage.images[0].url} />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
            <Typography borderBottom={1} gutterBottom variant="h5" align="left">
              COTTAGE
            </Typography>
            <Typography gutterBottom align="left">
              Name: {reservation.cottage.name}
            </Typography>
            <Typography gutterBottom align="left">
              Address: {reservation.cottage.address}
            </Typography>
            <Typography gutterBottom align="left">
              Price: {reservation.cottage.price}€/day
            </Typography>
          </CardContent>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', maxWidth: '30%' }}>
            <Typography borderBottom={1} gutterBottom variant="h5" align="left">
              RESERVATION
            </Typography>
            <Typography gutterBottom align="left">
              Schedule:{' '}
              {`${new Date(reservation.reservationStart).toLocaleDateString('en-UK')} - ${new Date(
                reservation.reservationEnd
              ).toLocaleDateString('en-UK')}`}
            </Typography>
            <Typography gutterBottom align="left">
              Number of guests: {reservation.numberOfGuests}
            </Typography>
            <Typography gutterBottom align="left">
              Price: {reservation.price}€
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
            <Rating
              name="rate"
              value={parseFloat(ratingsProp[index])}
              precision={0.5}
              sx={{ mb: 3 }}
              // @ts-ignore
              onChange={(e) => changeRating(e.target.value, index)}
            />
            <Button
              size="small"
              variant="contained"
              color="secondary"
              disabled={parseFloat(ratingsProp[index]) === parseFloat(beginingRatings[index])}
              onClick={() => rateEntity(reservation.cottage.id, ratingsProp[index])}
            >
              Rate cottage
            </Button>
            {statusMessage !== '' && (
              <p style={{ marginTop: '0px', color: 'green', fontSize: '13px' }}>{statusMessage}</p>
            )}
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
export default PastReservations
