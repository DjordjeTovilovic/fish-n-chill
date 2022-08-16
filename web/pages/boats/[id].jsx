import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import boatService from '../../services/boat'
import BoatProfile from '../../components/profiles/BoatProfile'
import reservationService from '../../services/reservation'
import dateUtils from '../../utils/dateUtils'

const Boat = () => {
  const router = useRouter()
  const { id } = router.query
  const [boat, setBoat] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedBoats = await boatService.getById(id)
      // Prebacuje polja u datume jer nisu datumi kad dodju na front
      fetchedBoats = dateUtils.entityFieldsToDate(fetchedBoats)
      setBoat(fetchedBoats)
    }
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  if (Object.keys(boat).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <BoatProfile boat={boat} scheduleReservation={reservationService.scheduleBoatReservation} />
    </>
  )
}

export default Boat
