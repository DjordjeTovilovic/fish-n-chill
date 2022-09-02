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
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, ':hover': { color: 'gray' } }}
          >
            FishNChill
          </Link>

          {userRole === 'ROLE_CLIENT' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} href={'/' + page} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>
          )}

          {userRole === 'ROLE_ADMIN' && <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>}

          {(userRole === 'ROLE_COTTAGE_OWNER' ||
            userRole === 'ROLE_BOAT_OWNER' ||
            userRole === 'ROLE_ADVENTURE_OWNER') && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                href={'/' + userRole.split('_')[1].toLowerCase() + 's/owned'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Dashboard
              </Button>
              <Button
                href={'/' + userRole.split('_')[1].toLowerCase() + 's/owned/active'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Active Reservations
              </Button>
              <Button
                href={'/' + userRole.split('_')[1].toLowerCase() + 's/owned/past'}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Past Reservations
              </Button>
            </Box>
          )}

          <Box sx={{ minWidth: 'fit-content' }}>
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
              {userRole === 'ROLE_ADMIN' && (
                <div>
                  <MenuItem sx={{ justifyContent: 'center' }}>
                    <Button
                      key="Owner requests"
                      style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                      sx={{ color: 'blue' }}
                      href={'/' + 'users/' + 'admin/' + 'requests'}
                    >
                      Owner requests
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ justifyContent: 'center' }}>
                    <Button
                      key="Owner requests"
                      style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                      sx={{ color: 'blue' }}
                      href={'/' + 'users/' + 'admin/' + 'reports'}
                    >
                      Reports
                    </Button>
                  </MenuItem>
                </div>
              )}

              {(userRole === 'ROLE_BOAT_OWNER' ||
                userRole === 'ROLE_ADVENTURE_OWNER' ||
                userRole === 'ROLE_COTTAGE_OWNER') && (
                <MenuItem sx={{ justifyContent: 'center' }}>
                  <Button
                    key="ownerCottages"
                    style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                    sx={{ color: 'blue' }}
                    href={'/' + userRole.split('_')[1].toLowerCase() + 's/owned'}
                  >
                    Your {userRole.split('_')[1]}s
                  </Button>
                </MenuItem>
              )}

              {userRole === 'ROLE_CLIENT' && (
                <div>
                  <MenuItem sx={{ justifyContent: 'center' }}>
                    <Button
                      key="cottages"
                      style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                      sx={{ color: 'black' }}
                      href={'/reservations/active'}
                    >
                      Active reservations
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ justifyContent: 'center' }}>
                    <Button
                      key="cottages"
                      style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                      sx={{ color: 'black' }}
                      href={'/reservations/past'}
                    >
                      Reservation history
                    </Button>
                  </MenuItem>
                  <MenuItem sx={{ justifyContent: 'center', borderBottom: '1px solid black' }}>
                    <Button
                      key="cottages"
                      style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                      sx={{ color: 'black' }}
                      href={'/subscriptions'}
                    >
                      Subscriptions
                    </Button>
                  </MenuItem>
                </div>
              )}
              <MenuItem sx={{ justifyContent: 'center' }}>
                <Button
                  key="profile"
                  style={{ maxHeight: '15', minWidth: '100%', minHeight: '15px' }}
                  sx={{ color: 'blue' }}
                  href={'/users/profile'}
                >
                  profile
                </Button>
              </MenuItem>
              <MenuItem sx={{ justifyContent: 'center' }}>
                <Button
                  key="logout"
                  href="/"
                  style={{ maxHeight: '15', minWidth: '100%', minHeight: '15px' }}
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
