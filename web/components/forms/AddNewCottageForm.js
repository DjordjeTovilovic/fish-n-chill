import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'

const AddNewCottageForm = ({ handleChange, setFieldValue }) => (
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
          name: '',
          description: '',
          price: '',
          capacity: '',
        }}
        onSubmit={async (values) => {
          handleChange(values)
        }}
      >
        <Form>
          <Field id="name" margin="normal" fullWidth component={TextField} label="name" name="name" type="text" />
          <Field
            id="description"
            margin="normal"
            fullWidth
            component={TextField}
            label="description"
            name="description"
            type="text"
          />
          <Field
            id="address"
            margin="normal"
            fullWidth
            component={TextField}
            label="address"
            name="address"
            type="text"
          />
          <Field id="price" margin="normal" fullWidth component={TextField} label="price" name="price" type="number" />
          <Field
            id="capacity"
            margin="normal"
            fullWidth
            component={TextField}
            label="capacity"
            name="capacity"
            type="number"
          />
          <input
            id="file"
            name="file"
            type="file"
            onChange={(e) => {
              setFieldValue(e)
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Change
          </Button>
        </Form>
      </Formik>
    </Box>
  </Container>
)

export default AddNewCottageForm