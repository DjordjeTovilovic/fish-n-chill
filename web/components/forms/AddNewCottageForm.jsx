import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'
import Image from 'next/image'
const AddNewCottageForm = ({ handleChange, setFieldValue, imagePreview, handleCheckBox }) => (
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
          price: 0,
          capacity: 0,
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
          <input value="TV" name="TV" type="checkbox" onChange={handleCheckBox} />
          TV
          <input value="AC" name="AirCondition" type="checkbox" onChange={handleCheckBox} />
          Air Condition
          <input value="petFriendly" name="petFriendly" type="checkbox" onChange={handleCheckBox} />
          Pet Friendly
          <input value="wifi" name="wifi" type="checkbox" onChange={handleCheckBox} />
          WiFi
          <input
            id="file"
            name="file"
            type="file"
            onChange={(e) => {
              setFieldValue(e)
            }}
          />
          {imagePreview ? <Image width={300} height={200} alt="image preview" src={imagePreview}></Image> : <></>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Form>
      </Formik>
    </Box>
  </Container>
)

export default AddNewCottageForm
