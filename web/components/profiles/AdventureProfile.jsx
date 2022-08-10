import { Container } from '@mui/system'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import ReservationScheduling from '../shared/ReservationScheduling'

const AdventureProfile = ({ adventure, scheduleReservation }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <EntityMainProfileInfo entity={adventure} />
        <ReservationScheduling entity={adventure} scheduleReservation={scheduleReservation} />
      </Container>
    </>
  )
}

export default AdventureProfile
