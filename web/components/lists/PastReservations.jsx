import PastReservationCard from 'components/shared/PastReservationCard'
import SortFilter from 'components/shared/SortFilter'

const PastReservations = ({
  reservations,
  ratingsProp,
  changeRating,
  rateEntity,
  beginingRatings,
  statusMessage,
  submitResponse,
  submitStatusMessage,
  handleSortFilterChange,
  sortFilterItems,
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
      <h1>Reservation history</h1>
      <div
        style={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SortFilter handleSortFilterChange={handleSortFilterChange} sortFilterItems={sortFilterItems} />
      </div>

      {reservations.map((reservation, index) => (
        <PastReservationCard
          key={reservation.id}
          reservation={reservation}
          index={index}
          ratingsProp={ratingsProp}
          changeRating={changeRating}
          rateEntity={rateEntity}
          beginingRatings={beginingRatings}
          statusMessage={statusMessage}
          submitResponse={submitResponse}
          submitStatusMessage={submitStatusMessage}
        />
      ))}
    </div>
  )
}
export default PastReservations
