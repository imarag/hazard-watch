import { useMap } from 'react-leaflet'
import { useEffect } from 'react'
import type { FlyTarget } from '@/features/map/types'
import { MAP_SETTINGS } from '../constants'

interface FlyToControllerProps {
  target: FlyTarget | null
}

export default function FlyToController({ target }: FlyToControllerProps) {
  const map = useMap()

  useEffect(() => {
    if (target) {
      map.flyTo([target.coords.lat, target.coords.lon], target.zoom ?? MAP_SETTINGS.startZoom, {
        duration: target.flyDurationSec ?? MAP_SETTINGS.flyDurationSec,
      })
    }
  }, [target, map])

  return null
}
