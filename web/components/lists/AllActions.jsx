import { Container, Grid } from '@mui/material'
import ActionCard from 'components/shared/ActionCard'

const AllActions = ({ actions, scheduleAction, entities }) => {
  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {actions.map((action) => (
            <ActionCard key={action.id} action={action} scheduleAction={scheduleAction} entities={entities} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default AllActions
