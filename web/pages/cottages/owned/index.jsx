import { useEffect, useState } from 'react'
import cottageService from '../../../services/cottage'
import EntityList from '../../../components/entity/EntityList'

const OwnerCottages = () => {
  const [cottages, setCottages] = useState([])

  useEffect(() => {
    cottageService.getAllForOwner().then((gotCottages) => setCottages(gotCottages))
  }, [])

  return (
    <>
      <EntityList entities={cottages} />
    </>
  )
}

export default OwnerCottages
