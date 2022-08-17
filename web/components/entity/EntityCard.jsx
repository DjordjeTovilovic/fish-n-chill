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
import { useRouter } from 'next/router'

const EntityCard = ({ entity }) => {
  const { asPath } = useRouter()

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia
          component="img"
          sx={{
            pt: '0%',
          }}
          image={entity.images[0].url}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography borderBottom={1} gutterBottom variant="h5" component="h2" align="center">
            {entity.name}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {entity.address}
          </Typography>
          <Typography variant="subtitle2" component="div" align="center">
            {new Date(entity.availabilityStart).toLocaleDateString('en-UK') ?? '#Not available#'}-
            {new Date(entity.availabilityEnd).toLocaleDateString('en-UK') ?? '#Not available#'}
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
            {entity.description}
          </Typography>
          <Divider variant="middle" />
        </CardContent>
        <Box>
          <Typography variant="subtitle2" align="left" sx={{ ml: 1 }} display="inline">
            {entity.price}€/day
          </Typography>
          <Typography variant="subtitle2" display="inline" sx={{ ml: 18 }}>
            {entity.capacity}&#128100;
          </Typography>
        </Box>
        <CardActions>
          <Button size="small" href={asPath + '/' + entity.id} variant="contained">
            View
          </Button>
          <Rating name="read-only" value={entity.ratingAverage ?? 0} precision={0.5} readOnly sx={{ ml: 7 }} />
        </CardActions>
      </Card>
    </Grid>
  )
}

export default EntityCard
