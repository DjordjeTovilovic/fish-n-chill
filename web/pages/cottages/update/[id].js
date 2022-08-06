import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ChangeCottageInfoForm from '../../../components/ChangeCottageInfoForm'
import cottageService from '../../../services/cottage'

const ChangeCottageInfo = () => {
  const router = useRouter()
  const { id } = router.query
  const [cottage, setCottage] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedCottage = await cottageService.getById(id)
      setCottage(fetchedCottage)
    }
    router.isReady ? fetchData() : console.log('router not ready')
  }, [router.isReady, id])

  const handleChange = (values) => {
    values = JSON.stringify(values)
    const obj = JSON.parse(values)
    obj.id = cottage.id
    cottageService.update(obj)
    window.location.href = 'http://localhost:3000/cottages/myCottages'
  }

  return (
    <>
      <ChangeCottageInfoForm cottage={cottage} handleChange={handleChange} />
    </>
  )
}

export default ChangeCottageInfo
