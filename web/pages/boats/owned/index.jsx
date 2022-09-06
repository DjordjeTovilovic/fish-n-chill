import { useEffect, useState } from 'react'
import EntityList from '../../../components/entity/EntityList'
import boatService from 'services/boat'

const OwnerBoats = () => {
  const [boats, setboats] = useState([])

  useEffect(() => {
    boatService.getAllForOwner().then((gotboats) => setboats(gotboats))
  }, [])

  return (
    <>
      <EntityList entities={boats} />
    </>
  )
}

export default OwnerBoats
