import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import OwnedAdventureProfile from '../../../components/profiles/OwnedAdventureProfile'
import adventureService from '../../../services/adventure'
import reservationService from '../../../services/reservation'
import dateUtils from '../../../utils/dateUtils'

const OwnedCottage = () => {
  const router = useRouter()
  const { id } = router.query
  const [entity, setEntity] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedCottage = await adventureService.getById(id)
      // Prebacuje polja u datume jer nisu datumi kad dodju na front
      fetchedCottage = dateUtils.entityFieldsToDate(fetchedCottage)
      setEntity(fetchedCottage)
    }
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  const updateEntity = (updatedEntity) => {
    setEntity({ ...entity, ...updatedEntity })
  }

  if (Object.keys(entity).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <OwnedAdventureProfile
        entity={entity}
        updateEntity={updateEntity}
        scheduleReservation={reservationService.scheduleAdventureReservation}
      />
    </>
  )
}

export default OwnedCottage
