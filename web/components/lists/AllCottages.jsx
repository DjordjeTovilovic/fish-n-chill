import ActionsBar from 'components/shared/ActionsBar'
import CottageList from '../shared/CottageList'
import CottageSearch from '../shared/CottageSearch'

const AllCottages = ({
  cottages,
  handleSearchFieldChange,
  handleSearchFilterChange,
  handleSortFilterChange,
  searchForDatePeriod,
  actionsExist,
}) => {
  return (
    <>
      <CottageSearch
        handleSearchFieldChange={handleSearchFieldChange}
        handleSearchFilterChange={handleSearchFilterChange}
        handleSortFilterChange={handleSortFilterChange}
        searchForDatePeriod={searchForDatePeriod}
      />
      {actionsExist && <ActionsBar entityType={'cottage'}></ActionsBar>}
      <CottageList cottages={cottages} />
    </>
  )
}

export default AllCottages
