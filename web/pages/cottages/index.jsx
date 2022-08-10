import { useState, useEffect } from 'react'
import AllEntities from '../../components/lists/AllEntities'
import cottageService from '../../services/cottage'
import cottageActionService from 'services/cottagesAction'

const Cottages = () => {
  const [cottages, setCottages] = useState([])
  const [filter, setFilter] = useState('')
  const [filterProperty, setFilterProperty] = useState('address')
  const [actionsExist, setActionsExist] = useState(false)

  useEffect(() => {
    cottageService.getAll().then((gotCottages) => setCottages(gotCottages))
    cottageActionService.checkIfAnyExist().then((exists) => setActionsExist(exists))
  }, [])

  // Ova sintaksa cottage[nesto] samo pristupa elementu nesto od objekta cottage
  // kao sto bi to uradio sa cottage.nesto, samo sto ovako mozes to dinamicno raditi
  // tj ne moras znati polje unaprijed prije pristupanja
  // Da ovo uradim negdje u firmi kontam dobio bi otkaz odma hahahahha
  const cottagesToShow = filter
    ? cottages.filter((cottage) => cottage[filterProperty].toLowerCase().includes(filter.toLowerCase()))
    : cottages

  const searchForDatePeriod = (datePeriod) => {
    cottageService.findByPeriod(datePeriod).then((gotCottages) => setCottages(gotCottages))
  }

  const handleSearchFieldChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSearchFilterChange = (e) => {
    setFilterProperty(e.target.value)
  }

  const handleSortFilterChange = (e) => {
    switch (e.target.value) {
      case 'name': {
        // Kad stavljas stvari u useState treba napraviti novi objekat, a ne raditi sa starim
        // inace dolazi do problema, kao sto ovdje nije htjeo rerenderovati
        // zato sam napravio novu listu od tih elemenata
        // ta [...staraLista] sintaksa pravi novu listu od elemenata stare liste
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
      <AllEntities
        entities={cottagesToShow}
        handleSearchFieldChange={(e) => handleSearchFieldChange(e)}
        handleSearchFilterChange={(e) => handleSearchFilterChange(e)}
        handleSortFilterChange={(e) => handleSortFilterChange(e)}
        searchForDatePeriod={(datePeriod) => searchForDatePeriod(datePeriod)}
        actionsExist={actionsExist}
      />
    </>
  )
}

export default Cottages
