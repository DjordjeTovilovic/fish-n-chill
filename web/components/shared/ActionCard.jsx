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
import { useEffect, useState } from 'react'

const ActionCard = ({ action, scheduleAction, entities }) => {
  const [penalty, setPenalty] = useState(null)
  const [color, setColor] = useState('red')
  useEffect(() => {
    setPenalty(JSON.parse(window.localStorage.getItem('penalty')))
    if (((action.actualPrice - action.actionPrice) / action.actualPrice).toFixed(2) <= 1) setColor('red')
    if (((action.actualPrice - action.actionPrice) / action.actualPrice).toFixed(2) < 0.75) setColor('orange')
    if (((action.actualPrice - action.actionPrice) / action.actualPrice).toFixed(2) < 0.5) setColor('yellow')
    if (((action.actualPrice - action.actionPrice) / action.actualPrice).toFixed(2) < 0.25) setColor('green')
  }, [])
  return (
    <Grid item xs={12} sm={6} md={4}>
      <div
        style={{
          width: 'fit-content',
          height: 'fit-content',
          paddingLeft: '3px',
          paddingRight: '3px',
          textAlign: 'center',
          lineHeight: '35px',
          position: 'relative',
          marginLeft: '-12px',
          zIndex: 1,
          color: 'white',
          backgroundColor: color,
          borderRadius: '50%',
          transform: 'rotate(-35deg)',
        }}
      >
        -{((action.actualPrice - action.actionPrice) / action.actualPrice).toFixed(2) * 100}%
      </div>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', mt: '-20px' }}>
        <CardMedia
          component="img"
          sx={{
            pt: '0%',
          }}
          image={action.entity.images[0].url}
          alt="random"
        />
        <CardContent>
          <Typography borderBottom={1} gutterBottom variant="h5" component="h2" align="center">
            {action.entity.name}
          </Typography>
          <Typography variant="subtitle2" align="center">
            {action.entity.address}
          </Typography>
          <Typography variant="subtitle2" component="div" align="center">
            {new Date(action.reservationStart).toLocaleDateString('en-UK') ?? '#Not available#'}-
            {new Date(action.reservationEnd).toLocaleDateString('en-UK') ?? '#Not available#'}
          </Typography>
          <Typography color="red" variant="subtitle2" component="div" align="center">
            Expires: {new Date(action.actionEnd).toLocaleDateString('en-UK') ?? '#Not available#'}
          </Typography>
          <Divider variant="middle" />
          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 4,
            }}
          >
            {action.entity.description}
          </Typography>
          <Divider variant="middle" />
        </CardContent>
        <Box
          component="div"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            mt: '-15px',
          }}
        >
          <Box component="div">
            <Typography
              style={{ textDecorationLine: 'line-through', textDecorationColor: 'black' }}
              variant="subtitle2"
              align="left"
              sx={{ ml: 2 }}
              display="inline"
              color="red"
            >
              {action.actualPrice}€
            </Typography>
            <Typography variant="subtitle2" align="left" display="inline">
              {` -> `}
            </Typography>
            <Typography variant="subtitle2" align="left" display="inline" color="green">
              {action.actionPrice}€
            </Typography>
            <Typography variant="subtitle2" display="inline" sx={{ ml: 15 }}>
              {action.numberOfGuests}&#128100;
            </Typography>
            <Rating name="read-only" value={action.entity.ratingAverage ?? 0} precision={0.5} readOnly sx={{ ml: 1 }} />
          </Box>
          <CardActions sx={{ display: 'flex' }}>
            <Button size="small" href={`/${entities}/${action.entity.id}`} variant="contained">
              View
            </Button>
            {window.localStorage.getItem('role') === 'ROLE_CLIENT' && (
              <Button
                size="small"
                color="warning"
                disabled={penalty >= 3}
                onClick={() => scheduleAction(action)}
                variant="contained"
                style={{ marginLeft: 40 }}
              >
                Schedule action
              </Button>
            )}
          </CardActions>
        </Box>
      </Card>
    </Grid>
  )
}

export default ActionCard
