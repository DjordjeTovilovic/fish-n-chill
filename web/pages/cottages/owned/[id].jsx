import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import OwnedCottageProfile from '../../../components/profiles/OwnedCottageProfile'
import cottageService from '../../../services/cottage'
import reservationService from '../../../services/reservation'
import dateUtils from '../../../utils/dateUtils'

const OwnedCottage = () => {
  const router = useRouter()
  const { id } = router.query
  const [cottage, setCottage] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedCottage = await cottageService.getById(id)
      // Prebacuje polja u datume jer nisu datumi kad dodju na front
      fetchedCottage = dateUtils.entityFieldsToDate(fetchedCottage)
      setCottage(fetchedCottage)
    }
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  const updateEntity = (updatedEntity) => {
    setCottage({ ...cottage, ...updatedEntity })
  }

  if (Object.keys(cottage).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <OwnedCottageProfile
        cottage={cottage}
        updateEntity={updateEntity}
        scheduleReservation={reservationService.scheduleCottageReservation}
      />
    </>
  )
}

export default OwnedCottage
