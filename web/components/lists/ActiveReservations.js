import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import dateUtils from '../../utils/dateUtils'

const ActiveReservations = (reservations) => {
  return <div style={{
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center"
  }}>
    <h1>Active Reservations</h1>
    {Array.isArray(reservations.reservations) && reservations.reservations.map((reservation) =>
    (<Card sx={{ display: 'flex', width: "80%", height: "170px", alignItems: "center" }} key={reservation.id}>
      <CardMedia
        component="img"
        sx={{ width: 170, height: "100%" }}
        image="https://i.ibb.co/gRhpQYk/cottage1.jpg"
        alt="Live from space album cover"
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
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
      <CardContent sx={{ display: "flex", flexDirection: "column" }}>
        <Typography borderBottom={1} gutterBottom variant="h5" align="left">
          RESERVATION
        </Typography>
        <Typography gutterBottom align="left">
          Schedule: {`${(new Date(reservation.reservationStart)).toLocaleDateString('en-UK')} - ${(new Date(reservation.reservationEnd)).toLocaleDateString('en-UK')}`}
        </Typography>
        <Typography gutterBottom align="left">
          Number of guests: {reservation.numberOfGuests}
        </Typography>
        <Typography gutterBottom align="left">
          Price: {reservation.price}€
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", flexDirection: "column" }}>
        <Button size="small"
          variant="contained"
          sx={{ backgroundColor: "red" }}
          disabled={dateUtils.daysBetween(new Date(), new Date(reservation.reservationStart)) <= 3}
        >
          Cancel reservation
        </Button>
        {dateUtils.daysBetween(new Date(), new Date(reservation.reservationStart)) <= 3
          && <p style={{ color: "red", width: "200px", fontSize: "10px", textAlign: "center" }}>
            You can't cancel the reservation less than 3 days before start!</p>}
      </CardActions>
    </Card>))}

  </div >
}
export default ActiveReservations;