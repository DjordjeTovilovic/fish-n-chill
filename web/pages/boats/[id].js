import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import boatService from '../../services/boat'
import BoatProfile from '../../components/profiles/BoatProfile'

const Boat = () => {
  const router = useRouter()
  const { id } = router.query
  const [boat, setBoat] = useState({})

  useEffect(() => {
    const fetchData = async () => setBoat(await boatService.getById(id))
    router.isReady ? fetchData() : console.log('router not ready')
  }, [router.isReady, id])

  if (Object.keys(boat).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <BoatProfile boat={boat} />
    </>
  )
}

export default Boat
