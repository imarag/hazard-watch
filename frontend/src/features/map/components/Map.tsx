import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet'
import ZoomControlButtons from '@/features/map/components/ZoomControlButtons'
import GetCurrentPositionButton from '@/features/map/components/GetCurrentPositionButton'
import React from 'react'
import FlyToController from '@/features/map/components/FlyController'
import type { FlyTarget, LegendItem, MarkerType } from '@/features/map/types'
import MarkerClusterGroup from 'react-leaflet-cluster'
import MapSpinner from '@/features/map/components/MapSpinner'
import type { MapBounds } from '@/features/layers/types'
import Legend from '@/features/map/components/Legend'
import MarkerItem from './MarkerItem'
import MapEventsListener from './MapEventsListener'
import { MAP_POSITIONS, MAP_CONFIG } from '../constants'

interface MapProps {
  center?: [number, number]
  scrollWheelZoom?: boolean
  zoom?: number
  height?: string
  zoomControl?: boolean
  attributionControl?: boolean
  children?: React.ReactNode
  buttonIconSize?: 'small' | 'medium' | 'large'
  onMapClick?: (coords: { lat: number; lng: number }) => void
  onLocationFound?: (coords: { lat: number; lng: number }) => void
  onMarkerMove?: (id: string, coords: { lat: number; lng: number }) => void
  onMoveEnd?: (bounds: MapBounds) => void
  onZoomEnd?: (bounds: MapBounds) => void
  onMapReady?: (bounds: MapBounds) => void
  flyTarget?: FlyTarget | null
  markers?: MarkerType[][]
  loading?: boolean
  legendTitle?: string
  legendItems?: LegendItem[]
}

export default function Map({
  center = MAP_CONFIG.center,
  scrollWheelZoom = MAP_CONFIG.scrollWheelZoom,
  zoom = MAP_CONFIG.zoom,
  height = MAP_CONFIG.height,
  zoomControl = MAP_CONFIG.zoomControl,
  attributionControl = MAP_CONFIG.attributionControl,
  buttonIconSize = MAP_CONFIG.buttonIconSize,
  flyTarget = null,
  markers = [],
  loading = false,
  legendTitle = MAP_CONFIG.legendTitle,
  legendItems = [],
  onMarkerMove,
  onMoveEnd,
  onZoomEnd,
  onMapReady,
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
      <TileLayer url={MAP_CONFIG.tileUrl} />
      <AttributionControl position={MAP_POSITIONS.attribution} />
      <ZoomControlButtons size={buttonIconSize} position={MAP_POSITIONS.zoomControl} />
      <GetCurrentPositionButton size={buttonIconSize} position={MAP_POSITIONS.currentPosition} />
      {loading && <MapSpinner />}
      <FlyToController target={flyTarget} />
      <MapEventsListener
        onMoveEnd={onMoveEnd}
        onZoomEnd={onZoomEnd}
        onMapReady={onMapReady}
      />
      {markers.map((group, i) => (
        <MarkerClusterGroup
          key={i}
          chunkedLoading
          animate={false}
          disableClusteringAtZoom={8}
        >
          {group.map((m) => (
            <MarkerItem key={m.id} marker={m} onMove={onMarkerMove} />
          ))}
        </MarkerClusterGroup>
      ))}
      <Legend title={legendTitle} items={legendItems} position={MAP_POSITIONS.legend} />
      {children}
    </MapContainer>
  )
}