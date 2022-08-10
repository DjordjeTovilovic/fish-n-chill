import { Box, Divider, Typography, Skeleton, Paper, Rating } from '@mui/material'
import Image from 'next/image'

const EntityMainProfileInfo = ({ entity }) => {
  return (
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
        <Typography variant="h3" mx="auto" align="center" gutterBottom component="div" sx={{ ml: 1, mr: 1 }}>
          {entity.name}
        </Typography>
        <Box textAlign="center">
          <Rating size="large" name="read-only" value={entity.ratingAverage ?? 0} precision={0.5} readOnly />
          <Typography variant="subtitle1" mx="auto" align="center" gutterBottom component="div" sx={{ ml: 1, mr: 1 }}>
            ({entity.ratingCount} ratings)
          </Typography>
        </Box>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          {entity.images ? (
            <Image width={600} height={400} src={entity.images[0].url} alt="entity" />
          ) : (
            <Skeleton variant="rectangular" width={600} height={400} />
          )}
        </div>

        <Divider variant="middle" sx={{ mt: 1 }} />
        <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
          Address:
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
          {entity.address}
        </Typography>
        <div></div>
        <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
          Price:
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
          {entity.price}€/day
        </Typography>
        <div></div>
        <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
          Available:
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
          {entity.availabilityStart.toLocaleDateString('en-UK')}
        </Typography>
        <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 2 }} display="inline">
          -
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
          {entity.availabilityEnd.toLocaleDateString('en-UK')}
        </Typography>
        <div></div>
        <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
          Capacity:
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
          {entity.capacity} people
        </Typography>
        <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }}>
          Description:
        </Typography>
        <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3, mb: 3 }}>
          {entity.description}
        </Typography>
      </Paper>
    </Box>
  )
}

export default EntityMainProfileInfo
