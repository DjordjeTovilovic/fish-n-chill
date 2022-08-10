import ActionsBar from 'components/shared/ActionsBar'
import EntityList from '../shared/EntityList'
import CottageSearch from '../shared/CottageSearch'

const AllEntities = ({
  entities,
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
      <EntityList entities={entities} />
    </>
  )
}

export default AllEntities
