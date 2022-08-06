import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'

const ChangeUserInfoForm = ({ handleChange, user }) => (
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
        Change user information
      </Typography>
      <Formik
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          country: user.country,
          city: user.city,
          address: user.address,
          phoneNumber: user.phoneNumber,
        }}
        onSubmit={async (values) => {
          handleChange(values)
        }}
      >
        <Form>
          <Field
            id="firstName"
            margin="normal"
            fullWidth
            component={TextField}
            label="first name"
            name="firstName"
            type="text"
            placeholder={user.firstName}
          />
          <Field
            id="lastName"
            margin="normal"
            fullWidth
            component={TextField}
            label="last name"
            name="lastName"
            type="text"
            placeholder={user.lastName}
          />
          <Field
            id="username"
            margin="normal"
            fullWidth
            component={TextField}
            label="username"
            name="username"
            type="text"
            placeholder={user.username}
          />
          <Field
            id="country"
            margin="normal"
            fullWidth
            component={TextField}
            label="country"
            name="country"
            type="text"
            placeholder={user.country}
          />
          <Field
            id="city"
            margin="normal"
            fullWidth
            component={TextField}
            label="city"
            name="city"
            type="text"
            placeholder={user.city}
          />
          <Field
            id="address"
            margin="normal"
            fullWidth
            component={TextField}
            label="address"
            name="address"
            type="text"
            placeholder={user.address}
          />
          <Field
            id="phoneNumber"
            margin="normal"
            fullWidth
            component={TextField}
            label="phone number"
            name="phoneNumber"
            type="text"
            placeholder={user.phoneNumber}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Change
          </Button>
        </Form>
      </Formik>
    </Box>
  </Container>
)

export default ChangeUserInfoForm
