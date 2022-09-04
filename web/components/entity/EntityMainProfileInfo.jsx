import { Box, Divider, Typography, Skeleton, Rating, Grid } from '@mui/material'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useMemo } from 'react'

const EntityMainProfileInfo = ({ entity }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import('../shared/Map'), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  )
  return (
    <>
      <Typography variant="h3" mx="auto" align="center" gutterBottom component="div" sx={{ ml: 1, mr: 1 }}>
        {entity.name}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
              marginBottom: 15,
            }}
          >
            {entity.images ? (
              <Image width={600} height={400} layout="fixed" src={entity.images[0].url} alt="entity" />
            ) : (
              <Skeleton variant="rectangular" width={600} height={400} />
            )}
          </div>
          <Typography variant="h5" fontWeight="fontWeightLight" component="div" sx={{ m: 8 }} display="inline">
            {entity.address}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Box textAlign="center" sx={{ my: 3 }}>
            <Rating size="large" name="read-only" value={entity.ratingAverage ?? 0} precision={0.5} readOnly />
            <Typography variant="subtitle1" mx="auto" align="center" gutterBottom component="div" sx={{ ml: 1, mr: 1 }}>
              ({entity.ratingCount} ratings)
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
            Price:
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            fontWeight="fontWeightLight"
            component="div"
            sx={{ mr: 3 }}
            display="inline"
          >
            {(entity.price * (1 - localStorage.getItem('loyaltyPoints') / 1000)).toFixed(2)}€/day
          </Typography>
          <br />
          <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }}>
            Available:
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            sx={{ mr: 3 }}
            fontWeight="fontWeightLight"
            display="inline"
          >
            {entity.availabilityStart !== null && entity.availabilityEnd !== null
              ? `${entity.availabilityStart.toLocaleDateString('en-UK')} - 
                ${entity.availabilityEnd.toLocaleDateString('en-UK')}`
              : 'Curently unavailable'}
          </Typography>
          <br />

          <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }} display="inline">
            Capacity:
          </Typography>
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            fontWeight="fontWeightLight"
            sx={{ mr: 3 }}
            display="inline"
          >
            {entity.capacity} people
          </Typography>
        </Grid>
      </Grid>
      <Divider sx={{ marginY: 6 }} />

      <Typography variant="h5" fontWeight="fontWeightMedium" sx={{ mr: 3 }}>
        Description:
      </Typography>

      <Typography variant="h5" fontWeight="fontWeightLight" gutterBottom component="div" sx={{ mr: 3, mb: 3 }}>
        {entity.description}
      </Typography>
      <Divider sx={{ marginY: 6 }} />
      <Typography variant="h4" fontWeight="fontWeightMedium" component="div" sx={{ mb: 3 }}>
        Where you’ll be
      </Typography>
      <Typography variant="h5" fontWeight="fontWeightLight" component="div" sx={{ mb: 2 }}>
        {entity.address}
      </Typography>
      <Map address={entity.address} />
      <Divider sx={{ marginY: 6 }} />
    </>
  )
}

export default EntityMainProfileInfo
