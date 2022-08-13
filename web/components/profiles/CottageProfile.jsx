import { Container } from '@mui/material'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import ReservationCalendar from '../entity/ReservationCalendar'
import ReservationScheduling from '../shared/ReservationScheduling'

const CottageProfile = ({ cottage, scheduleReservation }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <EntityMainProfileInfo entity={cottage} />
        <ReservationScheduling entity={cottage} scheduleReservation={scheduleReservation} />
        <ReservationCalendar entity={cottage} />
      </Container>
    </>
  )
}

export default CottageProfile
