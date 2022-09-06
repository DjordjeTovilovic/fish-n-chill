import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import CardActions from '@mui/material/CardActions'
import Button from '@mui/material/Button'

const InactiveOwners = ({ users, handleConfirm, handleDelete }) => {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <h1> Owner requests</h1>
      </div>
      {users.map((user) => (
        <Card sx={{ my: 3, display: 'flex', width: '95%', height: '170px' }} key={user.id}>
          <CardMedia component="img" sx={{ width: 170, height: '100%' }} />
          <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
            <Typography borderBottom={1} gutterBottom variant="h5" align="left">
              User
            </Typography>
            <Typography gutterBottom variant="h5" align="left">
              Name : {user.firstName}
            </Typography>
            <Typography gutterBottom variant="h5" align="left">
              LastName : {user.lastName}
            </Typography>
          </CardContent>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
            <Typography borderBottom={1} gutterBottom variant="h5" align="left">
              Information
            </Typography>
            <Typography gutterBottom variant="h5" align="left">
              Mail : {user.email}
            </Typography>
            <Typography gutterBottom variant="h5" align="left">
              Username : {user.username}
            </Typography>
          </CardContent>
          <CardContent sx={{ display: 'flex', flexDirection: 'column', ml: 3, maxWidth: '30%' }}>
            <Typography borderBottom={1} gutterBottom variant="h5" align="left">
              Request for
            </Typography>
            <Typography gutterBottom variant="h5" align="left">
              Role: {user.authorities[0].authority.replace('ROLE_', '')}
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 7, ml: 10 }}>
            <Button size="big" variant="contained" color="success" onClick={() => handleConfirm(user.id)}>
              Confirm
            </Button>
          </CardActions>
          <CardActions sx={{ display: 'flex', flexDirection: 'column', mt: 7 }}>
            <Button size="big" variant="contained" color="error" onClick={() => handleDelete(user.id)}>
              Decline
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  )
}
export default InactiveOwners
