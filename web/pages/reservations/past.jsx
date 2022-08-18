import PastReservations from '../../components/lists/PastReservations'
import { useState, useEffect } from 'react'
import reservationService from '../../services/reservation'
import clientService from '../../services/client'
import ratingService from '../../services/rating'
import dateUtils from 'utils/dateUtils'

const ReservationHistory = () => {
  const [reservations, setReservations] = useState([])
  const [ratingsProp, setRatingsProp] = useState([])
  const [beginingRatings, setBeginingRatings] = useState([])
  const [statusMessage, setStatusMessage] = useState('')
  const [submitStatusMessage, setSubmitStatusMessage] = useState('')
  const [sortFilterItems, setSortFilterItems] = useState(['Name', 'Duration', 'Price'])
  const [ratings, setRatings] = useState([])

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
                if (reservation.entity.id === rating.entity.id) ratingss[index] = rating.rating
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

  const submitResponse = (clientResponse) => {
    if (clientResponse.isRevision)
      clientService
        .writeRevision(clientResponse)
        .then(() => setSubmitStatusMessage('Revision submited!'))
        .catch((err) => console.log(err))
    else
      clientService
        .writeComplaint(clientResponse)
        .then(() => setSubmitStatusMessage('Complaint submited!'))
        .catch((err) => console.log(err))
  }

  const handleSortFilterChange = (e) => {
    let newReservations
    switch (e.target.value) {
      case 'name': {
        newReservations = [...reservations.sort((a, b) => a.entity.name.localeCompare(b.entity.name))]
        break
      }
      case 'duration': {
        newReservations = [
          ...reservations.sort(
            (a, b) =>
              dateUtils.daysBetween(new Date(b.reservationEnd), new Date(b.reservationStart)) -
              dateUtils.daysBetween(new Date(a.reservationEnd), new Date(a.reservationStart))
          ),
        ]
        break
      }
      case 'price': {
        newReservations = [...reservations.sort((a, b) => a.price - b.price)]
        break
      }
      default: {
        break
      }
    }
    setReservations(newReservations)
    let ratingss = new Array(newReservations.length).fill(0)
    newReservations.forEach((reservation, index) => {
      ratings.forEach((rating) => {
        if (reservation.entity.id === rating.entity.id) ratingss[index] = rating.rating
      })
    })
    setRatingsProp(ratingss)
    setBeginingRatings(ratingss)
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
        submitResponse={submitResponse}
        submitStatusMessage={submitStatusMessage}
        handleSortFilterChange={handleSortFilterChange}
        sortFilterItems={sortFilterItems}
        entityType={'Entity'}
      />
    )
  else return <></>
}

export default ReservationHistory
