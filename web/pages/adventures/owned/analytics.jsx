import { useEffect, useState } from 'react'
import ownerService from '../../../services/owner'
import { Container } from '@mui/system'
import dateUtils from '../../../utils/dateUtils'
import { Box, Tab, Tabs } from '@mui/material'
import ProfitChart from '../../../components/chart/profitChart'
import ReservationsChart from '../../../components/chart/reservationsChart'
import RatingChart from '../../../components/chart/ratingChart'
import adventureService from '../../../services/adventure'

const Analytics = () => {
  const [reservations, setReservations] = useState([])
  const [tabValue, setTabValue] = useState(1)
  const [entities, setEntities] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      let fetchedReservations = await ownerService.getAllPastAdventureOwnerReservations()
      fetchedReservations = dateUtils.reservationListFieldsToDate(fetchedReservations)
      setReservations(fetchedReservations)

      let fetchedEntites = await adventureService.getAllForOwner()
      setEntities(fetchedEntites)
    }
    fetchData()
  }, [])

  return (
    <Container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => {
            setTabValue(newValue)
          }}
          aria-label="basic tabs"
        >
          <Tab label="Average rating" />
          <Tab label="Reservations for period" />
          <Tab label="Profit for time period" />
        </Tabs>
      </Box>
      {tabValue === 0 && <RatingChart entities={entities} />}
      {tabValue === 1 && <ReservationsChart reservations={reservations} />}
      {tabValue === 2 && <ProfitChart reservations={reservations} />}
    </Container>
  )
}

export default Analytics
