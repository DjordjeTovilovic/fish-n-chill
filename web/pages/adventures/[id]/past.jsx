import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import EntityPastReservations from '../../../components/lists/EntityPastReservations'
import ownerService from '../../../services/owner'
import reservationService from '../../../services/reservation'

const AdventureReservationHistory = () => {
  const router = useRouter()
  const { id } = router.query
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReservations = await reservationService.getAllPastReservationsForAdventure(id)
      setReservations(fetchedReservations)
    }

    if (router.isReady) fetchData()
  }, [router.isReady, id])

  return <EntityPastReservations reservations={reservations} makeReport={ownerService.makeAdventureReport} />
}

export default AdventureReservationHistory
