import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import CottagePastReservations from '../../../components/lists/CottagePastReservations'
import reservationService from '../../../services/reservation'

const CottageReservationHistory = () => {
  const router = useRouter()
  const { id } = router.query
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReservations = await reservationService.getAllPastCottageReservationsForCottage(id)
      setReservations(fetchedReservations)
      console.log(fetchedReservations)
    }
    router.isReady ? fetchData() : console.log('router not ready')
  }, [router.isReady, id])

  const submitResponse = (clientResponse) => {
    // if (clientResponse.isRevision)
    //   clientService
    //     .writeRevision(clientResponse)
    //     .then(() => setSubmitStatusMessage('Revision submited!'))
    //     .catch((err) => console.log(err))
    // else
    //   clientService
    //     .writeComplaint(clientResponse)
    //     .then(() => setSubmitStatusMessage('Complaint submited!'))
    //     .catch((err) => console.log(err))
  }

  return (
    <CottagePastReservations
      reservations={reservations}
      // beginingRatings={beginingRatings}
      // statusMessage={statusMessage}
      submitResponse={submitResponse}
      // submitStatusMessage={submitStatusMessage}
    />
  )
}

export default CottageReservationHistory
