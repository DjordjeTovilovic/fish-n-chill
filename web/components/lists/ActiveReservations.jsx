import ActiveReservationCard from 'components/shared/ActiveReservationCard'
import TypeFilter from 'components/shared/TypeFilter'

const ActiveReservations = ({
  reservations,
  cancelReservation,
  entityType,
  typeFilterItems,
  handleTypeFilterChange,
}) => {
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
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TypeFilter handleTypeFilterChange={handleTypeFilterChange} typeFilterItems={typeFilterItems} />
      </div>
      {reservations.map((reservation, index) => (
        <ActiveReservationCard
          key={reservation.id}
          reservation={reservation}
          index={index}
          cancelReservation={cancelReservation}
          entityType={entityType}
        />
      ))}
    </div>
  )
}
export default ActiveReservations
