import { useState } from 'react'
import AddNewCottageForm from '../../components/forms/AddNewCottageForm'
import cottageService from '../../services/cottage'

const AddNewCottage = () => {
  const [base64, setBase64] = useState()
  const handleChange = (values) => {
    values = JSON.stringify(values)
    const obj = JSON.parse(values)
    obj.image = base64
    //console.log(obj)

    cottageService.create(obj)
  }

  const setFieldValue = async (e) => {
    await encodeImageFileAsURL(e.target)
  }

  const encodeImageFileAsURL = (element) => {
    var file = element.files[0]
    var reader = new FileReader()

    reader.onloadend = function () {
      setBase64(reader.result)
    }
    reader.readAsDataURL(file)
  }

  return (
    <>
      <AddNewCottageForm handleChange={handleChange} setFieldValue={(e) => setFieldValue(e)} />
    </>
  )
}
export default AddNewCottage
