import { useEffect, useState } from 'react'
import EntityList from '../../../components/entity/EntityList'
import adventureService from 'services/adventure'

const OwnerBoats = () => {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    adventureService.getAllForOwner().then((gotEntities) => setEntities(gotEntities))
  }, [])

  return (
    <>
      <EntityList entities={entities} />
    </>
  )
}

export default OwnerBoats
