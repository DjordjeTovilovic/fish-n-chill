import { Container } from '@mui/material'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import CottageUpdate from '../cottage/CottageUpdate'
import ReservationScheduling from '../shared/ReservationScheduling'
import ReservationCalendar from '../entity/ReservationCalendar'

const OwnedCottageProfile = ({ cottage, scheduleReservation }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <EntityMainProfileInfo entity={cottage} />
        <ReservationScheduling entity={cottage} scheduleReservation={scheduleReservation} />
        <CottageUpdate cottage={cottage} />
        <ReservationCalendar entity={cottage} />
      </Container>
    </>
  )
}

export default OwnedCottageProfile
