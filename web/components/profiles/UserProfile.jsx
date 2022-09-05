// @ts-nocheck
import { Box, Divider, Typography, Container, Paper, Button, TextField } from '@mui/material'
import Modal from 'components/modal/Modal'
import { useState } from 'react'

const UserProfile = ({ user, handleDelete, setClientResponse }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const changeModalState = () => setIsOpenModal(!isOpenModal)

  const deleteModalContent = (
    <>
      <h3>Are you sure you want to delete your account?</h3>
      <TextField
        id="outlined-multiline-static"
        label="Account deletion explanation"
        multiline
        rows={10}
        sx={{ minWidth: '500px', mb: 3 }}
        onChange={(e) => setClientResponse(() => ({ userId: user.id, explanation: e.target.value }))}
      />
      <Button onClick={handleDelete} variant="contained" color="error">
        Request account deletion
      </Button>
    </>
  )
  return (
    <>
      <Container component="main" maxWidth="md">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            mb: 8,
          }}
        >
          <Paper>
            <Typography variant="h4" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.username}
            </Typography>

            <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              Email:
            </Typography>
            <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.email}
            </Typography>
            <Divider></Divider>
            <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              Full name:
            </Typography>
            <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Divider></Divider>
            <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              Country:
            </Typography>
            <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.country}
            </Typography>
            <Divider></Divider>
            <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              City:
            </Typography>
            <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.city}
            </Typography>
            <Divider></Divider>
            <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              Address:
            </Typography>
            <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.address}
            </Typography>
            <Divider></Divider>
            <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              Phone number:
            </Typography>
            <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.phoneNumber}
            </Typography>
            <Divider></Divider>
            {user.authorities[0].authority === 'ROLE_CLIENT' ? (
              <>
                <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
                  Penalty count:
                </Typography>
                <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
                  {user.penaltyCount}
                </Typography>
                <Divider></Divider>
                <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
                  User type:
                </Typography>
              </>
            ) : (
              <Typography variant="h6" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
                User type:
              </Typography>
            )}
            <Typography variant="h5" display="inline" align="left" component="div" sx={{ ml: 1, mr: 1 }}>
              {user.authorities[0].authority}
            </Typography>
            {parseInt(window.localStorage.getItem('id')) === user.id && (
              <>
                <Divider></Divider>
                <Button size="small" href="profile/changeInfo" variant="contained" sx={{ ml: 2, mb: 2, mt: 2 }}>
                  Change account information
                </Button>
                <Button size="small" href="profile/changePassword" variant="contained" sx={{ ml: 2, mb: 2, mt: 2 }}>
                  Change password
                </Button>
                <Button
                  size="small"
                  type="submit"
                  variant="contained"
                  sx={{ ml: 35, mb: 2, mt: 2 }}
                  color="error"
                  disabled={user.deleteRequest}
                  onClick={() => changeModalState()}
                >
                  Delete account
                </Button>
                {user.deleteRequest && (
                  <p
                    style={{
                      color: 'red',
                      fontSize: '10px',
                      marginTop: '0px',
                      marginLeft: '78%',
                      maxWidth: '200px',
                    }}
                  >
                    You already requested your account deletion. You need to wait for approval!
                  </p>
                )}
              </>
            )}
          </Paper>
        </Box>
      </Container>
      <Modal content={deleteModalContent} isOpenModal={isOpenModal} changeModalState={changeModalState} />
    </>
  )
}

export default UserProfile
