import { useState, useEffect, useMemo } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import adventureService from '../../services/adventure'
import { filterAndSortEntities } from '../../utils/listUtils'

const Adventures = () => {
  const [adventures, setAdventures] = useState([])
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const [selectedTags, setSelectedTags] = useState([])
  const [sortBy, setSortBy] = useState('')
  const sortFilterItems = ['Name', 'Address', 'Rating', 'Price']

  useEffect(() => {
    adventureService.getAll().then((gotAdventures) => setAdventures(gotAdventures))
  }, [])

  const filteredAndSortedEntities = useMemo(
    () => filterAndSortEntities(adventures, filter, filterProperty, selectedTags, sortBy),
    [adventures, filter, filterProperty, selectedTags, sortBy]
  )

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
    setSortBy(e.target.value)
  }

  const updateTagFilters = (tag) => {
    selectedTags.includes(tag)
      ? setSelectedTags(selectedTags.filter((t) => t !== tag))
      : setSelectedTags([...selectedTags, tag])
  }

  return (
    <>
      <AllEntities
        entities={filteredAndSortedEntities}
        handleSearchFieldChange={(e) => handleSearchFieldChange(e)}
        handleSearchFilterChange={(e) => handleSearchFilterChange(e)}
        handleSortFilterChange={(e) => handleSortFilterChange(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
        updateTagFilters={updateTagFilters}
        sortFilterItems={sortFilterItems}
      />
    </>
  )
}

export default Adventures
