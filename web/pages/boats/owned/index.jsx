import { useEffect, useState } from 'react'
import EntityList from '../../../components/entity/EntityList'
import boatService from 'services/boat'

const OwnerBoats = () => {
  const [entities, setEntities] = useState([])

  useEffect(() => {
    boatService.getAllForOwner().then((gotEntities) => setEntities(gotEntities))
  }, [])

  return (
    <>
      <EntityList entities={entities} />
    </>
  )
}

export default OwnerBoats
