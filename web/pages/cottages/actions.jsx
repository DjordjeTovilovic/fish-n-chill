import AllActions from 'components/lists/AllActions'
import { useState, useEffect } from 'react'
import cottageActionService from 'services/cottagesAction'
import reservationService from 'services/reservation'

const CottageActions = () => {
  const [actions, setActions] = useState([])

  useEffect(() => {
    cottageActionService
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
      .scheduleCottageReservation(actionReservation)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }
  return (
    <>
      <h1 style={{ textAlign: 'center' }}>Cottage Actions</h1>
      <AllActions actions={actions} scheduleAction={scheduleAction} />
    </>
  )
}
export default CottageActions
