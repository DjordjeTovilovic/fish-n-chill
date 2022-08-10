import { useState, useEffect } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import cottageService from '../../services/cottage'
import cottageActionService from 'services/cottagesAction'

const Cottages = () => {
  const [cottages, setCottages] = useState([])
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const [actionsExist, setActionsExist] = useState(false)

  useEffect(() => {
    cottageService.getAll().then((gotCottages) => setCottages(gotCottages))
    cottageActionService.checkIfAnyExist().then((exists) => setActionsExist(exists))
  }, [])

  const cottagesToShow = filter
    ? cottages.filter((cottage) => cottage[filterProperty].toLowerCase().includes(filter.toLowerCase()))
    : cottages

  const searchForDatePeriod = (datePeriod) => {
    cottageService.findByPeriod(datePeriod).then((gotCottages) => setCottages(gotCottages))
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
        setCottages([...cottages.sort((a, b) => a.name.localeCompare(b.name))])
        break
      }
      case 'address': {
        setCottages([...cottages.sort((a, b) => a.address.localeCompare(b.address))])
        break
      }
      case 'rating': {
        setCottages([...cottages.sort((a, b) => b.ratingAverage - a.ratingAverage)])
        break
      }
      case 'price': {
        setCottages([...cottages.sort((a, b) => a.price - b.price)])
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
        entities={cottagesToShow}
        handleSearchFieldChange={(e) => handleSearchFieldChange(e)}
        handleSearchFilterChange={(e) => handleSearchFilterChange(e)}
        handleSortFilterChange={(e) => handleSortFilterChange(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
        actionsExist={actionsExist}
      />
    </>
  )
}

export default Cottages
