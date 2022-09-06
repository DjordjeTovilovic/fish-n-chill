import { useEffect, useState } from 'react'
import OwnerActiveReservations from '../../../components/cottage/OwnerActiveReservations'
import ownerService from '../../../services/owner'
import reservationService from '../../../services/reservation'
import dateUtils from '../../../utils/dateUtils'

const ActiveOwnerAdventureReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let fetchedReservations = await ownerService.getAllActiveAdventureOwnerReservations()
      fetchedReservations = dateUtils.reservationListFieldsToDate(fetchedReservations)
      setReservations(fetchedReservations)
    }

    fetchData()
  }, [])

  return (
    <OwnerActiveReservations
      reservations={reservations}
      scheduleReservation={reservationService.scheduleAdventureReservation}
    />
  )
}

export default ActiveOwnerAdventureReservations
