import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

const SearchField = ({ handleSearchFieldChange, handleSearchFilterChange }) => {
  return (
    <>
      <TextField
        id="searchCottages"
        sx={{ ml: 3, mt: 0.5, flex: 1, width: '25%' }}
        styles={{ height: '100px' }}
        variant="outlined"
        size="small"
        label="Search cottages"
        inputProps={{ 'aria-label': 'search google maps', style: { fontSize: 22 } }}
        onChange={(e) => handleSearchFieldChange(e)}
      />

      <FormControl variant="outlined" sx={{ ml: 0, flex: 1, maxWidth: '10%' }}>
        <InputLabel>Search by</InputLabel>
        <Select
          defaultValue="address"
          size="large"
          labelId="searchFilter"
          id="searchFilter"
          label="Search by"
          onChange={(e) => handleSearchFilterChange(e)}
        >
          <MenuItem value={'address'}>Address</MenuItem>
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'description'}>Description</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default SearchField
