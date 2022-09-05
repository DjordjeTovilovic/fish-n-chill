import { Box, Container, Paper } from '@mui/material'
import CottageProfileInfo from '../cottage/CottageProfileInfo'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import ReservationScheduling from '../shared/ReservationScheduling'

const CottageProfile = ({ cottage, scheduleReservation }) => {
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
            <ReservationScheduling entity={cottage} scheduleReservation={scheduleReservation} type={'COTTAGE'} />
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default CottageProfile
