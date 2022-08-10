import { useEffect, useState } from 'react'
import cottageService from '../../../services/cottage'
import { Button } from '@mui/material'
import EntityList from '../../../components/entity/EntityList'

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
      <EntityList entities={cottages} />
    </>
  )
}

export default OwnerCottages
