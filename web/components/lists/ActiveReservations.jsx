import ActiveReservationCard from 'components/shared/ActiveReservationCard'

const ActiveReservations = ({ reservations, cancelReservation }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <h1>Active Reservations</h1>
      {reservations.map((reservation, index) => (
        <ActiveReservationCard
          key={reservation.id}
          reservation={reservation}
          index={index}
          cancelReservation={cancelReservation}
        />
      ))}
    </div>
  )
}
export default ActiveReservations
