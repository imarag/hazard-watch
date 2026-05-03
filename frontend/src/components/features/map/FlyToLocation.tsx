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
    map.setView([0, 0], 2)
    map.flyTo([lat, lon], 13, { duration: 5 })
  }, [lat, lon, map])
  return null
}
