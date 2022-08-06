import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'

import * as Yup from 'yup'

const SignupSchema = Yup.object({
  oldPassword: Yup.string().required('Password is required'),
  newPassword: Yup.string().required('Password is required'),
  passwordConfirmation: Yup.string()
    .required()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
})

const ChangeUserPasswordForm = ({ handleChange, user }) => (
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
        Change user password
      </Typography>
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          passwordConfirmation: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          handleChange(values)
        }}
      >
        <Form>
          <Field
            id="oldPassword"
            required
            fullWidth
            margin="normal"
            component={TextField}
            label="oldPassword"
            name="oldPassword"
            type="password"
          />
          <Field
            id="newPassword"
            required
            fullWidth
            margin="normal"
            component={TextField}
            label="newPassword"
            name="newPassword"
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
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Change
          </Button>
        </Form>
      </Formik>
    </Box>
  </Container>
)

export default ChangeUserPasswordForm
