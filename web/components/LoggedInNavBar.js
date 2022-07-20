import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import Link from '@mui/material/Link'
import { useState, useEffect } from 'react'

const pages = ['cottages', 'boats', 'adventures']

const LoggedInNavBar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [userRole, setUserRole] = useState([])

  useEffect(() => {
    setUserRole(window.localStorage.getItem('role'))
  }, [])

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const handleLogout = () => {
    localStorage.clear()
  }

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

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userRole === 'ROLE_COTTAGE_OWNER' ? (
                <MenuItem>
                  <Button
                    key="cottages"
                    style={{ maxWidth: '60px', maxHeight: '15', minWidth: '30px', minHeight: '15px' }}
                    sx={{ color: 'blue' }}
                    href={'/' + ''}
                  >
                    Cottages
                  </Button>
                </MenuItem>
              ) : null}
              <MenuItem>
                <Button
                  key="profile"
                  style={{ maxWidth: '60px', maxHeight: '15', minWidth: '30px', minHeight: '15px' }}
                  sx={{ color: 'blue' }}
                  href={'/' + 'users/profile'}
                >
                  profile
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  key="logout"
                  href="/"
                  style={{ maxWidth: '60px', maxHeight: '15', minWidth: '30px', minHeight: '15px' }}
                  sx={{ color: 'red' }}
                  onClick={handleLogout}
                >
                  logout
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default LoggedInNavBar
