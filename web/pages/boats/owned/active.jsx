import { useEffect, useState } from 'react'
import OwnerActiveReservations from '../../../components/cottage/OwnerActiveReservations'
import ownerService from '../../../services/owner'
import reservationService from '../../../services/reservation'
import dateUtils from '../../../utils/dateUtils'

const ActiveOwnerBoatReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let fetchedReservations = await ownerService.getAllActiveBoatOwnerReservations()
      fetchedReservations = dateUtils.reservationListFieldsToDate(fetchedReservations)
      setReservations(fetchedReservations)
    }

    fetchData()
  }, [])

  return (
    <OwnerActiveReservations
      reservations={reservations}
      scheduleReservation={reservationService.scheduleBoatReservation}
    />
  )
}

export default ActiveOwnerBoatReservations
