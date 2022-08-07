import PastReservations from '../../components/lists/PastReservations'
import { useState, useEffect } from 'react'
import reservationService from '../../services/reservation'
const ReservationHistory = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    reservationService.getAllPastCottageReservationsForClient()
      .then((gotReservations) => {
        setReservations(gotReservations)
        console.log(gotReservations)
      })
      .catch((err) => console.log(err))
  }, [])

  return <PastReservations reservations={reservations} />
}

export default ReservationHistory;