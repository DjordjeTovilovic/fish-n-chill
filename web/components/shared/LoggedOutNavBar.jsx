import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Link from '@mui/material/Link'
import Container from '@mui/material/Container'
import Button from '@mui/material/Button'

const pages = ['cottages', 'boats', 'adventures']
const settings = ['login', 'signup']

const LoggedOutNavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            href="/"
            underline="none"
            color="inherit"
            variant="h5"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            FishNChill
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button key={page} href={'/' + page} sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {settings.map((setting) => (
              <Button key={setting} href={'/' + setting} sx={{ my: 2, color: 'white', display: 'block' }}>
                {setting}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default LoggedOutNavBar
