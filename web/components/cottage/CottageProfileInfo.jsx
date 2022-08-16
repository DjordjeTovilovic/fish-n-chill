import { Bed } from '@mui/icons-material'
import { Card, Divider, Grid, Typography } from '@mui/material'

const CottageProfileInfo = ({ entity }) => {
  return (
    <>
      {entity.rooms.length > 0 && (
        <>
          <Typography variant="h4" fontWeight="fontWeightMedium" component="div" sx={{ mb: 3 }}>
            Where you’ll sleep
          </Typography>
          <Grid container spacing={2}>
            {entity.rooms.map((room, index) => (
              <Grid key={room.id} item xs={3}>
                <Card style={{ padding: 30 }}>
                  <Typography variant="h5" fontWeight="fontWeightMedium" component="div" sx={{ mb: 2 }}>
                    Bedroom {index + 1}
                  </Typography>
                  {[...Array(room.numberOfBeds).keys()].map((i) => (
                    <Bed fontSize="large" key={i} />
                  ))}
                  <Typography variant="h5" fontWeight="fontWeightLight" component="div" sx={{ mt: 1 }}>
                    {`${room.numberOfBeds} beds`}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ marginY: 6 }} />
        </>
      )}
    </>
  )
}

export default CottageProfileInfo
