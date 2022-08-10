import { Container, Grid } from '@mui/material'
import ActionCard from 'components/shared/ActionCard'

const AllActions = ({ actions, scheduleAction }) => {
  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        <Grid container spacing={4}>
          {actions.map((action) => (
            <ActionCard key={action.id} action={action} scheduleAction={scheduleAction} />
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default AllActions
