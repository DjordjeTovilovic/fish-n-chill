import * as React from 'react'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Rating from '@mui/material/Rating'
import Divider from '@mui/material/Divider'

const AllBoats = ({ boats, handleChange, handleSelect, handleSort }) => {
  return (
    <>
      <main>
        <Box sx={{ backgroundColor: 'grey.300', width: '100%' }}>
          <TextField
            id="searchBoats"
            sx={{ mt: 0.5, ml: 55, flex: 1, width: '25%' }}
            variant="filled"
            size="small"
            placeholder="Search boats"
            inputProps={{ 'aria-label': 'search google maps', style: { textAlign: 'center', fontSize: 22 } }}
            onChange={(e) => handleChange(e.target)}
          />
          <FormControl variant="filled" sx={{ mt: 0.5, ml: 0, flex: 1, width: '10%' }}>
            <InputLabel>Search by</InputLabel>
            <Select
              defaultValue=""
              size="large"
              labelId="searchFilter"
              id="searchFilter"
              label="Search by"
              onChange={(e) => {
                handleSelect(e)
                searchBoats.value = ''
                handleChange(searchBoats)
              }}
            >
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'description'}>Description</MenuItem>
              <MenuItem value={'address'}>Address</MenuItem>
              <MenuItem value={'anything'}>Anything</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="filled" sx={{ mt: 0.5, ml: 0, flex: 1, width: '10%' }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              defaultValue=""
              size="large"
              labelId="searchFilter"
              id="searchFilter"
              label="Search by"
              onChange={(e) => {
                handleSort(e)
              }}
            >
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'address'}>Address</MenuItem>
              <MenuItem value={'rating'}>Rating</MenuItem>
              <MenuItem value={'nothing'}>Nothing</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ minWidth: 120 }}></Box>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {boats.map((boat) => (
              <Grid item key={boat.id} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      pt: '0%',
                    }}
                    image={boat.images[0].url}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography borderBottom={1} gutterBottom variant="h5" component="h2" align="center">
                      {boat.name}
                    </Typography>
                    <Typography variant="subtitle2" align="center">
                      {boat.address}
                    </Typography>
                    <Typography variant="subtitle2" component="div" align="center">
                      {boat.availabilityStart[2] ?? '#Not available#'}.{boat.availabilityStart[1]}.
                      {boat.availabilityStart[0]} - {boat.availabilityEnd[2] ?? '#Not available#'}.
                      {boat.availabilityEnd[1]}.{boat.availabilityEnd[0]}
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
                      {boat.description}
                    </Typography>
                    <Divider variant="middle" />
                  </CardContent>
                  <Box>
                    <Typography variant="subtitle2" align="left" sx={{ ml: 1 }} display="inline">
                      {boat.price}€
                    </Typography>
                    <Typography variant="subtitle2" display="inline" sx={{ ml: 21 }}>
                      {boat.capacity}&#128100;
                    </Typography>
                  </Box>

                  <CardActions>
                    <Button size="small" href={'boats/' + boat.id} variant="contained">
                      View
                    </Button>
                    <Rating name="read-only" value={boat.ratingAverage ?? 0} precision={0.5} readOnly sx={{ ml: 7 }} />
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </>
  )
}

export default AllBoats
