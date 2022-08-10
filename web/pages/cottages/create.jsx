import { useRouter } from 'next/router'
import { useState } from 'react'
import AddNewCottageForm from '../../components/forms/AddNewCottageForm'
import cottageService from '../../services/cottage'

const AddNewCottage = () => {
const router = useRouter()

  const [base64, setBase64] = useState()
  const handleChange = (values) => {
    values = JSON.stringify(values)
    const obj = JSON.parse(values)
    obj.image = base64
    cottageService.create(obj)

    router.push('/cottages/owned')
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
      <AddNewCottageForm handleChange={handleChange} setFieldValue={(e) => setFieldValue(e)} imagePreview={base64} />
    </>
  )
}
export default AddNewCottage
