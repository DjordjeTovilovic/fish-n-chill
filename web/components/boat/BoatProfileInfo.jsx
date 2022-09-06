import { Typography } from '@mui/material'

const BoatProfileInfo = ({ entity }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <Typography variant="h4" fontWeight="fontWeightMedium" component="div" sx={{ mb: 3 }}>
        Boat specification
      </Typography>
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Boat type:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {entity.boatSpecification.boatType}
      </Typography>
      <br />
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Length:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {entity.boatSpecification.length}m
      </Typography>
      <br />
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Engine model:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {entity.boatSpecification.engineModel}
      </Typography>
      <br />
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Engine power:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {entity.boatSpecification.enginePower}hp
      </Typography>
      <br />
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Maximum speed:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {entity.boatSpecification.maxSpeed}km/h
      </Typography>
    </div>
  )
}
export default BoatProfileInfo
