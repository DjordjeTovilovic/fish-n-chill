import { Box, Paper } from '@mui/material'
import AdventureProfileInfo from 'components/adventure/AdventureProfileInfo'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import ReservationScheduling from '../shared/ReservationScheduling'

const AdventureProfile = ({ adventure, scheduleReservation }) => {
  return (
    <>
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
          <EntityMainProfileInfo entity={adventure} />
          <AdventureProfileInfo entity={adventure} />
          <ReservationScheduling entity={adventure} scheduleReservation={scheduleReservation} type={'ADVENTURE'} />
        </Paper>
      </Box>
    </>
  )
}

export default AdventureProfile
