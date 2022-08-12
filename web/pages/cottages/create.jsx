import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import AddNewCottageForm from '../../components/forms/AddNewCottageForm'
import cottageService from '../../services/cottage'

const AddNewCottage = () => {
  const router = useRouter()
  const [base64, setBase64] = useState()
  const [tvTag, setTvTag] = useState(false)
  const [acTag, setAcTag] = useState(false)
  const [petFriendlyTag, setPetFriendlyTag] = useState(false)
  const [wifiTag, setWifiTag] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (values) => {
    // TODO jel postoji razlog za prebacivanje u json i odma vracanje
    values = JSON.stringify(values)
    const obj = JSON.parse(values)
    obj.image = base64
    obj.tags = checkboxToObject()
    cottageService.create(obj)
    console.log(obj)
    enqueueSnackbar('Cottage created', { variant: 'success' })
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
  const handleCheckBox = (event) => {
    if (event.target.value === 'wifi') setWifiTag(!wifiTag)
    if (event.target.value === 'AC') setAcTag(!acTag)
    if (event.target.value === 'petFriendly') setPetFriendlyTag(!petFriendlyTag)
    if (event.target.value === 'TV') setTvTag(!tvTag)
  }

  const checkboxToObject = () => {
    return { wifi: wifiTag, airCondition: acTag, petFriendly: petFriendlyTag, television: tvTag }
  }

  return (
    <>
      <AddNewCottageForm
        handleCheckBox={handleCheckBox}
        handleChange={handleChange}
        setFieldValue={(e) => setFieldValue(e)}
        imagePreview={base64}
      />
    </>
  )
}
export default AddNewCottage
