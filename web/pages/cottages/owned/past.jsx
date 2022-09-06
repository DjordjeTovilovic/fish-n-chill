import { useEffect, useState } from 'react'
import CottagePastReservations from '../../../components/lists/EntityPastReservations'
import ownerService from '../../../services/owner'

const CottageReservationHistory = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReservations = await ownerService.getAllPastCottageOwnerReservations()
      setReservations(fetchedReservations)
    }

    fetchData()
  }, [])

  return <CottagePastReservations reservations={reservations} makeReport={ownerService.makeCottageReport} />
}

export default CottageReservationHistory
