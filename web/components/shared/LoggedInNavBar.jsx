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

          {userRole === 'ROLE_CLIENT' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Button key={page} href={'/' + page} sx={{ my: 2, color: 'white', display: 'block' }}>
                  {page}
                </Button>
              ))}
            </Box>
          )}

          {userRole === 'ROLE_COTTAGE_OWNER' && (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button href={'/cottages/owned'} sx={{ my: 2, color: 'white', display: 'block' }}>
                Dashboard
              </Button>
              <Button href={'/cottages/owned/active'} sx={{ my: 2, color: 'white', display: 'block' }}>
                Active Reservations
              </Button>
              <Button href={'/cottages/owned/past'} sx={{ my: 2, color: 'white', display: 'block' }}>
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
                <MenuItem sx={{ justifyContent: 'center' }}>
                  <Button
                    key="Owner requests"
                    style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                    sx={{ color: 'blue' }}
                    href={'/' + 'users/' + 'admin/' + 'ownerRequest'}
                  >
                    Owner requests
                  </Button>
                </MenuItem>
              )}

              {userRole === 'ROLE_COTTAGE_OWNER' && (
                <MenuItem sx={{ justifyContent: 'center' }}>
                  <Button
                    key="ownerCottages"
                    style={{ minWidth: '100%', maxHeight: '15', minHeight: '15px' }}
                    sx={{ color: 'blue' }}
                    href={'/' + 'cottages' + '/owned'}
                  >
                    Your Cottages
                  </Button>
                </MenuItem>
              )}
              

              {userRole === 'ROLE_CLIENT' && (
                <>
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
                </>
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
