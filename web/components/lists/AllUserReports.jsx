import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'
import { useState } from 'react'
import Modal from 'components/modal/Modal'
import Box from '@mui/material/Box'
import { TextField } from '@mui/material'

const AllUserReports = ({
  reports,
  handleRevisionConfirm,
  handleRevisionDecline,
  handleComplaintConfirm,
  handleComplaintDecline,
  handleDeletionDecline,
  handleDeletionConfirm,
}) => {
  const [isOpenRevisionModal, setIsRevisionModalOpen] = useState(false)
  const [revisionModalState, setReportModalState] = useState({ reportId: null, reportText: null })

  const changeRevisionModalState = () => {
    setIsRevisionModalOpen(!isOpenRevisionModal)
  }
  const changeReportModalState = (reportText, reportId, reportType) => {
    setReportModalState({ reportId: reportId, reportText: reportText, modalType: reportType })
    setIsRevisionModalOpen(!isOpenRevisionModal)
  }

  const [response, setResponse] = useState('')

  const revisionModal = (
    <>
      <Box sx={{ height: 400, width: 550 }}>
        <Box sx={{ ml: 3, border: '1px dashed white', maxWidth: '90%', height: 150 }}>
          <div style={{ maxWidth: '100%', overflow: 'hidden', wordBreak: 'break-all' }}>
            <Typography variant="h5" align="left">
              {revisionModalState.reportText}
            </Typography>
          </div>
        </Box>

        <Box>
          <TextField
            id="outlined-multiline-static"
            label="Enter complaint answer"
            multiline
            rows={5}
            sx={{ ml: 3, minWidth: '90%', mb: 3 }}
            onChange={(e) => setResponse(e.target.value)}
          />
        </Box>

        <div align="center">
          <Button
            sx={{ mt: 5, mr: 2 }}
            size="big"
            variant="contained"
            color="success"
            onClick={() => {
              changeRevisionModalState()
              console.log(revisionModalState.modalType)
              if (revisionModalState.modalType === 'REVISION') handleRevisionConfirm(revisionModalState.reportId)
              else if (revisionModalState.modalType === 'COMPLAINT')
                handleComplaintConfirm(revisionModalState.reportId, response)
              else handleDeletionConfirm(revisionModalState.reportId)
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
              changeRevisionModalState()
              if (revisionModalState.modalType === 'REVISION') handleRevisionDecline(revisionModalState.reportId)
              else if (revisionModalState.modalType === 'COMPLAINT') handleComplaintDecline(revisionModalState.reportId)
              else handleDeletionDecline(revisionModalState.reportId)
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
              <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '20%' }}>
                {report.responseType === 'ACCOUNTDELETIONREQUEST' && (
                  <Typography borderBottom={1} gutterBottom variant="h5" align="left">
                    DELETE REQUEST
                  </Typography>
                )}
                {(report.responseType === 'REVISION' || report.responseType === 'COMPLAINT') && (
                  <Typography borderBottom={1} gutterBottom variant="h5" align="left">
                    {report.responseType}
                  </Typography>
                )}
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '20%' }}>
                <Typography borderBottom={1} gutterBottom variant="h4" align="left">
                  User
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  Name : {report.user.firstName}
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  LastName : {report.user.lastName}
                </Typography>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
                <Typography borderBottom={1} gutterBottom variant="h5" align="left">
                  Info
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  Username : {report.user.username}
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  email : {report.user.email}
                </Typography>
              </CardContent>
              <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
                <Typography borderBottom={1} gutterBottom variant="h5" align="left">
                  Report
                </Typography>
                <Typography gutterBottom variant="h5" align="left">
                  {report.explanation.substring(0, 20)}...
                </Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', flexDirection: 'row', mt: 5, ml: 10 }}>
                <Button
                  align="right"
                  size="big"
                  variant="contained"
                  color="success"
                  onClick={() =>
                    report.responseType === 'REVISION'
                      ? changeReportModalState(report.explanation, report.id, report.responseType)
                      : changeReportModalState(report.explanation, report.id, report.responseType)
                  }
                >
                  View more
                </Button>
              </CardActions>
            </Card>
            <Modal
              content={revisionModal}
              isOpenModal={isOpenRevisionModal}
              changeModalState={changeRevisionModalState}
            />
          </div>
        ))}
      </div>
    </>
  )
}
export default AllUserReports
