import { useState, useEffect, useMemo } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import boatService from '../../services/boat'
import { filterAndSortEntities } from '../../utils/listUtils'

const Boats = () => {
  const [boats, setBoats] = useState([])
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const [selectedTags, setSelectedTags] = useState([])
  const [sortBy, setSortBy] = useState('')
  const sortFilterItems = ['Name', 'Address', 'Rating', 'Price']

  useEffect(() => {
    boatService.getAll().then((gotBoats) => setBoats(gotBoats))
  }, [])

  const filteredAndSortedEntities = useMemo(
    () => filterAndSortEntities(boats, filter, filterProperty, selectedTags, sortBy),
    [boats, filter, filterProperty, selectedTags, sortBy]
  )

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
        sortFilterItems={sortFilterItems}
        updateTagFilters={updateTagFilters}
      />
    </>
  )
}

export default Boats
