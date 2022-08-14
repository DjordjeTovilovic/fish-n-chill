import { Container } from '@mui/material'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import ReservationScheduling from '../shared/ReservationScheduling'

const CottageProfile = ({ cottage, scheduleReservation }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <EntityMainProfileInfo entity={cottage} />
        <ReservationScheduling entity={cottage} scheduleReservation={scheduleReservation} />
      </Container>
    </>
  )
}

export default CottageProfile
