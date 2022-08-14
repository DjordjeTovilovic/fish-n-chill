import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dateUtils from '../../utils/dateUtils'
import { useEffect, useState } from 'react'
import Modal from '../modal/Modal'
import { Button } from '@mui/material'
import reservationService from '../../services/reservation'
import { subDays } from 'date-fns'

const ReservationCalendar = ({ entity }) => {
  const [isMakeUnavailableModalOpen, setIsMakeUnavailableModalOpen] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [events, setEvents] = useState([])

  useEffect(() => {
    initCalendar()
  }, [entity])

  const initCalendar = () => {
    const eventInit = entity.reservations.map((reservation) => ({
      id: 'r' + reservation.id,
      title: 'Reservation',
      start: reservation.reservationStart,
      end: dateUtils.fcToEndDate(reservation.reservationEnd),
      overlap: false,
    }))

    entity.actions.map((action) => {
      eventInit.push({
        id: 'a' + action.id,
        title: 'Action',
        start: action.reservationStart,
        end: dateUtils.fcToEndDate(action.reservationEnd),
        color: 'red',
        extendedProps: action,
        editable: true,
      })
    })

    const availablePeriods = dateUtils.getAvailablePeriods(entity)
    availablePeriods.forEach((availablePeriod) => {
      eventInit.push({
        id: entity.id,
        title: 'Available',
        start: availablePeriod.start,
        end: dateUtils.fcToEndDate(availablePeriod.end),
        color: 'green',
      })
    })
    setEvents(eventInit)
  }
  const handleCalendarSelect = (selectedStart, selectedEnd) => {
    setStart(selectedStart)
    setEnd(subDays(selectedEnd, 1))
    changeMakeUnavailableModalState()
  }

  const changeMakeUnavailableModalState = () => {
    setIsMakeUnavailableModalOpen(!isMakeUnavailableModalOpen)
  }

  const handleMakeUnavailable = () => {
    const startDate = dateUtils.toUtcDate(start)
    const endDate = dateUtils.toUtcDate(end)

    const unavailablePeriod = {
      startDate,
      endDate,
      entityId: entity.id,
    }
    reservationService.setUnavailablePeriod(unavailablePeriod)
    // entity.unavailablePeriods.push(unavailablePeriod)
    setIsMakeUnavailableModalOpen(!isMakeUnavailableModalOpen)
  }

  const makeUnavailableModalContent = (
    <div>
      <h3>Do you want to make that period unavailable?</h3>
      <Button onClick={handleMakeUnavailable} variant="contained" color="primary">
        Make period unavailable
      </Button>
    </div>
  )

  const handleEventClick = (e) => {
    console.log(e)
    console.log(dateUtils.getAvailablePeriods(entity))
  }

  const handleSelectedDates = (e) => {
    // if (e.event.title === 'Available') console.log('klewwk')
    if (dateUtils.fcIsRangeBetweenDateRange(e.start, e.end, entity.availabilityStart, entity.availabilityEnd)) {
      handleCalendarSelect(e.start, e.end)
    }
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
        events={events}
        eventDisplay="block"
        displayEventTime={false}
        eventClick={(e) => handleEventClick(e)}
        selectable={true}
        select={(e) => handleSelectedDates(e)}
      />
      <Modal
        content={makeUnavailableModalContent}
        isOpenModal={isMakeUnavailableModalOpen}
        changeModalState={changeMakeUnavailableModalState}
      />
    </div>
  )
}

export default ReservationCalendar
