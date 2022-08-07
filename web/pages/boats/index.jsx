import { useState, useEffect } from 'react'
import AllBoats from '../../components/lists/AllBoats'
import boatService from '../../services/boat'

const Boats = () => {
  const [boats, setBoats] = useState([])
  const [filter, setFilter] = useState('')
  const [sortFilter, setSortFilter] = useState('nothing')

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = async (e) => {
    if (e.value.length < 3) await fetchData()
    else
      switch (filter) {
        case 'name': {
          await fetchByName(e.value)
          break
        }
        case 'description': {
          await fetchByDescription(e.value)
          break
        }
        case 'address': {
          await fetchByAddress(e.value)
          break
        }
        case 'anything': {
          await fetchByAnything(e.value)
          break
        }
        default: {
          await fetchData()
          break
        }
      }
    if (sortFilter !== 'nothing') {
      sortBoatsBy(sortFilter)
    }
  }

  const sortBoatsBy = (sortFilter) => {
    switch (sortFilter) {
      case 'name': {
        setBoats(boats.sort((a, b) => a.name.localeCompare(b.name)))
        break
      }
      case 'address': {
        setBoats(boats.sort((a, b) => a.address.localeCompare(b.address)))
        break
      }
      case 'rating': {
        setBoats(boats.sort((a, b) => b.ratingAverage - a.ratingAverage))
        break
      }
      default: {
        fetchData()
        break
      }
    }
  }

  const handleSelect = (e) => {
    setFilter(e.target.value)
  }

  const handleSort = (e) => {
    setSortFilter(e.target.value)
    sortBoatsBy(e.target.value)
  }

  const fetchData = async () => setBoats(await boatService.getAll())
  const fetchByName = async (name) => setBoats(await boatService.getByNameContaining(name))
  const fetchByDescription = async (description) => setBoats(await boatService.getByDescriptionContaining(description))
  const fetchByAddress = async (address) => setBoats(await boatService.getByAddressContaining(address))
  const fetchByAnything = async (anything) => setBoats(await boatService.getByAnything(anything))

  return (
    <>
      <AllBoats
        boats={boats}
        handleChange={(e) => handleChange(e)}
        handleSelect={(e) => handleSelect(e)}
        handleSort={(e) => handleSort(e)}
      />
    </>
  )
}

export default Boats
