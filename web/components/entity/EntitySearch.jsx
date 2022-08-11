import Box from '@mui/material/Box'
import EntitiesDateSearch from './EntitiesDateSearch'
import SearchField from '../shared/SearchField'
import SortFilter from '../shared/SortFilter'

const EntitySearch = ({
  handleSearchFieldChange,
  handleSearchFilterChange,
  handleSortFilterChange,
  searchForDatePeriod,
  sortFilterItems,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        pl: 5,
        backgroundColor: 'grey.300',
        width: '100%',
        height: '120px ',
        paddingTop: '15px',
        alignItems: 'center',
      }}
    >
      <EntitiesDateSearch searchForDatePeriod={searchForDatePeriod} />
      <SearchField
        handleSearchFieldChange={handleSearchFieldChange}
        handleSearchFilterChange={handleSearchFilterChange}
      />
      <SortFilter handleSortFilterChange={handleSortFilterChange} sortFilterItems={sortFilterItems} />
    </Box>
  )
}

export default EntitySearch
