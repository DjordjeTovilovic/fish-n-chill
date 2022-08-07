import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import CottageCard from '../shared/CottageCard'

const CottageList = ({ cottages }) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {cottages.map((cottage) => (
          <CottageCard key={cottage.id} cottage={cottage} />
        ))}
      </Grid>
    </Container>
  )
}

export default CottageList
