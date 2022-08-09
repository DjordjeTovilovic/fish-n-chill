import { useEffect, useState } from 'react'
import CottageList from '../../components/shared/CottageList'
import cottageService from '../../services/cottage'

const OwnerCottages = () => {
  const [cottages, setCottages] = useState([])

  useEffect(() => {
    cottageService.getAllForOwner().then((gotCottages) => setCottages(gotCottages))
  }, [])

  return <CottageList cottages={cottages} />
}

export default OwnerCottages
