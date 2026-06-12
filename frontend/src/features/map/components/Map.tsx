import {
  MapContainer,
  TileLayer,
  AttributionControl,
  Marker,
  useMapEvents,
} from 'react-leaflet'
import ZoomControlButtons from '@/features/map/components/ZoomControlButtons'
import GetCurrentPositionButton from '@/features/map/components/GetCurrentPositionButton'
import React, { useRef } from 'react'
import FlyToController from '@/features/map/components/FlyController'
import type { FlyTarget, MarkerType } from '@/features/map/types'
import MarkerTooltip from '@/features/map/components/MarkerToolTip'
import MarkerClusterGroup from 'react-leaflet-cluster'
import MapSpinner from '@/features/map/components/MapSpinner'
import L from 'leaflet'
import type { MapBounds } from '@/features/hazards/types'

interface MapProps {
  center?: [number, number]
  scrollWheelZoom?: boolean
  zoom?: number
  height?: string
  zoomControl?: boolean
  attributionControl?: boolean
  children?: React.ReactNode
  buttonIconSize?: 'small' | 'medium' | 'large'
  onMapClick?: (coords: { lat: number; lon: number }) => void
  onLocationFound?: (coords: { lat: number; lon: number }) => void
  onMarkerMove?: (id: string, coords: { lat: number; lon: number }) => void
  onMoveEnd?: (bounds: MapBounds) => void
  onZoomEnd?: (bounds: MapBounds) => void
  flyTarget?: FlyTarget | null
  markers?: MarkerType[][]
  loading?: boolean
}

function MarkerItem({
  marker,
  onMove,
}: {
  marker: MarkerType
  onMove?: (id: string, coords: { lat: number; lon: number }) => void
}) {
  const markerRef = useRef<L.Marker>(null)

  return (
    <Marker
      position={[marker.coords.lat, marker.coords.lon]}
      draggable={marker.draggable}
      ref={markerRef}
      eventHandlers={{
        dragend() {
          if (marker.draggable && onMove) {
            const latlng = markerRef.current?.getLatLng()
            if (latlng) {
              onMove(marker.id, { lat: latlng.lat, lon: latlng.lng })
            }
          }
        },
      }}
    >
      {marker.tooltip && <MarkerTooltip tooltip={marker.tooltip} />}
    </Marker>
  )
}

function getBoundsObject(bounds: L.LatLngBounds): MapBounds {
  return {
    minLat: bounds.getSouth(),
    maxLat: bounds.getNorth(),
    minLng: bounds.getWest(),
    maxLng: bounds.getEast(),
  }
}

function MapEventsListener({
  onMoveEnd,
  onZoomEnd,
}: {
  onMoveEnd?: (bounds: MapBounds) => void
  onZoomEnd?: (bounds: MapBounds) => void
}) {
  useMapEvents({
    moveend: (e) => onMoveEnd?.(getBoundsObject(e.target.getBounds())),
    zoomend: (e) => onZoomEnd?.(getBoundsObject(e.target.getBounds())),
  })
  return null
}

export default function Map({
  center = [51.505, -0.09],
  scrollWheelZoom = true,
  zoom = 13,
  height = '240px',
  zoomControl = false,
  attributionControl = true,
  buttonIconSize = 'small',
  flyTarget = null,
  markers = [],
  loading = false,
  onMarkerMove,
  onMoveEnd,
  onZoomEnd,
  children,
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{ height }}
      zoomControl={zoomControl}
      attributionControl={attributionControl}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <AttributionControl position='bottomleft' />
      <ZoomControlButtons size={buttonIconSize} position='topleft' />
      <GetCurrentPositionButton size={buttonIconSize} position='bottomright' />
      {loading && <MapSpinner />}
      <FlyToController target={flyTarget} />
      <MapEventsListener onMoveEnd={onMoveEnd} onZoomEnd={onZoomEnd} />
      {markers.map((group, i) => (
        <MarkerClusterGroup key={i} chunkedLoading>
          {group.map((m) => (
            <MarkerItem key={m.id} marker={m} onMove={onMarkerMove} />
          ))}
        </MarkerClusterGroup>
      ))}
      {children}
    </MapContainer>
  )
}
