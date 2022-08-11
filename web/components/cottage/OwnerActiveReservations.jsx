import { Link } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import OwnerNewReservationModal from './OwnerNewReservationModal'

const OwnerActiveReservations = ({ reservations }) => {
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false)
  const [cottage, setCottage] = useState({})
  const [client, setClient] = useState({})

  const handleNewReservationButton = (reservation) => {
    setCottage(reservation.entity)
    setClient(reservation.client)
    changeReservationModalState()
  }

  const changeReservationModalState = () => {
    setIsReservationModalOpen(!isReservationModalOpen)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      {reservations.map((reservation) => (
        <Card sx={{ my: 3, display: 'flex', width: '80%', height: '170px' }} key={reservation.id}>
          <CardMedia component="img" sx={{ width: 170, height: '100%' }} image={reservation.entity.images[0].url} />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
            <Typography borderBottom={1} gutterBottom variant="h5" align="left">
              COTTAGE
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
            <Typography gutterBottom align="left">
              Client:
              <Link href="#">{reservation.client.username}</Link>
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => handleNewReservationButton(reservation)}
            >
              Make new reservation for client
            </Button>
          </CardActions>
        </Card>
      ))}
      <OwnerNewReservationModal
        cottage={cottage}
        client={client}
        isReservationModalOpen={isReservationModalOpen}
        changeReservationModalState={changeReservationModalState}
      />
    </div>
  )
}

export default OwnerActiveReservations
