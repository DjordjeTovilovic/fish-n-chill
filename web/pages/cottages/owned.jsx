import { useEffect, useState } from 'react'
import CottageList from '../../components/shared/CottageList'
import cottageService from '../../services/cottage'
import { Button } from '@mui/material'
const OwnerCottages = () => {
  const [cottages, setCottages] = useState([])

  useEffect(() => {
    cottageService.getAllForOwner().then((gotCottages) => setCottages(gotCottages))
  }, [])

  return (
    <>
      <div>
        <Button variant="contained" style={{ float: 'right' }} href="/cottages/create">
          Add new cottage
        </Button>
      </div>
      <CottageList cottages={cottages} />
    </>
  )
}

export default OwnerCottages
