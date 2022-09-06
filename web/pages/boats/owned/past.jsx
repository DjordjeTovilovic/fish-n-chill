import { useEffect, useState } from 'react'
import EntityPastReservations from '../../../components/lists/EntityPastReservations'
import ownerService from '../../../services/owner'

const CottageReservationHistory = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReservations = await ownerService.getAllPastBoatOwnerReservations()
      setReservations(fetchedReservations)
    }

    fetchData()
  }, [])

  return <EntityPastReservations reservations={reservations} makeReport={ownerService.makeBoatReport} />
}

export default CottageReservationHistory
