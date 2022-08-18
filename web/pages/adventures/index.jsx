import { useState, useEffect } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import adventureService from '../../services/adventure'

const Adventures = () => {
  const [adventures, setAdventures] = useState([])
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const sortFilterItems = ['Name', 'Address', 'Rating', 'Price']
  const [selectedTags, setSelectedTags] = useState([])


  useEffect(() => {
    adventureService.getAll().then((gotAdventures) => setAdventures(gotAdventures))
  }, [])

  const adventuresToShow = filter
    ? adventures.filter((adventure) => adventure[filterProperty].toLowerCase().includes(filter.toLowerCase()))
    : adventures

  const searchForDatePeriod = (datePeriod) => {
    adventureService.findByPeriod(datePeriod).then((gotAdventures) => setAdventures(gotAdventures))
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
        setAdventures([...adventures.sort((a, b) => a.name.localeCompare(b.name))])
        break
      }
      case 'address': {
        setAdventures([...adventures.sort((a, b) => a.address.localeCompare(b.address))])
        break
      }
      case 'rating': {
        setAdventures([...adventures.sort((a, b) => b.ratingAverage - a.ratingAverage)])
        break
      }
      case 'price': {
        setAdventures([...adventures.sort((a, b) => a.price - b.price)])
        break
      }
      default: {
        break
      }
    }
  }
  const updateTagFilters = (tag) => {
    selectedTags.includes(tag)
      ? setSelectedTags(selectedTags.filter((t) => t !== tag))
      : setSelectedTags([...selectedTags, tag])
  }

  return (
    <>
      <AllEntities
        entities={adventuresToShow}
        handleSearchFieldChange={(e) => handleSearchFieldChange(e)}
        handleSearchFilterChange={(e) => handleSearchFilterChange(e)}
        handleSortFilterChange={(e) => handleSortFilterChange(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
        updateTagFilters={updateTagFilters}
      />
    </>
  )
}

export default Adventures
