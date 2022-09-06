import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ChangeBoatInfoForm from '../../../components/forms/ChangeBoatInfoForm'
import boatService from '../../../services/boat'

const ChangeBoatInfo = () => {
  const router = useRouter()
  const { id } = router.query
  const [boat, setBoat] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedBoat = await boatService.getById(id)
      setBoat(fetchedBoat)
    }
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  const handleChange = (updatedBoat) => {
    boatService.patch(boat.id, updatedBoat)
    router.push(`/boats/owned/${boat.id}`)
  }

  if (Object.keys(boat).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <ChangeBoatInfoForm entity={boat} handleChange={handleChange} />
    </>
  )
}

export default ChangeBoatInfo
