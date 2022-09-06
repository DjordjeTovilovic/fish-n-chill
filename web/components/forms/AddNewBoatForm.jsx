import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container, Divider } from '@mui/material'
import { TextField } from 'formik-mui'
import Image from 'next/image'

const AddNewBoatForm = ({ handleChange, setFieldValue, imagePreview, handleCheckBox }) => {
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
          Enter boat information
        </Typography>
        <Formik
          initialValues={{
            name: '',
            description: '',
            address: '',
            price: '',
            capacity: '',
            boatType: '',
            length: '',
            engineModel: '',
            enginePower: '',
            maxSpeed: '',
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
            <Field
              id="price"
              margin="normal"
              fullWidth
              component={TextField}
              label="price per day"
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
              type="number"
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
            <Divider />
            <br />
            <input value="TV" name="TV" type="checkbox" onChange={handleCheckBox} />
            TV
            <input
              style={{ marginLeft: 15 }}
              value="AC"
              name="AirCondition"
              type="checkbox"
              onChange={handleCheckBox}
            />
            Air Condition
            <input
              style={{ marginLeft: 15 }}
              value="petFriendly"
              name="petFriendly"
              type="checkbox"
              onChange={handleCheckBox}
            />
            Pet Friendly
            <input style={{ marginLeft: 15 }} value="wifi" name="wifi" type="checkbox" onChange={handleCheckBox} />
            WiFi
            <input
              style={{ marginTop: 15 }}
              id="file"
              name="file"
              type="file"
              onChange={(e) => {
                setFieldValue(e)
              }}
            />
            {imagePreview ? <Image width={300} height={200} alt="image preview" src={imagePreview} /> : <></>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Create
            </Button>
          </Form>
        </Formik>
      </Box>
    </Container>
  )
}

export default AddNewBoatForm
