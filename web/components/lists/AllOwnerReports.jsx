import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Modal from 'components/modal/Modal'
import Box from '@mui/material/Box'

const AllOwnerReports = ({ reports, handleConfirm, handleDecline }) => {
  const [isOpenReportModal, setIsReportModalOpen] = useState(false)
  const [reportModalState, setReportModalState] = useState({ reportId: null, reportText: null })

  const changeModalState = () => {
    setIsReportModalOpen(!isOpenReportModal)
  }
  const changeReportModalState = (reportText, reportId) => {
    setReportModalState({ reportId: reportId, reportText: reportText })
    setIsReportModalOpen(!isOpenReportModal)
  }

  const reportModal = (
    <>
      <Box sx={{ height: 350, width: 550 }}>
        <Box sx={{ ml: 3, border: '1px dashed white', maxWidth: '90%', height: 270 }}>
          <Typography sx variant="h5" align="center">
            User report
          </Typography>
          <div style={{ maxWidth: '100%', overflow: 'hidden', wordBreak: 'break-all' }}>
            <Typography variant="h5" align="left">
              {reportModalState.reportText}
            </Typography>
          </div>
        </Box>
        <div align="center">
          <Button
            sx={{ mt: 5, mr: 2 }}
            size="big"
            variant="contained"
            color="success"
            onClick={() => {
              handleConfirm(reportModalState.reportId)
              setIsReportModalOpen(!isOpenReportModal)
            }}
          >
            Confirm
          </Button>
          <Button
            sx={{ mt: 5 }}
            size="big"
            variant="contained"
            color="error"
            onClick={() => {
              handleDecline(reportModalState.reportId)
              setIsReportModalOpen(!isOpenReportModal)
            }}
          >
            Decline
          </Button>
        </div>
      </Box>
    </>
  )

  return (
    <>
      <div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
          }}
        >
          <h1> User Reports</h1>
        </div>
        {reports.map((report) => (
          <div key={report.id}>
            <Card sx={{ my: 3, display: 'flex', width: '95%', height: '150' }}>
              <CardMedia component="img" sx={{ width: 200, height: '100%' }} image={'https://picsum.photos/200'} />
              <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
                <Typography borderBottom={1} gutterBottom variant="h4" align="left">
                  User
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  Name : {report.client.firstName}
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  LastName : {report.client.lastName}
                </Typography>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
                <Typography borderBottom={1} gutterBottom variant="h5" align="left">
                  Info
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  Username : {report.client.username}
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  email : {report.client.email}
                </Typography>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
                <Typography borderBottom={1} gutterBottom variant="h5" align="left">
                  Report
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  {report.report.substring(0, 20)}...
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', flexDirection: 'row', mt: 5, ml: 10 }}>
                <Button
                  align="right"
                  size="big"
                  variant="contained"
                  color="success"
                  onClick={() => changeReportModalState(report.report, report.id)}
                >
                  View more
                </Button>
              </CardActions>
            </Card>
            <Modal content={reportModal} isOpenModal={isOpenReportModal} changeModalState={changeModalState} />
          </div>
        ))}
      </div>
    </>
  )
}
export default AllOwnerReports
