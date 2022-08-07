import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CottageProfile from '../../components/profiles/CottageProfile'
import cottageService from '../../services/cottage'
import dateUtils from '../../utils/dateUtils'

const Cottage = () => {
  const router = useRouter()
  const { id } = router.query
  const [cottage, setCottage] = useState({})
  const [statusMessage, setStatusMessage] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedCottage = await cottageService.getById(id)
      // Prebacuje polja u datume jer nisu datumi kad dodju na front
      fetchedCottage = dateUtils.entityFieldsToDate(fetchedCottage)
      setCottage(fetchedCottage)
    }
    router.isReady ? fetchData() : console.log('router not ready')
  }, [router.isReady, id])

  if (Object.keys(cottage).length === 0) {
    return <div>Loading....</div>
  }

  const scheduleReservation = (reservation) => {
    cottageService.scheduleReservation(reservation)
      .then(() => setStatusMessage({ color: "green", message: "Reservation scheduled!" }))
      .catch((err) => setStatusMessage({ color: "red", message: "Somthing went wrong!" }))
  }

  return (
    <>
      <CottageProfile cottage={cottage} scheduleReservation={scheduleReservation} statusMessage={statusMessage} />
    </>
  )
}

export default Cottage
