import React from 'react'
import Box from '@mui/material/Box'
import CottageDateSearch from './CottageDateSearch'
import SearchField from './SearchField'
import SortFilter from './SortFilter'

const CottageSearch = ({
  handleSearchFieldChange,
  handleSearchFilterChange,
  handleSortFilterChange,
  searchForDatePeriod,
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
      <CottageDateSearch searchForDatePeriod={searchForDatePeriod} />
      <SearchField
        handleSearchFieldChange={handleSearchFieldChange}
        handleSearchFilterChange={handleSearchFilterChange}
      />
      <SortFilter handleSortFilterChange={handleSortFilterChange} />
    </Box>
  )
}

export default CottageSearch
