import ActiveReservations from '../../components/lists/ActiveReservations'
import { useState, useEffect } from 'react'
import reservationService from '../../services/reservation'
const CurrentReservations = () => {
  const [reservations, setReservations] = useState([])
  const [typeFilterItems, setTypeFilterItems] = useState(['Adventure', 'Boat', 'Cottage'])
  const [entityType, setEntityType] = useState('ADVENTURE')

  useEffect(() => {
    reservationService
      .getAllActiveAdventureReservationsForClient()
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

  const handleTypeFilterChange = (e) => {
    switch (e.target.value) {
      case 'adventure': {
        reservationService
          .getAllActiveAdventureReservationsForClient()
          .then((gotReservations) => {
            setReservations(gotReservations)
            setEntityType(e.target.value.toUpperCase())
          })
          .catch((err) => console.log(err))
        break
      }
      case 'boat': {
        reservationService
          .getAllActiveBoatReservationsForClient()
          .then((gotReservations) => {
            setReservations(gotReservations)
            setEntityType(e.target.value.toUpperCase())
          })
          .catch((err) => console.log(err))
        break
      }

      case 'cottage': {
        reservationService
          .getAllActiveCottageReservationsForClient()
          .then((gotReservations) => {
            setReservations(gotReservations)
            setEntityType(e.target.value.toUpperCase())
          })
          .catch((err) => console.log(err))
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <ActiveReservations
      reservations={reservations}
      cancelReservation={cancelReservation}
      typeFilterItems={typeFilterItems}
      entityType={entityType}
      handleTypeFilterChange={handleTypeFilterChange}
    />
  )
}

export default CurrentReservations
