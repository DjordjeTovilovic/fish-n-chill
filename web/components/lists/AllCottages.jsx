import CottageList from '../shared/CottageList'
import CottageSearch from '../shared/CottageSearch'

const AllCottages = ({
  cottages,
  handleSearchFieldChange,
  handleSearchFilterChange,
  handleSortFilterChange,
  searchForDatePeriod,
}) => {
  return (
    <>
      <CottageSearch
        handleSearchFieldChange={handleSearchFieldChange}
        handleSearchFilterChange={handleSearchFilterChange}
        handleSortFilterChange={handleSortFilterChange}
        searchForDatePeriod={searchForDatePeriod}
      />
      <CottageList cottages={cottages} />
    </>
  )
}

export default AllCottages
