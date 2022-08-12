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
      const fetchedReservations = await reservationService.getAllPastReservationsForCottage(id)
      setReservations(fetchedReservations)
    }

    router.isReady ? fetchData() : console.log('router not ready')
  }, [router.isReady, id])

  return <CottagePastReservations reservations={reservations} />
}

export default CottageReservationHistory
