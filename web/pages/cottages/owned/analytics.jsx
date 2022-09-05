import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import cottageService from '../../../services/cottage'
import dateUtils from '../../../utils/dateUtils'

const Analitycs = () => {
  const router = useRouter()
  const { id } = router.query
  const [entity, setEntity] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      let fetchedEntity = await cottageService.getById(id)
      // Prebacuje polja u datume jer nisu datumi kad dodju na front
      fetchedEntity = dateUtils.entityFieldsToDate(fetchedEntity)
      setEntity(fetchedEntity)
    }
    if (router.isReady) fetchData()
  }, [router.isReady, id])

  if (Object.keys(entity).length === 0) {
    return <div>Loading....</div>
  }

  return <></>
}

export default Analitycs
