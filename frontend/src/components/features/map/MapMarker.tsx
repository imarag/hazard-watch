import { Marker } from 'react-leaflet'

export default function MapMarker({ lat, lon }: { lat: number; lon: number }) {
  if (lat == null || lon == null) return null
  return <Marker position={[lat, lon]} />
}
