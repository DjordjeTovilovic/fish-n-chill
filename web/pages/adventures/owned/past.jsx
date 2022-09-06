import { useEffect, useState } from 'react'
import EntityPastReservations from '../../../components/lists/EntityPastReservations'
import ownerService from '../../../services/owner'

const CottageReservationHistory = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReservations = await ownerService.getAllPastAdventureOwnerReservations()
      setReservations(fetchedReservations)
    }

    fetchData()
  }, [])

  return <EntityPastReservations reservations={reservations} makeReport={ownerService.makeAdventureReport} />
}

export default CottageReservationHistory
