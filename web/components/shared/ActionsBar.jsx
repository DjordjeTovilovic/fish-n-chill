import { Box, Link } from '@mui/material'

const ActionsBar = ({ entityType }) => {
  switch (entityType) {
    case 'cottage': {
      return (
        <Box sx={{ width: '100%', textAlign: 'center', color: 'blue', backgroundColor: 'lightblue' }}>
          We have some actions available for cottages! If you want to view them click here
          <Link href="cottages/actions"> ACTIONS</Link>
        </Box>
      )
    }
    case 'boat': {
      return (
        <Box sx={{ width: '100%', textAlign: 'center', color: 'blue', backgroundColor: 'lightblue' }}>
          We have some actions available for boats! If you want to view them click here
          <Link href="boats/actions"> ACTIONS</Link>
        </Box>
      )
    }
    case 'adventure': {
      return (
        <Box sx={{ width: '100%', textAlign: 'center', color: 'blue', backgroundColor: 'lightblue' }}>
          We have some actions available for adventures! If you want to view them click here
          <Link href="adventures/actions"> ACTIONS</Link>
        </Box>
      )
    }
  }
}

export default ActionsBar
