import { useState } from 'react'
import styles from './TagFilter.module.css'
import AirIcon from '@mui/icons-material/Air'
import PetsIcon from '@mui/icons-material/Pets'
import TvIcon from '@mui/icons-material/Tv'
import WifiIcon from '@mui/icons-material/Wifi'

const TagFilter = ({ updateTagFilters }) => {
  const [selectedTags, setSelectedTags] = useState(new Array(4).fill(false))

  const changeTagSelection = (index) => {
    let newTags = [...selectedTags]
    newTags[index] = !newTags[index]
    setSelectedTags(newTags)
  }
  return (
    <div className={styles.wrapper}>
      <div
        key={'air_conditioning'}
        onClick={() => {
          changeTagSelection(0)
          updateTagFilters('airCondition')
        }}
        className={selectedTags[0] ? styles.tagSelected : styles.tagUnselected}
      >
        <AirIcon />
        <span>Air Conditioning</span>
      </div>
      <div
        key={'pet_friendly'}
        onClick={() => {
          changeTagSelection(1)
          updateTagFilters('petFriendly')
        }}
        className={selectedTags[1] ? styles.tagSelected : styles.tagUnselected}
      >
        <PetsIcon />
        <span>Pet Friendly</span>
      </div>
      <div
        key={'TV'}
        onClick={() => {
          changeTagSelection(2)
          updateTagFilters('television')
        }}
        className={selectedTags[2] ? styles.tagSelected : styles.tagUnselected}
      >
        <TvIcon />
        <span>TV</span>
      </div>
      <div
        key={'WIFI'}
        onClick={() => {
          changeTagSelection(3)
          updateTagFilters('wifi')
        }}
        className={selectedTags[3] ? styles.tagSelected : styles.tagUnselected}
      >
        <WifiIcon />
        <span>WIFI</span>
      </div>
    </div>
  )
}
export default TagFilter
