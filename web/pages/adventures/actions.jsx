import AllActions from 'components/lists/AllActions'
import { useState, useEffect } from 'react'
import adventureActionService from 'services/adventureAction'
import reservationService from 'services/reservation'

const AdventureActions = () => {
  const [actions, setActions] = useState([])

  useEffect(() => {
    adventureActionService
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
      .scheduleAdventureReservation(actionReservation)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Adventure Actions</h1>
      <AllActions actions={actions} scheduleAction={scheduleAction} />
    </>
  )
}
export default AdventureActions
