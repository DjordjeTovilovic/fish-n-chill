import { useState, useEffect } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import cottageService from '../../services/cottage'
import cottageActionService from 'services/cottagesAction'

const Cottages = () => {
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const [actionsExist, setActionsExist] = useState(false)
  const [sortFilterItems, setSortFilterItems] = useState(['Name', 'Address', 'Rating', 'Price'])
  const [tagFilters, setTagFilters] = useState([])
  const [cottages, setCottages] = useState([])
  const [cottagesFiltered, setCottagesFiltered] = useState([])
  const [cottagesToShow, setCottagesToShow] = useState([])

  useEffect(() => {
    cottageService.getAll().then((gotCottages) => {
      setCottages(gotCottages)
      setCottagesFiltered(gotCottages)
      setCottagesToShow(gotCottages)
    })
    cottageActionService.checkIfAnyExist().then((exists) => setActionsExist(exists))
  }, [])

  const searchForDatePeriod = (datePeriod) => {
    cottageService.findByPeriod(datePeriod).then((gotCottages) => setCottages(gotCottages))
  }

  const handleSearchFieldChange = (value) => {
    setFilter(value)
    setCottagesToShow(
      filter
        ? cottagesFiltered.filter((cottage) => cottage[filterProperty].toLowerCase().includes(value.toLowerCase()))
        : cottagesFiltered
    )
  }

  const handleSearchFilterChange = (e) => {
    setFilterProperty(e.target.value)
  }

  const handleSortFilterChange = (e) => {
    switch (e.target.value) {
      case 'name': {
        setCottages([...cottages.sort((a, b) => a.name.localeCompare(b.name))])
        break
      }
      case 'address': {
        setCottages([...cottages.sort((a, b) => a.address.localeCompare(b.address))])
        break
      }
      case 'rating': {
        setCottages([...cottages.sort((a, b) => b.ratingAverage - a.ratingAverage)])
        break
      }
      case 'price': {
        setCottages([...cottages.sort((a, b) => a.price - b.price)])
        break
      }
      default: {
        break
      }
    }
    updateTagFilters('')
  }

  const updateTagFilters = (tag) => {
    let selectedFilters = [...tagFilters]
    if (tag !== '') {
      const tagIndex = selectedFilters.findIndex((tagName) => tagName === tag)
      if (tagIndex !== -1) selectedFilters.splice(tagIndex, 1)
      else selectedFilters.push(tag)
      setTagFilters(selectedFilters)
    }

    if (selectedFilters.length !== 0) {
      setCottagesFiltered(
        cottages.filter((cottage) => {
          let answer = true
          selectedFilters.forEach((filter) => {
            if (!cottage.tags[filter]) answer = cottage.tags[filter]
          })
          return answer
        })
      )
    } else {
      setCottagesFiltered(cottages)
    }
  }
  //ovaj useEffect se triggeruje kada se koriste tag filteri
  useEffect(() => {
    handleSearchFieldChange(filter)
  }, [cottagesFiltered])

  return (
    <>
      <AllEntities
        entities={cottagesToShow}
        handleSearchFieldChange={(e) => handleSearchFieldChange(e)}
        handleSearchFilterChange={(e) => handleSearchFilterChange(e)}
        handleSortFilterChange={(e) => handleSortFilterChange(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
        actionsExist={actionsExist}
        sortFilterItems={sortFilterItems}
        updateTagFilters={updateTagFilters}
      />
    </>
  )
}

export default Cottages
