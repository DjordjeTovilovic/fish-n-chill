import AllActions from 'components/lists/AllActions'
import { useState, useEffect } from 'react'
import boatActionService from 'services/boatAction'
import reservationService from 'services/reservation'

const BoatActions = () => {
  const [actions, setActions] = useState([])

  useEffect(() => {
    boatActionService
      .getAllActiveActions()
      .then((gotActions) => setActions(gotActions))
      .catch((err) => console.log(err))
  }, [])

  const scheduleAction = (action) => {
    const actionReservation = {
      actionId: action.id,
      reservationStart: action.reservationStart,
      reservationEnd: action.reservationEnd,
      numberOfGuests: action.numberOfGuests,
      price: action.actionPrice,
      entityId: action.entity.id,
    }
    reservationService
      .scheduleReservation(actionReservation)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Boat Actions</h1>
      <AllActions actions={actions} scheduleAction={scheduleAction} entities={'boats'}></AllActions>
    </>
  )
}
export default BoatActions
