import { useMap } from 'react-leaflet'
import { useEffect } from 'react'

export default function FlyToLocation({
  lat,
  lon,
}: {
  lat: number
  lon: number
}) {
  const map = useMap()
  useEffect(() => {
    map.flyTo([lat, lon], map.getZoom())
  }, [lat, lon, map])
  return null
}
