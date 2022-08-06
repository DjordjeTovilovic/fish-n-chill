import { Box, Divider, Typography, Container, Skeleton, Paper, Rating, Button } from '@mui/material'
import Image from 'next/image'
import { useState, useEffect } from 'react'


const BoatProfile = ({ boat }) => {
  const [loggedInUser, setLoggedInUser] = useState([])
  const [penalty, setPenalty] = useState([])

  useEffect(() => {
    setLoggedInUser(JSON.parse(window.localStorage.getItem('loggedInUser')))
    setPenalty(JSON.parse(window.localStorage.getItem('penalty')))
  }, [])
  return (
    <>
      <Container component="main" maxWidth="lg">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mb: 8
          }}
        >
          <Paper>
            <Typography variant="h3" mx="auto" align="center" gutterBottom component="div" sx={{ ml: 1, mr: 1 }}>
              {boat.name}
            </Typography>
            <Box textAlign="center">
              <Rating size="large" name="read-only" value={boat.ratingAverage ?? 0} precision={0.5} readOnly />
              <Typography variant="subtitle1" mx="auto" align="center" gutterBottom component="div" sx={{ ml: 1, mr: 1 }}>
                ({boat.ratingCount} ratings)
              </Typography>
            </Box>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px"
              }}
            >
              {boat.images ? (
                <Image width={600} height={400} src={boat.images[0].url} alt="boat" />
              ) : (
                <Skeleton variant="rectangular" width={600} height={400} />
              )}
            </div>

            <Divider variant="middle" sx={{ mt: 1 }} />
            <div></div>
            <Typography variant="h5" fontWeight='fontWeightMedium' sx={{ ml: 3, mr: 3 }} display="inline">
              Price:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {boat.price}€
            </Typography>
            <div></div>
            <Typography variant="h5" fontWeight='fontWeightMedium' sx={{ ml: 3, mr: 3 }} display="inline">
              Available:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {boat.availabilityStart[2] ?? "#Not available#"}.{boat.availabilityStart[1]}.{boat.availabilityStart[0]}
            </Typography>
            <Typography variant="h5" fontWeight='fontWeightMedium' sx={{ mr: 2 }} display="inline">
              -
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {boat.availabilityEnd[2] ?? "#Not available#"}.{boat.availabilityEnd[1]}.{boat.availabilityEnd[0]}
            </Typography>
            <div></div>
            <Typography variant="h5" fontWeight='fontWeightMedium' sx={{ ml: 3, mr: 3 }} display="inline">
              Capacity:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ mr: 3 }} display="inline">
              {boat.capacity} people
            </Typography>


            <Typography variant="h5" fontWeight='fontWeightMedium' sx={{ ml: 3, mr: 3 }}>
              Description:
            </Typography>
            <Typography variant="h5" gutterBottom component="div" sx={{ ml: 3, mr: 3 }}>
              {boat.description}
            </Typography>
            {/*Ako je ulogovan user prikazati dugme za rezervisanje*/}
            {loggedInUser ? <><Button /*onClick={scheduleReservation}*/ disabled={penalty >= 3} size="large" variant="contained" sx={{ ml: 3 }}>
              Schedule Reservation
            </Button>
              {penalty >= 3 && <p style={{
                color: "red",
                fontSize: "13px",
                marginLeft: "25px",
                marginTop: "5px"
              }}>You have 3 or more penalties and can't schedule reservations</p>}</> : <></>}
          </Paper>
        </Box>
      </Container>
    </>
  )
}

export default BoatProfile
