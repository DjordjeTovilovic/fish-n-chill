import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const PastReservations = (reservations) => {
  const [rating, setRating] = useState(0)

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
      {Array.isArray(reservations.reservations) &&
        reservations.reservations.map((reservation) => (
          <Card sx={{ display: 'flex', width: '80%', height: '170px', alignItems: 'center' }} key={reservation.id}>
            <CardMedia
              component="img"
              sx={{ width: 170, height: '100%' }}
              image="https://i.ibb.co/gRhpQYk/cottage1.jpg"
              alt="Live from space album cover"
            />
            <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
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
            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
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
            <CardActions sx={{ display: 'flex', flexDirection: 'column' }}>
              <Rating
                name="rate"
                value={rating}
                precision={0.5}
                sx={{ mb: 3 }}
                onChange={(e) => setRating(e.target.value)}
              />
              <Button size="small" variant="contained">
                Rate cottage
              </Button>
            </CardActions>
          </Card>
        ))}
    </div>
  )
}
export default PastReservations
