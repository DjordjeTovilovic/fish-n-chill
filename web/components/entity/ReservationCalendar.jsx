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
import { useSnackbar } from 'notistack'

const ReservationCalendar = ({ entity, updateEntity }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [isMakeUnavailableModalOpen, setIsMakeUnavailableModalOpen] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [events, setEvents] = useState([])

  useEffect(() => {
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
    initCalendar()
  }, [entity])

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

    // Trebalo bi awaitovati i vidjeti da li je prosao zahtjev uspjesno, ali me mrzi
    reservationService.setUnavailablePeriod(unavailablePeriod)
    // Ako datumi ostaju na frontu ne treba prebacivati u utc jer zapravo ne mjenjamo vrmenesku
    // zonu nego samo oduzimamo razliku izmedju vremenskih zona
    const entityFieldsToUpdate = {
      unavailablePeriods: [...entity.unavailablePeriods, { startDate: start, endDate: end }],
    }
    updateEntity(entityFieldsToUpdate)
    setIsMakeUnavailableModalOpen(!isMakeUnavailableModalOpen)
    enqueueSnackbar('Unavailable period set', { variant: 'success' })
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
    // if (e.event.title === 'Available') console.log('klewwk')
  }

  const handleSelectedDates = (e) => {
    if (dateUtils.fcIsSelectedInAvailableDates(e.start, e.end, entity)) {
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
