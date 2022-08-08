import { Container } from '@mui/material'
import CottageProfileCard from '../shared/CottageProfileCard'

const OwnerCottageProfile = ({ cottage }) => {
  return (
    <>
      <Container component="main" maxWidth="lg">
        <CottageProfileCard cottage={cottage} />
      </Container>
    </>
  )
}

export default OwnerCottageProfile
