import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import type { FlyTarget } from '@/features/map/types'

interface FlyToControllerProps {
  target: FlyTarget | null
}

export default function FlyToController({ target }: FlyToControllerProps) {
  const map = useMap()

  useEffect(() => {
    if (target) {
      map.flyTo([target.coords.lat, target.coords.lon], target.zoom ?? 14)
    }
  }, [target, map])

  return null
}
