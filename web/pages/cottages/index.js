import { useState, useEffect } from 'react'
import AllCottages from '../../components/AllCottages'
import cottageService from '../../services/cottage'

const Cottages = () => {
  const [cottages, setCottages] = useState([])
  const [filter, setFilter] = useState('')
  const [sortFilter, setSortFilter] = useState('nothing')

  useEffect(() => {
    fetchData()
  }, [])

  const handleChange = async (e) => {
    if (e.value.length < 3) await fetchData()
    else
      switch (filter) {
        case "name": {
          await fetchByName(e.value)
          break;
        }
        case "description": {
          await fetchByDescription(e.value)
          break;
        }
        case "address": {
          await fetchByAddress(e.value)
          break;
        }
        case "anything": {
          await fetchByAnything(e.value)
          break;
        }
        default: {
          await fetchData()
          break;
        }
      }
    if (sortFilter !== "nothing") {
      sortCottagesBy(sortFilter)
    }
  }

  const sortCottagesBy = (sortFilter) => {
    switch (sortFilter) {
      case "name": {
        setCottages(cottages.sort((a, b) => a.name.localeCompare(b.name)))
        break;
      }
      case "address": {
        setCottages(cottages.sort((a, b) => a.address.localeCompare(b.address)))
        break;
      }
      case "rating": {
        setCottages(cottages.sort((a, b) => b.ratingAverage - a.ratingAverage))
        break;
      }
      default: {
        fetchData()
        break;
      }
    }
  }

  const handleSelect = (e) => {
    setFilter(e.target.value)
  }

  const handleSort = (e
  ) => {
    setSortFilter(e.target.value)
    sortCottagesBy(e.target.value)
  }

  const fetchData = () => cottageService.getAll().then((gotCottages) => setCottages(gotCottages))
  const fetchByName = async (name) => setCottages(await cottageService.getByNameContaining(name))
  const fetchByAddress = async (address) => setCottages(await cottageService.getByAddressContaining(address))
  const fetchByDescription = async (description) =>
    setCottages(await cottageService.getByDescriptionContaining(description))
  const fetchByAnything = async (anything) => setCottages(await cottageService.getByAnything(anything))


  const searchForDatePeriod = (datePeriod) => {
    cottageService.findByPeriod(datePeriod).then((gotCottages => setCottages(gotCottages)))
  }

  return (
    <>
      <AllCottages
        cottages={cottages}
        handleChange={(e) => handleChange(e)}
        handleSelect={(e) => handleSelect(e)}
        handleSort={(e) => handleSort(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
      />
    </>
  )
}

export default Cottages
