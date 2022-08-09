import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Rating from '@mui/material/Rating'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Modal from 'components/modal/Modal'

const PastReservations = ({
  reservations,
  ratingsProp,
  changeRating,
  rateEntity,
  beginingRatings,
  statusMessage,
  submitResponse,
  submitStatusMessage,
}) => {
  const [isOpenRevisionModal, setIsOpenRevisionModal] = useState(false)
  const [isOpenComplaintModal, setIsOpenComplaintModal] = useState(false)
  const [clientResponse, setClientResponse] = useState({
    userId: null,
    entityId: null,
    ownerId: null,
    reservationId: null,
    explanation: null,
    isRevision: null,
  })

  const changeRevisionModalState = (clientId, entityId, reservationId, ownerId) => {
    setClientResponse({
      userId: clientId,
      entityId: entityId,
      ownerId: ownerId,
      reservationId: reservationId,
      explanation: '',
      isRevision: true,
    })
    setIsOpenRevisionModal(!isOpenRevisionModal)
  }
  const changeComplaintModalState = (clientId, entityId, reservationId, ownerId) => {
    setClientResponse({
      userId: clientId,
      entityId: entityId,
      ownerId: ownerId,
      reservationId: reservationId,
      explanation: '',
      isRevision: false,
    })
    setIsOpenComplaintModal(!isOpenComplaintModal)
  }

  const revisionModalContent = (
    <>
      <h3>Write your revision</h3>
      <TextField
        id="outlined-multiline-static"
        label="Revision"
        multiline
        rows={10}
        sx={{ minWidth: '500px', mb: 3 }}
        onChange={(e) => setClientResponse((prevState) => ({ ...prevState, explanation: e.target.value }))}
      />
      <div style={{ display: 'flex' }}>
        <Button sx={{ width: '30%' }} onClick={() => submitResponse(clientResponse)} variant="contained" color="info">
          Submit
        </Button>
        {submitStatusMessage !== '' && (
          <p style={{ width: '100px', marginTop: '0px', color: 'green', fontSize: '13px', textAlign: 'center' }}>
            {submitStatusMessage}
          </p>
        )}
      </div>
    </>
  )

  const complaintModalContent = (
    <>
      <h3>Write your complaint</h3>
      <TextField
        id="outlined-multiline-static"
        label="Complaint"
        multiline
        rows={10}
        sx={{ minWidth: '500px', mb: 3 }}
        onChange={(e) => setClientResponse((prevState) => ({ ...prevState, explanation: e.target.value }))}
      />
      <div style={{ display: 'flex' }}>
        <Button sx={{ width: '30%' }} onClick={() => submitResponse(clientResponse)} variant="contained" color="error">
          Submit
        </Button>
        {submitStatusMessage !== '' && (
          <p style={{ width: '100px', marginTop: '0px', color: 'orange', fontSize: '13px', textAlign: 'center' }}>
            {submitStatusMessage}
          </p>
        )}
      </div>
    </>
  )

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
        <>
          <Card sx={{ my: 3, display: 'flex', width: '95%', height: '170px' }} key={reservation.id}>
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
                <p style={{ width: '100px', marginTop: '0px', color: 'green', fontSize: '13px', textAlign: 'center' }}>
                  {statusMessage}
                </p>
              )}
            </CardActions>
            <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'center' }}>
              <Button
                variant="contained"
                color="info"
                disabled={reservation.revisionWritten}
                style={{ fontSize: '12px', minWidth: '170px' }}
                onClick={() =>
                  changeRevisionModalState(
                    reservation.clientId,
                    reservation.cottage.id,
                    reservation.id,
                    reservation.cottage.owner.id
                  )
                }
              >
                {reservation.revisionWritten ? 'Revision written' : 'Write revision'}
              </Button>
              <Button
                sx={{ mt: 2 }}
                size="small"
                variant="contained"
                color="warning"
                disabled={reservation.complaintWritten}
                style={{ fontSize: '12px', minWidth: '170px' }}
                onClick={() =>
                  changeComplaintModalState(
                    reservation.clientId,
                    reservation.cottage.id,
                    reservation.id,
                    reservation.cottage.owner.id
                  )
                }
              >
                {reservation.complaintWritten ? 'Complaint written' : 'Write complaint'}
              </Button>
            </CardActions>
          </Card>
          <Modal
            content={revisionModalContent}
            isOpenModal={isOpenRevisionModal}
            changeModalState={changeRevisionModalState}
          />
          <Modal
            content={complaintModalContent}
            isOpenModal={isOpenComplaintModal}
            changeModalState={changeComplaintModalState}
          />
        </>
      ))}
    </div>
  )
}
export default PastReservations
