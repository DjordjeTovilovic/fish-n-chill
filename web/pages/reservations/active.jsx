import ActiveReservations from '../../components/lists/ActiveReservations'
import { useState, useEffect } from 'react'
import reservationService from '../../services/reservation'
const CurrentReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    reservationService.getAllActiveCottageReservationsForClient()
      .then((gotReservations) => {
        setReservations(gotReservations)
      })
      .catch((err) => console.log(err))
  }, [])

  return <ActiveReservations reservations={reservations} />
}

export default CurrentReservations;