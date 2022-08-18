import ActiveReservations from '../../components/lists/ActiveReservations'
import { useState, useEffect } from 'react'
import reservationService from '../../services/reservation'
const CurrentReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    reservationService
      .getAllActiveCottageReservationsForClient()
      .then((gotReservations) => {
        setReservations(gotReservations)
      })
      .catch((err) => console.log(err))
  }, [])

  const removeCanceledReservation = (index) => {
    let newReservations = [...reservations]
    newReservations.splice(index, 1)
    setReservations(newReservations)
  }

  const cancelReservation = (reservationId, index) => {
    if (confirm('Confirm reservation cancelation!')) removeCanceledReservation(index)
    reservationService
      .cancelReservation(reservationId)
      .then(() => removeCanceledReservation(index))
      .catch((err) => console.log(err))
  }

  return <ActiveReservations reservations={reservations} cancelReservation={cancelReservation} />
}

export default CurrentReservations
