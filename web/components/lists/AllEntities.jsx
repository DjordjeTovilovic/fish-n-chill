import ActionsBar from 'components/shared/ActionsBar'
import EntityList from '../entity/EntityList'
import EntitySearch from '../entity/EntitySearch'

const AllEntities = ({
  entities,
  handleSearchFieldChange,
  handleSearchFilterChange,
  handleSortFilterChange,
  searchForDatePeriod,
  actionsExist,
  sortFilterItems,
  updateTagFilters,
}) => {
  return (
    <>
      <EntitySearch
        handleSearchFieldChange={handleSearchFieldChange}
        handleSearchFilterChange={handleSearchFilterChange}
        handleSortFilterChange={handleSortFilterChange}
        searchForDatePeriod={searchForDatePeriod}
        sortFilterItems={sortFilterItems}
        updateTagFilters={updateTagFilters}
      />
      {actionsExist && <ActionsBar entityType={'cottage'}></ActionsBar>}
      <EntityList entities={entities} />
    </>
  )
}

export default AllEntities
