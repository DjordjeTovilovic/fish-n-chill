import { useState, useEffect } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import boatService from '../../services/boat'

const Boats = () => {
  const [boats, setBoats] = useState([])
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const [actionsExist, setActionsExist] = useState(false)

  useEffect(() => {
    boatService.getAll().then((gotBoats) => setBoats(gotBoats))
    // boatService.checkIfAnyExist().then((exists) => setActionsExist(exists))
  }, [])

  const boatsToShow = filter
    ? boats.filter((boat) => boat[filterProperty].toLowerCase().includes(filter.toLowerCase()))
    : boats

  const searchForDatePeriod = (datePeriod) => {
    boatService.findByPeriod(datePeriod).then((gotBoats) => setBoats(gotBoats))
  }

  const handleSearchFieldChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSearchFilterChange = (e) => {
    setFilterProperty(e.target.value)
  }

  const handleSortFilterChange = (e) => {
    switch (e.target.value) {
      case 'name': {
        setBoats([...boats.sort((a, b) => a.name.localeCompare(b.name))])
        break
      }
      case 'address': {
        setBoats([...boats.sort((a, b) => a.address.localeCompare(b.address))])
        break
      }
      case 'rating': {
        setBoats([...boats.sort((a, b) => b.ratingAverage - a.ratingAverage)])
        break
      }
      case 'price': {
        setBoats([...boats.sort((a, b) => a.price - b.price)])
        break
      }
      default: {
        break
      }
    }
  }

  return (
    <>
      <AllEntities
        entities={boatsToShow}
        handleSearchFieldChange={(e) => handleSearchFieldChange(e)}
        handleSearchFilterChange={(e) => handleSearchFilterChange(e)}
        handleSortFilterChange={(e) => handleSortFilterChange(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
        actionsExist={actionsExist}
      />
    </>
  )
}

export default Boats
