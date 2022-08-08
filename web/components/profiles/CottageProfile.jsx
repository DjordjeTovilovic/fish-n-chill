import { Container } from '@mui/material'
import CottageProfileCard from '../shared/CottageProfileCard'
import CottageUpdate from '../shared/CottageUpdate'
import ReservationScheduling from '../shared/ReservationScheduling'

const CottageProfile = ({ cottage, entityService }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <CottageProfileCard cottage={cottage} />
        <ReservationScheduling cottage={cottage} entityService={entityService} />
        <CottageUpdate cottage={cottage} />
      </Container>
    </>
  )
}

export default CottageProfile
