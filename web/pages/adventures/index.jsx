import { useState, useEffect } from 'react'
import AllAdventures from '../../components/lists/AllAdventures'
import adventureService from '../../services/adventure'

const Adventures = () => {
  const [adventures, setAdventures] = useState([])
  const [filter, setFilter] = useState('')
  const [sortFilter, setSortFilter] = useState('nothing')

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = async (e) => {
    if (e.value.length < 3) await fetchData()
    else
      switch (filter) {
        case 'name': {
          await fetchByName(e.value)
          break
        }
        case 'description': {
          await fetchByDescription(e.value)
          break
        }
        case 'address': {
          await fetchByAddress(e.value)
          break
        }
        case 'anything': {
          await fetchByAnything(e.value)
          break
        }
        default: {
          await fetchData()
          break
        }
      }
    if (sortFilter !== 'nothing') {
      sortAdventuresBy(sortFilter)
    }
  }

  const sortAdventuresBy = (sortFilter) => {
    switch (sortFilter) {
      case 'name': {
        setAdventures(adventures.sort((a, b) => a.name.localeCompare(b.name)))
        break
      }
      case 'address': {
        setAdventures(adventures.sort((a, b) => a.address.localeCompare(b.address)))
        break
      }
      case 'rating': {
        setAdventures(adventures.sort((a, b) => b.ratingAverage - a.ratingAverage))
        break
      }
      default: {
        fetchData()
        break
      }
    }
  }

  const handleSelect = (e) => {
    setFilter(e.target.value)
  }

  const handleSort = (e) => {
    setSortFilter(e.target.value)
    sortAdventuresBy(e.target.value)
  }

  const fetchData = async () => setAdventures(await adventureService.getAll())
  const fetchByName = async (name) => setAdventures(await adventureService.getByNameContaining(name))
  const fetchByDescription = async (description) =>
    setAdventures(await adventureService.getByDescriptionContaining(description))
  const fetchByAddress = async (address) => setAdventures(await adventureService.getByAddressContaining(address))
  const fetchByAnything = async (anything) => setAdventures(await adventureService.getByAnything(anything))

  return (
    <>
      <AllAdventures
        adventures={adventures}
        handleChange={(e) => handleChange(e)}
        handleSelect={(e) => handleSelect(e)}
        handleSort={(e) => handleSort(e)}
      />
    </>
  )
}

export default Adventures
