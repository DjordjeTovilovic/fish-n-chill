import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'

const ChangeBoatInfoForm = ({ entity, handleChange }) => {
  console.log(entity)
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
          Change boat information
        </Typography>
        <Formik
          initialValues={{
            name: entity.name,
            description: entity.description,
            price: entity.price,
            capacity: entity.capacity,
            boatType: entity.boatSpecification.boatType,
            length: entity.boatSpecification.length,
            engineModel: entity.boatSpecification.engineModel,
            enginePower: entity.boatSpecification.enginePower,
            maxSpeed: entity.boatSpecification.maxSpeed,
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
              id="price"
              margin="normal"
              fullWidth
              component={TextField}
              label="price"
              name="price"
              type="number"
            />
            <Field
              id="capacity"
              margin="normal"
              fullWidth
              component={TextField}
              label="capacity"
              name="capacity"
              type="text"
            />
            <Field
              id="boatType"
              margin="normal"
              fullWidth
              component={TextField}
              label="boat type"
              name="boatType"
              type="text"
            />
            <Field
              id="length"
              margin="normal"
              fullWidth
              component={TextField}
              label="length"
              name="length"
              type="text"
            />
            <Field
              id="engineModel"
              margin="normal"
              fullWidth
              component={TextField}
              label="engine model"
              name="engineModel"
              type="text"
            />
            <Field
              id="enginePower"
              margin="normal"
              fullWidth
              component={TextField}
              label="engine power"
              name="enginePower"
              type="text"
            />
            <Field
              id="maxSpeed"
              margin="normal"
              fullWidth
              component={TextField}
              label="maximum speed"
              name="maxSpeed"
              type="text"
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
export default ChangeBoatInfoForm
