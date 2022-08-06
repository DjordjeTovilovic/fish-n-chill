import React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'

const CottageCard = ({ cottage }) => {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          sx={{
            pt: '0%',
          }}
          image={cottage.images[0].url}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography borderBottom={1} gutterBottom variant="h5" component="h2" align="center">
            {cottage.name}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {cottage.address}
          </Typography>
          <Typography variant="subtitle2" component="div" align="center">
            {new Date(cottage.availabilityStart).toLocaleDateString('en-UK') ?? '#Not available#'}-
            {new Date(cottage.availabilityEnd).toLocaleDateString('en-UK') ?? '#Not available#'}
          </Typography>
          <Divider variant="middle" sx={{ mb: 0.5 }} />

          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
            }}
          >
            {cottage.description}
          </Typography>
          <Divider variant="middle" />
        </CardContent>
        <Box>
          <Typography variant="subtitle2" align="left" sx={{ ml: 1 }} display="inline">
            {cottage.price}€/day
          </Typography>
          <Typography variant="subtitle2" display="inline" sx={{ ml: 18 }}>
            {cottage.capacity}&#128100;
          </Typography>
        </Box>
        <CardActions>
          <Button size="small" href={'cottages/' + cottage.id} variant="contained">
            View
          </Button>
          <Rating name="read-only" value={cottage.ratingAverage ?? 0} precision={0.5} readOnly sx={{ ml: 7 }} />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default CottageCard
