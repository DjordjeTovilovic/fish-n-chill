import { Container } from '@mui/material'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import CottageUpdate from '../cottage/CottageUpdate'
import ReservationCalendar from '../entity/ReservationCalendar'

const OwnedCottageProfile = ({ cottage, updateEntity }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <EntityMainProfileInfo entity={cottage} />
        <CottageUpdate cottage={cottage} updateEntity={updateEntity} />
        <ReservationCalendar entity={cottage} updateEntity={updateEntity} />
      </Container>
    </>
  )
}

export default OwnedCottageProfile
