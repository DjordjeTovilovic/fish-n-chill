import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState } from 'react'
import AddNewBoatForm from '../../components/forms/AddNewBoatForm'
import boatService from '../../services/boat'

const AddNewBoat = () => {
  const router = useRouter()
  const [base64, setBase64] = useState()
  const [tvTag, setTvTag] = useState(false)
  const [acTag, setAcTag] = useState(false)
  const [petFriendlyTag, setPetFriendlyTag] = useState(false)
  const [wifiTag, setWifiTag] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const handleChange = (newBoat) => {
    newBoat.image = base64
    newBoat.tags = checkboxToObject()
    boatService.create(newBoat)
    enqueueSnackbar('Boat successfully created', { variant: 'success' })
    router.push('/boats/owned')
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
      <AddNewBoatForm
        handleCheckBox={handleCheckBox}
        handleChange={handleChange}
        setFieldValue={(e) => setFieldValue(e)}
        imagePreview={base64}
      />
    </>
  )
}
export default AddNewBoat
