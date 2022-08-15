import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import { useEffect, useState } from 'react'
import locationService from '../../services/location'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'
import 'leaflet-defaulticon-compatibility'

const Map = ({ address }) => {
  const [coordinates, setCoordinates] = useState([])
  useEffect(() => {
    const getLatLong = async () => {
      const location = await locationService.getByQuery(address)
      const { lat, lon } = location[0]
      setCoordinates([parseFloat(lat), parseFloat(lon)])
    }
    getLatLong()
  }, [address])

  if (coordinates && coordinates.length) {
    return (
      <MapContainer center={coordinates} zoom={15} scrollWheelZoom={false} style={{ height: 400, width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={coordinates}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    )
  }
  return <></>
}

export default Map
