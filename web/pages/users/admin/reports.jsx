import { useEffect, useState } from 'react'
import reportService from 'services/reports'
import AllOwnerReports from 'components/lists/AllOwnerReports'
import { useSnackbar } from 'notistack'

const Reports = () => {
  const [reports, setReports] = useState([])
  const { enqueueSnackbar } = useSnackbar()

  const removeReportFromList = (id) => {
    console.log(reports)
    setReports(reports.filter((report) => report.id !== id))
  }
  useEffect(() => {
    reportService
      .getAll()
      .then((gotReports) => setReports(gotReports))
      .catch((err) => console.log(err))
  }, [])

  const handleConfirm = (id) => {
    reportService.reportApprovedByAdmin(id)
    removeReportFromList(id)
    enqueueSnackbar('Report succesfully solved. User penalized!', { variant: 'success' })
  }
  const handleDecline = (id) => {
    reportService.reportDeclinedByAdmin(id)
    removeReportFromList(id)
    enqueueSnackbar('Report succesfully solved. Report deleted!', { variant: 'success' })
  }

  return (
    <>
      <AllOwnerReports reports={reports} handleConfirm={handleConfirm} handleDecline={handleDecline} />
    </>
  )
}

export default Reports
