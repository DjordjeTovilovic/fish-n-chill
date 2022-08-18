import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

const TypeFilter = ({ handleTypeFilterChange, typeFilterItems }) => {
  return (
    <>
      <FormControl variant="outlined" sx={{ mr: 0, ml: 10, flex: 1, maxWidth: '15%' }}>
        <InputLabel>Choose type</InputLabel>
        <Select
          defaultValue=""
          size="large"
          labelId="typeFilter"
          id="typeFilter"
          label="Choose type"
          onChange={(e) => handleTypeFilterChange(e)}
        >
          {typeFilterItems.map((filter) => (
            <MenuItem value={filter.toLowerCase()} key={filter}>
              {filter}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ minWidth: 120 }}></Box>
    </>
  )
}

export default TypeFilter
