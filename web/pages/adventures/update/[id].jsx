import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import adventureService from 'services/adventure'
import ChangeAdventureInfoForm from 'components/forms/ChangeAdventureInfoForm'

const ChangeAdventureInfo = () => {
  const router = useRouter()
  const { id } = router.query
  const [adventure, setAdventure] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedAdventure = await adventureService.getById(id)
      setAdventure(fetchedAdventure)
    }
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  const handleChange = (values) => {
    values = JSON.stringify(values)
    const obj = JSON.parse(values)
    adventureService.update(adventure.id, obj)
    router.push(`/adventures/owned/${adventure.id}`)
  }

  if (Object.keys(adventure).length === 0) {
    return <div>Loading....</div>
  }

  return (
    <>
      <ChangeAdventureInfoForm adventure={adventure} handleChange={handleChange} />
    </>
  )
}

export default ChangeAdventureInfo
