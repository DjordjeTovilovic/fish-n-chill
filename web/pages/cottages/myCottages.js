import { useState, useEffect } from 'react'
import AllCottagesForOwner from '../../components/AllCottagesForOwner'
import cottageService from '../../services/cottage'

const MyCottages = () => {
  const [cottages, setCottages] = useState([])
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')

  useEffect(() => {
    cottageService.getAllForOwner().then((gotCottages) => setCottages(gotCottages))
  }, [])

  const cottagesToShow = filter
    ? cottages.filter((cottage) => cottage[filterProperty].toLowerCase().includes(filter.toLowerCase()))
    : cottages

  const searchForDatePeriod = (datePeriod) => {
    cottageService.findByPeriod(datePeriod).then((gotCottages) => setCottages(gotCottages))
  }
  const handleDelete = async (id) => {
    await cottageService.remove(id)
    window.location.reload()
  }

  const handleChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSelect = (e) => {
    setFilterProperty(e.target.value)
  }

  const handleSort = (e) => {
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
  }

  return (
    <>
      <AllCottagesForOwner
        cottages={cottagesToShow}
        handleChange={(e) => handleChange(e)}
        handleSelect={(e) => handleSelect(e)}
        handleSort={(e) => handleSort(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
        handleDelete={(e) => handleDelete(e)}
      />
    </>
  )
}

export default MyCottages
