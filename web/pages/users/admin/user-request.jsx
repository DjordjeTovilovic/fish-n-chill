import AllUserReports from 'components/lists/AllUserReports'
import { useEffect, useState } from 'react'
import adminService from 'services/admin'
import { useSnackbar } from 'notistack'

const UserReports = () => {
  const [reports, setReports] = useState([])
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    adminService
      .getAllUserComplaintAndRevision()
      .then((gotReports) => setReports(gotReports))
      .catch((err) => console.log(err))
  }, [])

  const removeRequestFromList = (id) => {
    setReports(reports.filter((request) => request.id !== id))
  }

  const handleDeletionConfirm = (id) => {
    adminService
      .approveDeletionRequest(id)
      .then(removeRequestFromList(id))
      .catch((err) => console.log(err))
    enqueueSnackbar('User is succefully deleted!', { variant: 'success' })
  }

  const handleDeletionDecline = (id) => {
    adminService
      .deleteUserRequest(id)
      .then(removeRequestFromList(id))
      .catch((err) => console.log(err))
    enqueueSnackbar('User is succefully deleted!', { variant: 'success' })
  }

  const handleRevisionConfirm = (id) => {
    adminService
      .approveClientRevision(id)
      .then(removeRequestFromList(id))
      .catch((err) => console.log(err))
    enqueueSnackbar('Revision successfully approved!', { variant: 'success' })
  }

  const handleRevisionDecline = (id) => {
    adminService
      .deleteUserRequest(id)
      .then(removeRequestFromList(id))
      .catch((err) => console.log(err))
    enqueueSnackbar('Revision successfully deleted!', { variant: 'success' })
  }
  const handleComplaintConfirm = (id, response) => {
    adminService
      .approveClientComplaint(id, response)
      .then(removeRequestFromList(id))
      .catch((err) => console.log(err))
    enqueueSnackbar('Complaint successfully approved', { variant: 'success' })
  }

  const handleComplaintDecline = (id) => {
    adminService
      .deleteUserRequest(id)
      .then(removeRequestFromList(id))
      .catch((err) => console.log(err))
    enqueueSnackbar('Complaint successfully deleted', { variant: 'success' })
  }

  return (
    <>
      <AllUserReports
        reports={reports}
        handleRevisionConfirm={handleRevisionConfirm}
        handleRevisionDecline={handleRevisionDecline}
        handleComplaintConfirm={handleComplaintConfirm}
        handleComplaintDecline={handleComplaintDecline}
        handleDeletionConfirm={handleDeletionConfirm}
        handleDeletionDecline={handleDeletionDecline}
      />
    </>
  )
}

export default UserReports
