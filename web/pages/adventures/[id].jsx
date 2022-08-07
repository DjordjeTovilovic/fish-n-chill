import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import adventureService from '../../services/adventure'
import AdventureProfile from '../../components/profiles/AdventureProfile'

const Adventure = () => {
  const router = useRouter()
  const { id } = router.query
  const [adventure, setAdventure] = useState({})

  useEffect(() => {
    const fetchData = async () => setAdventure(await adventureService.getById(id))
    router.isReady ? fetchData() : console.log('router not ready')
  }, [router.isReady, id])

  if (Object.keys(adventure).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <AdventureProfile adventure={adventure} />
    </>
  )
}

export default Adventure
