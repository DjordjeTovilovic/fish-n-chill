import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import Modal from 'components/modal/Modal'
import { Divider, Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import ownerService from '../../services/owner'
import { useSnackbar } from 'notistack'

const CottagePastReservations = ({ reservations }) => {
  const [isOpenReportModal, setIsOpenReportModal] = useState(false)
  const [tabValue, setTabValue] = useState(0)
  const [reservationId, setReservationId] = useState(0)
  const [ownerReport, setOwnerReport] = useState('')
  const { enqueueSnackbar } = useSnackbar()

  const reportTypeEnum = {
    0: 'REVIEW',
    1: 'DIDNOTCOME',
    2: 'COMPLAINT',
  }

  const reportMessage = {
    0: '',
    1: 'The client will be penalized',
    2: 'Admin will review this report and the client might be penalized',
  }

  const submitReport = () => {
    const report = { reservationId, ownerReport, ownerReportType: reportTypeEnum[tabValue] }
    ownerService.makeReport(report)
    reservations.forEach((reservation) => {
      if (reservation.id === reservationId) reservation.ownerReport = ownerReport
    })
    changeReportModalState()
    enqueueSnackbar('Report successfully made', { variant: 'success' })
  }

  const handleReportButton = (reservationId) => {
    setReservationId(reservationId)
    changeReportModalState()
  }

  const changeReportModalState = () => {
    setIsOpenReportModal(!isOpenReportModal)
  }

  const reportModalContent = (
    <>
      <h3>Write your report</h3>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue)
          }}
          aria-label="basic tabs"
        >
          <Tab label="Standard Review" />
          <Tab label="Client didn't show up" />
          <Tab label="Client misbehaved" />
        </Tabs>
      </Box>
      <div>
        <br />
        <Typography color="red" gutterBottom variant="subtitle2" align="right">
          {reportMessage[tabValue]}
        </Typography>
      </div>
      <Divider />
      <TextField
        id="outlined-multiline-static"
        label="Report"
        multiline
        rows={10}
        sx={{ minWidth: '500px', mb: 3 }}
        onChange={(e) => setOwnerReport(e.target.value)}
      />
      <div style={{ display: 'flex' }}>
        <Button sx={{ width: '30%' }} onClick={submitReport} variant="contained" color="info">
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
        <div key={reservation.id}>
          <Card sx={{ my: 3, display: 'flex', width: '95%', height: '170px' }} key={reservation.id}>
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
            <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 5, alignItems: 'center' }}>
              <Button
                variant="contained"
                color="info"
                disabled={reservation.ownerReport !== null}
                style={{ fontSize: '12px', minWidth: '170px' }}
                onClick={() => handleReportButton(reservation.id)}
              >
                {reservation.ownerReport ? 'Report written' : 'Write report'}
              </Button>
            </CardActions>
          </Card>
          <Modal
            content={reportModalContent}
            isOpenModal={isOpenReportModal}
            changeModalState={changeReportModalState}
          />
        </div>
      ))}
    </div>
  )
}
export default CottagePastReservations
