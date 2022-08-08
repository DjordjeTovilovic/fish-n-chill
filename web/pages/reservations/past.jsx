import PastReservations from '../../components/lists/PastReservations'
import { useState, useEffect } from 'react'
import reservationService from '../../services/reservation'
import clientService from '../../services/client'
import ratingService from '../../services/rating'

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([])
  const [ratings, setRatings] = useState([])
  const [ratingsProp, setRatingsProp] = useState([])
  const [beginingRatings, setBeginingRatings] = useState([])
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    clientService
      .getRatings()
      .then((gotRatings) => {
        setRatings(gotRatings)
        reservationService
          .getAllPastCottageReservationsForClient()
          .then((gotReservations) => {
            setReservations(gotReservations)
            let ratingss = new Array(gotReservations.length).fill(0)
            gotReservations.forEach((reservation, index) => {
              gotRatings.forEach((rating) => {
                if (reservation.cottage.id === rating.entity.id) ratingss[index] = rating.rating
              })
            })
            setRatingsProp(ratingss)
            setBeginingRatings(ratingss)
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
  }, [])

  const changeRating = (value, index) => {
    let ratingss = ratingsProp.slice(0, ratingsProp.length)
    ratingss[index] = value
    setRatingsProp(ratingss)
  }

  const rateEntity = (entityId, ratingValue) => {
    const ratingInfo = {
      client_id: reservations[0].clientId,
      entity_id: entityId,
      rating: ratingValue,
    }
    ratingService
      .rateEntity(ratingInfo)
      .then(() => setStatusMessage('Rating changed! Refresh page!'))
      .catch((err) => console.log(err))
  }

  if (ratingsProp.length !== 0)
    return (
      <PastReservations
        reservations={reservations}
        ratingsProp={ratingsProp}
        changeRating={changeRating}
        rateEntity={rateEntity}
        beginingRatings={beginingRatings}
        statusMessage={statusMessage}
      />
    )
  else return <></>
}

export default ReservationHistory
