import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import dateUtils from '../../utils/dateUtils'
import { useState } from 'react'
import Modal from '../modal/Modal'
import { Button } from '@mui/material'
import reservationService from '../../services/reservation'
import { subDays } from 'date-fns'
import addDays from 'date-fns/addDays'

const ReservationCalendar = ({ entity }) => {
  const [isMakeUnavailableModalOpen, setIsMakeUnavailableModalOpen] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')

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

  const events = entity.reservations.map((reservation) => ({
    id: 'r' + reservation.id,
    title: 'Reservation',
    start: reservation.reservationStart,
    end: addDays(reservation.reservationEnd, 1),
    overlap: false,
    // allDay: false,
  }))

  entity.actions.map((action) => {
    events.push({
      id: 'a' + action.id,
      title: 'Action',
      start: action.reservationStart,
      end: addDays(action.reservationEnd, 1),
      color: 'red',
      extendedProps: action,
      editable: true,
      // allDay: false,
    })
  })

  const availablePeriods = dateUtils.getAvailablePeriods(entity)
  availablePeriods.forEach((availablePeriod) => {
    events.push({
      id: entity.id,
      title: 'Available',
      start: availablePeriod.start,
      end: addDays(availablePeriod.end, 1),
      color: 'green',
      // selectable: true,
      // allDay: false,
    })
  })

  const handleEventClick = (e) => {
    console.log(e)
    console.log(dateUtils.getAvailablePeriods(entity))
  }

  const handleSelectedDates = (e) => {
    // if (e.event.title === 'Available') console.log('klewwk')
    if (dateUtils.fcIsRangeBetweenDateRange(e.start, e.end, entity.availabilityStart, entity.availabilityEnd)) {
      console.log('keke')
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
