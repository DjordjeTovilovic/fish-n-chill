import { Formik, Field, Form } from 'formik'
import { Box, Typography, Button, Container } from '@mui/material'
import { TextField } from 'formik-mui'
import Image from 'next/image'

const AddNewAdventureForm = ({ handleChange, setFieldValue, imagePreview, handleCheckBox }) => {
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
          Enter adventure information
        </Typography>
        <Formik
          initialValues={{
            name: '',
            description: '',
            address: '',
            price: '',
            capacity: '',
            rooms: '',
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

export default AddNewAdventureForm
