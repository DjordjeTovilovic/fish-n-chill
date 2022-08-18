import PastReservationCard from 'components/shared/PastReservationCard'
import SortFilter from 'components/shared/SortFilter'
import TypeFilter from 'components/shared/TypeFilter'

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
  entityType,
  handleTypeFilterChange,
  typeFilterItems,
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
        <TypeFilter handleTypeFilterChange={handleTypeFilterChange} typeFilterItems={typeFilterItems} />
      </div>

      {reservations.length > 0 &&
        reservations.map((reservation, index) => (
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
            entityType={entityType}
          />
        ))}
    </div>
  )
}
export default PastReservations
