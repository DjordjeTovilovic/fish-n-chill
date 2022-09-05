import { Typography } from '@mui/material'

const AdventureProfileInfo = ({ entity }) => {
  console.log(entity)
  return (
    <>
      <Typography variant="h4" fontWeight="fontWeightMedium" component="div" sx={{ mb: 3 }}>
        You adventure guide
      </Typography>
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Boat type:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {`${entity.owner.firstName} ${entity.owner.lastName}`}
      </Typography>
      <br />
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Email:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {entity.owner.email}
      </Typography>
      <br />
      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
        Phone number:
      </Typography>
      <Typography variant="h5" gutterBottom fontWeight="fontWeightLight" component="div" display="inline">
        {entity.owner.phoneNumber ? entity.owner.phoneNumber : '--not available--'}
      </Typography>
    </>
  )
}
export default AdventureProfileInfo
