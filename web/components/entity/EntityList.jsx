import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import EntityCard from '../entity/EntityCard'

const EntityList = ({ entities }) => {
  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      <Grid container spacing={4}>
        {entities.map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
      </Grid>
    </Container>
  )
}

export default EntityList
