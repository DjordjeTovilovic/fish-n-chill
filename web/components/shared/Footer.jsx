import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

const Footer = () => {
  return (
    <footer id="footer">
      <Box bgcolor="text.secondary" color="white" px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 5 }}>
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Contact us</Box>
              <Box>+381 66 505 9512</Box>
              <Box>+381 66 505 9512</Box>
              <Box>+381 66 505 9512</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Email us</Box>
              <Box>fishnchill@support.com</Box>
              <Box>fishnchill@gmail.com </Box>
              <Box>fishnchill@organisation.com</Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>Support us</Box>
              <Link href="/" color="#FFFFFF">
                patreon.com/fishnchill
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}
export default Footer
