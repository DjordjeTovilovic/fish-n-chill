import { Container } from '@mui/material'
import EntityMainProfileInfo from '../shared/EntityMainProfileInfo'
import ReservationScheduling from '../shared/ReservationScheduling'

const BoatProfile = ({ boat, scheduleReservation }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <EntityMainProfileInfo entity={boat} />
        <ReservationScheduling entity={boat} scheduleReservation={scheduleReservation} />
      </Container>
    </>
  )
}
export default BoatProfile
