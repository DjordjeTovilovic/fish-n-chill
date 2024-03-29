import { Box, Paper } from '@mui/material'
import BoatProfileInfo from 'components/boat/BoatProfileInfo'
import EntityMainProfileInfo from '../entity/EntityMainProfileInfo'
import ReservationScheduling from '../shared/ReservationScheduling'

const BoatProfile = ({ boat, scheduleReservation }) => {
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
          <EntityMainProfileInfo entity={boat} />
          <BoatProfileInfo entity={boat} />
          <ReservationScheduling entity={boat} scheduleReservation={scheduleReservation} type={'BOAT'} />
        </Paper>
      </Box>
    </>
  )
}
export default BoatProfile
