import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ChangeCottageInfoForm from '../../../components/forms/ChangeCottageInfoForm'
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
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  const handleChange = (values) => {
    values = JSON.stringify(values)
    const obj = JSON.parse(values)
    cottageService.update(cottage.id, obj)
    router.push(`/cottages/owned/${cottage.id}`)
  }

  return (
    <>
      <ChangeCottageInfoForm cottage={cottage} handleChange={handleChange} />
    </>
  )
}

export default ChangeCottageInfo
