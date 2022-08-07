import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import * as Yup from 'yup'

const SignupSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const CustomizedSelectForFormik = ({ children, form, field }) => {
  const { name, value } = field
  const { setFieldValue } = form

  return (
    <Select
      defaultValue=""
      size="large"
      label="sign up as*"
      name={name}
      value={value}
      required
      onChange={(e) => {
        setFieldValue(name, e.target.value)
      }}
    >
      {children}
    </Select>
  )
}

const SignupForm = ({ handleSignup }) => (
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
        Sign up
      </Typography>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          username: '',
          password: '',
          passwordConfirmation: '',
          country: '',
          city: '',
          address: '',
          phoneNumber: '',
          role: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          handleSignup(values)
        }}
      >
        <Form>
          <Field
            id="firstName"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="first name"
            name="firstName"
            type="text"
          />
          <Field
            id="lastName"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="last name"
            name="lastName"
            type="text"
          />
          <Field
            id="email"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="email"
            name="email"
            type="email"
          />
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
          <Field
            id="passwordConfirmation"
            required
            fullWidth
            margin="normal"
            component={TextField}
            label="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
          />
          <Field
            id="country"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="country"
            name="country"
            type="text"
          />
          <Field
            id="city"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="city"
            name="city"
            type="text"
          />
          <Field
            id="address"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="address"
            name="address"
            type="text"
          />
          <Field
            id="phoneNumber"
            margin="normal"
            required
            fullWidth
            component={TextField}
            label="phone number"
            name="phoneNumber"
            type="text"
          />
          <FormControl variant="outlined" sx={{ mt: 0.5, ml: 0, flex: 1, width: '100%' }}>
            <InputLabel label="sign up as*">sign up as*</InputLabel>
            <Field name="role" component={CustomizedSelectForFormik} required>
              <MenuItem value={'client'}>Client</MenuItem>
              <MenuItem value={'cottage_owner'}>Cottage owner</MenuItem>
              <MenuItem value={'boat_owner'}>Boat owner</MenuItem>
              <MenuItem value={'adventure_owner'}>Adventure owner</MenuItem>
            </Field>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Sign Up
          </Button>
        </Form>
      </Formik>
    </Box>
  </Container>
)

export default SignupForm
