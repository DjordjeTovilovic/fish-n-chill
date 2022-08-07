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

const AllCottagesForOwner = ({ cottages, handleChange, handleSelect, handleSort, handleDelete }) => {
  return (
    <>
      <main>
        <Box
          sx={{
            display: 'flex',
            pl: 5,
            backgroundColor: 'grey.300',
            width: '100%',
            height: '120px ',
            paddingTop: '15px',
            alignItems: 'center',
          }}
        >
          <TextField
            id="searchCottages"
            sx={{ ml: 35, mt: 0.5, flex: 1, width: '25%' }}
            styles={{ height: '100px' }}
            variant="outlined"
            size="small"
            label="Search cottages"
            inputProps={{ 'aria-label': 'search google maps', style: { fontSize: 22 } }}
            onChange={(e) => handleChange(e)}
          />
          <FormControl variant="outlined" sx={{ ml: 0, flex: 1, maxWidth: '10%' }}>
            <InputLabel>Search by</InputLabel>
            <Select
              defaultValue="address"
              size="large"
              labelId="searchFilter"
              id="searchFilter"
              label="Search"
              onChange={(e) => handleSelect(e)}
            >
              <MenuItem value={'address'}>Address</MenuItem>
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'description'}>Description</MenuItem>
            </Select>
          </FormControl>
          <FormControl variant="outlined" sx={{ mr: 0, ml: 10, flex: 1, maxWidth: '10%' }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              defaultValue=""
              size="large"
              labelId="sortFilter"
              id="sortFilter"
              label="Sort by"
              onChange={(e) => {
                handleSort(e)
              }}
            >
              <MenuItem value={'price'}>Price</MenuItem>
              <MenuItem value={'rating'}>Rating</MenuItem>
              <MenuItem value={'name'}>Name</MenuItem>
              <MenuItem value={'address'}>Address</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ minWidth: 120 }}></Box>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {cottages.map((cottage) => (
              <Grid item key={cottage.id} xs={12} sm={6} md={4}>
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
                    <Button href={'update/' + cottage.id} size="small" variant="contained">
                      Update
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDelete(cottage.id)} variant="contained">
                      Delete
                    </Button>
                    <Rating
                      name="read-only"
                      value={cottage.ratingAverage ?? 0}
                      precision={0.5}
                      readOnly
                      sx={{ ml: 7 }}
                    />
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

export default AllCottagesForOwner
