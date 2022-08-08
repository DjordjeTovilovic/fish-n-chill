import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container, Grid, Link } from '@mui/material'
import { TextField } from 'formik-mui'

const LoginForm = ({ handleLogin }) => (
  <Container component="main" maxWidth="xs">
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Formik
        initialValues={{
          username: '',
          password: '',
        }}
        onSubmit={async (values) => {
          handleLogin(values)
        }}
      >
        <Form>
          <Field
            id="username"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="username"
            name="username"
            type="text"
          />
          <Field
            id="password"
            required
            fullWidth
            margin="normal"
            component={TextField}
            label="password"
            name="password"
            type="password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
        </Form>
      </Formik>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item>
          <Link href="/signup" variant="body2">
            Don&apos;t have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </Box>
  </Container>
)

export default LoginForm
