import { useEffect, useState } from 'react'
import { Button } from '@mui/material'
import EntityList from '../../../components/entity/EntityList'
import boatService from 'services/boat'

const OwnerBoats = () => {
  const [boats, setboats] = useState([])

  useEffect(() => {
    boatService.getAllForOwner().then((gotboats) => setboats(gotboats))
  }, [])

  return (
    <>
      <div>
        <Button variant="contained" style={{ float: 'right' }} href="/boats/create">
          Add new cottage
        </Button>
      </div>
      <EntityList entities={boats} />
    </>
  )
}

export default OwnerBoats
