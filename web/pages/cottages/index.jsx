import { useState, useEffect, useMemo } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import cottageService from '../../services/cottage'
import { filterAndSortEntities } from '../../utils/listUtils'

const Cottages = () => {
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const [cottages, setCottages] = useState([])
  const [selectedTags, setSelectedTags] = useState([])
  const [sortBy, setSortBy] = useState('')
  const sortFilterItems = ['Name', 'Address', 'Rating', 'Price']

  useEffect(() => {
    cottageService.getAll().then((gotCottages) => setCottages(gotCottages))
  }, [])

  const filteredAndSortedEntities = useMemo(
    () => filterAndSortEntities(cottages, filter, filterProperty, selectedTags, sortBy),
    [cottages, filter, filterProperty, selectedTags, sortBy]
  )

  const searchForDatePeriod = (datePeriod) => {
    cottageService.findByPeriod(datePeriod).then((gotCottages) => setCottages(gotCottages))
  }

  const updateTagFilters = (tag) => {
    selectedTags.includes(tag)
      ? setSelectedTags(selectedTags.filter((t) => t !== tag))
      : setSelectedTags([...selectedTags, tag])
  }

  const handleSearchFieldChange = (value) => {
    setFilter(value)
  }

  const handleSearchFilterChange = (e) => {
    setFilterProperty(e.target.value)
  }

  const handleSortFilterChange = (e) => {
    setSortBy(e.target.value)
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

export default Cottages
