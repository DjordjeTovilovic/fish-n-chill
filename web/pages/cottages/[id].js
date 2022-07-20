import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import CottageProfile from '../../components/CottageProfile'
import cottageService from '../../services/cottage'

const Cottage = () => {
  const router = useRouter()
  const { id } = router.query
  const [cottage, setCottage] = useState({})

  useEffect(() => {
    const fetchData = async () => setCottage(await cottageService.getById(id))
    router.isReady ? fetchData() : console.log('router not ready')
  }, [router.isReady, id])

  if (Object.keys(cottage).length === 0) {
    return <div>Loading....</div>
  }

  const scheduleReservation = async () => {
    try {
      await cottageService.scheduleReservation(cottage)
      console.log('proslo')
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <>
      <CottageProfile cottage={cottage} scheduleReservation={() => scheduleReservation(cottage)} />
    </>
  )
}

export default Cottage