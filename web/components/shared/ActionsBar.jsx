import { Box, Link } from '@mui/material'
import { useRouter } from 'next/router'

const ActionsBar = () => {
  const { asPath } = useRouter()
  return (
    <Box sx={{ width: '100%', textAlign: 'center', color: 'blue', backgroundColor: 'lightblue' }}>
      If you want to see if there are actions available click here
      <Link href={asPath + '/actions'}> ACTIONS</Link>
    </Box>
  )
}

export default ActionsBar
