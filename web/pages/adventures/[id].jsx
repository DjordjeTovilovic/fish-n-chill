import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import adventureService from '../../services/adventure'
import AdventureProfile from '../../components/profiles/AdventureProfile'
import dateUtils from '../../utils/dateUtils'
import reservationService from '../../services/reservation'

const Adventure = () => {
  const router = useRouter()
  const { id } = router.query
  const [adventure, setAdventure] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedAdventures = await adventureService.getById(id)
      // Prebacuje polja u datume jer nisu datumi kad dodju na front
      fetchedAdventures = dateUtils.entityFieldsToDate(fetchedAdventures)
      setAdventure(fetchedAdventures)
    }
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  if (Object.keys(adventure).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <AdventureProfile adventure={adventure} scheduleReservation={reservationService.scheduleAdventureReservation} />
    </>
  )
}

export default Adventure
