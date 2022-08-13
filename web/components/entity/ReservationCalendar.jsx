import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dateUtils from '../../utils/dateUtils'

const ReservationCalendar = ({ entity }) => {
  const events = entity.reservations.map((reservation) => ({
    id: 'r' + reservation.id,
    title: 'Reservation',
    start: reservation.reservationStart,
    end: reservation.reservationEnd,
    // overlap: false,
    allDay: false,
  }))

  entity.actions.map((action) => {
    console.log(entity.availabilityEnd)
    events.push({
      id: 'a' + action.id,
      title: 'Action',
      start: action.reservationStart,
      end: action.reservationEnd,
      color: 'red',
      extendedProps: action,
      // editable: true,
      startEditable: true,
      durationEditable: true,
      allDay: false,
    })
  })

  events.push({
    id: entity.id,
    title: 'Available',
    start: entity.availabilityStart,
    end: entity.availabilityEnd,
    color: 'green',
    selectable: true,
    allDay: false,
  })

  const handleEventClick = (e) => {
    console.log(e)
    if (e.event.title === 'Available') console.log('klewwk')
  }

  const handleSelectedDates = (e) => {
    // console.log(entity.availabilityStart)
    console.log(e.start)
    console.log(e.end)
    if (dateUtils.isBetweenDateRange(e.start, entity.availabilityStart, entity.availabilityEnd)) console.log('keke')
  }
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        aspectRatio={1.2}
        headerToolbar={{
          center: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        initialView="dayGridMonth"
        allDayDefault={false}
        nextDayThreshold="00:00:00"
        events={events}
        displayEventTime={false}
        // eventBackgroundColor="red"
        // eventDisplay="background"
        eventClick={(e) => handleEventClick(e)}
        selectable={true}
        select={(e) => handleSelectedDates(e)}
      />
    </div>
  )
}

export default ReservationCalendar
