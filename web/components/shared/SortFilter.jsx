import React from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const SortFilter = ({ handleSortFilterChange }) => {
  return (
    <>
      <FormControl variant="outlined" sx={{ mr: 0, ml: 10, flex: 1, maxWidth: '10%' }}>
        <InputLabel>Sort by</InputLabel>
        <Select
          defaultValue=""
          size="large"
          labelId="sortFilter"
          id="sortFilter"
          label="Sort by"
          onChange={(e) => handleSortFilterChange(e)}
        >
          <MenuItem value={'price'}>Price</MenuItem>
          <MenuItem value={'rating'}>Rating</MenuItem>
          <MenuItem value={'name'}>Name</MenuItem>
          <MenuItem value={'address'}>Address</MenuItem>
        </Select>
      </FormControl>
      <Box sx={{ minWidth: 120 }}></Box>
    </>
  )
}

export default SortFilter
