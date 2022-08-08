import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'

const ChangeCottageInfoForm = ({ cottage, handleChange }) => {
  return (
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
          Change cottage information
        </Typography>
        <Formik
          initialValues={{
            name: cottage.name,
            description: cottage.description,
            price: cottage.price,
            capacity: cottage.capacity,
          }}
          onSubmit={async (values) => {
            handleChange(values)
          }}
        >
          <Form>
            <Field
              id="name"
              margin="normal"
              fullWidth
              component={TextField}
              label="name"
              name="name"
              type="text"
              placeholder={cottage.name}
            />
            <Field
              id="description"
              margin="normal"
              fullWidth
              component={TextField}
              label="description"
              name="description"
              type="text"
              placeholder={cottage.description}
            />
            <Field
              id="price"
              margin="normal"
              fullWidth
              component={TextField}
              label="price"
              name="price"
              type="number"
              placeholder={cottage.price}
            />
            <Field
              id="capacity"
              margin="normal"
              fullWidth
              component={TextField}
              label="capacity"
              name="capacity"
              type="text"
              placeholder={cottage.capacity}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Change
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  )
}
export default ChangeCottageInfoForm
