import { useMapEvents } from 'react-leaflet'
import { useEffect } from 'react'
import L from 'leaflet'
import type { MapBounds } from '@/features/layers/types'
import { MAP_SETTINGS } from '../constants'

function getBoundsObject(bounds: L.LatLngBounds): MapBounds {
  return {
    minLat: bounds.getSouth(),
    maxLat: bounds.getNorth(),
    minLng: bounds.getWest(),
    maxLng: bounds.getEast(),
  }
}

interface MapEventsListenerProps {
  onMapClick?: (coords: { lat: number; lng: number }) => void
  onLocationFound?: (coords: { lat: number; lng: number }) => void
  onMoveEnd?: (bounds: MapBounds) => void
  onZoomEnd?: (bounds: MapBounds) => void
  onMapReady?: (bounds: MapBounds) => void
  locateOnMount: boolean
}

export default function MapEventsListener({
  locateOnMount,
  onMapClick,
  onLocationFound,
  onMoveEnd,
  onZoomEnd,
  onMapReady,
}: MapEventsListenerProps) {
  const map = useMapEvents({
    moveend: (e) => {
      onMoveEnd?.(getBoundsObject(e.target.getBounds()))
    },
    zoomend: (e) => {
      onZoomEnd?.(getBoundsObject(e.target.getBounds()))
    },
    locationfound: (e) => {
      map.flyTo([e.latlng.lat, e.latlng.lng], MAP_SETTINGS.startZoom, {
        duration: MAP_SETTINGS.flyDurationSec,
      })
      onLocationFound?.({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
    click: (e) => {
      onMapClick?.({ lat: e.latlng.lat, lng: e.latlng.lng })
    },
  })

  useEffect(() => {
    if (locateOnMount) {
      map.locate()
    }
  }, [map, locateOnMount])

  useEffect(() => {
    onMapReady?.(getBoundsObject(map.getBounds()))
  }, [map, onMapReady])

  return null
}
