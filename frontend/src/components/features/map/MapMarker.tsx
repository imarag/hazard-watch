import { Marker } from 'react-leaflet'

export default function MapMarker({ lat, lon }: { lat: number; lon: number }) {
  console.log(lon, lat, '****')
  if (lat == null || lon == null) {
    return null
  }
  return <Marker position={[lat, lon]} />
}
