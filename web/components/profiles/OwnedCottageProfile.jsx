import { Box, Container, Paper } from '@mui/material'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import CottageUpdate from '../cottage/CottageUpdate'
import ReservationCalendar from '../entity/ReservationCalendar'
import CottageProfileInfo from '../cottage/CottageProfileInfo'

const OwnedCottageProfile = ({ cottage, updateEntity }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 8,
          }}
        >
          <Paper
            sx={{
              padding: 3,
            }}
          >
            <EntityMainProfileInfo entity={cottage} />
            <CottageProfileInfo entity={cottage} />
            <CottageUpdate cottage={cottage} updateEntity={updateEntity} />
            <ReservationCalendar entity={cottage} updateEntity={updateEntity} />
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default OwnedCottageProfile
