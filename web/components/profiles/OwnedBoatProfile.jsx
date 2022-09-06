import { Box, Container, Paper } from '@mui/material'
import BoatUpdate from '../boat/BoatUpdate'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import ReservationCalendar from '../entity/ReservationCalendar'

const OwnedBoatProfile = ({ entity, updateEntity }) => {
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
            <EntityMainProfileInfo entity={entity} />
            <BoatUpdate entity={entity} updateEntity={updateEntity} />
            <ReservationCalendar entity={entity} updateEntity={updateEntity} />
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default OwnedBoatProfile
