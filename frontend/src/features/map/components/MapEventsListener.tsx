import { useMapEvents } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import type { MapBounds } from '@/features/layers/types'

function getBoundsObject(bounds: L.LatLngBounds): MapBounds {
  return {
    minLat: bounds.getSouth(),
    maxLat: bounds.getNorth(),
    minLng: bounds.getWest(),
    maxLng: bounds.getEast(),
  }
}

export default function MapEventsListener({
  onMoveEnd,
  onZoomEnd,
  onMapReady,
}: {
  onMoveEnd?: (bounds: MapBounds) => void
  onZoomEnd?: (bounds: MapBounds) => void
  onMapReady?: (bounds: MapBounds) => void
}) {
  const map = useMapEvents({
    moveend: (e) => onMoveEnd?.(getBoundsObject(e.target.getBounds())),
    zoomend: (e) => onZoomEnd?.(getBoundsObject(e.target.getBounds())),
  })

  useEffect(() => {
    onMapReady?.(getBoundsObject(map.getBounds()))
  }, [map, onMapReady])

  return null
}
