import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Modal from 'components/modal/Modal'
import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'

const CottagePastReservations = ({
  reservations,
  // ratingsProp,
  // changeRating,
  // rateEntity,
  // beginingRatings,
  // statusMessage,
  submitResponse,
  // submitStatusMessage,
}) => {
  const [isOpenRevisionModal, setIsOpenRevisionModal] = useState(false)
  const [tabValue, setTabValue] = useState(0)
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

  const revisionModalContent = (
    <>
      <h3>Write your revision</h3>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue)
          }}
          aria-label="basic tabs"
        >
          <Tab label="Client Review" />
          <Tab label="Client didn't show up" />
          <Tab label="Client broke rules" />
        </Tabs>
      </Box>
      {tabValue === 1 ? (
        <div>
          <br />
          <Typography color="red" gutterBottom="true" variant="subtitle2" align="right">
            The user will be penalized
          </Typography>
        </div>
      ) : (
        <> </>
      )}
      {tabValue === 2 ? (
        <div>
          <br />
          <Typography color="red" gutterBottom="true" variant="subtitle2" align="right">
            Admin will review this revision and the user might be penalized
          </Typography>
        </div>
      ) : (
        <> </>
      )}
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
      {reservations.map((reservation) => (
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
            <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}></CardActions>
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
            </CardActions>
          </Card>
          <Modal
            content={revisionModalContent}
            isOpenModal={isOpenRevisionModal}
            changeModalState={changeRevisionModalState}
          />
        </>
      ))}
    </div>
  )
}
export default CottagePastReservations
