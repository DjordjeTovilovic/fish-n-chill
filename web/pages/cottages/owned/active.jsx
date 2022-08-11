import { useEffect, useState } from 'react'
import OwnerActiveReservations from '../../../components/cottage/OwnerActiveReservations'
import ownerService from '../../../services/owner'

const ActiveOwnerCottageReservations = () => {
  const [reservations, setReservations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const fetchedReservations = await ownerService.getAllActiveCottageReservationsForOwner()
      setReservations(fetchedReservations)
    }

    fetchData()
  }, [])

  return <OwnerActiveReservations reservations={reservations} />
}

export default ActiveOwnerCottageReservations
