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
import { MAP_SETTINGS } from '../constants'
import type { ElementSize } from '@/shared/types/form'

interface MapProps {
  center?: [number, number]
  scrollWheelZoom?: boolean
  zoom?: number
  height?: string
  buttonIconSize?: ElementSize
  legendTitle?: string
  onMapClick?: (coords: { lat: number; lng: number }) => void
  onLocationFound?: (coords: { lat: number; lng: number }) => void
  onMarkerMove?: (id: string, coords: { lat: number; lng: number }) => void
  onMoveEnd?: (bounds: MapBounds) => void
  onZoomEnd?: (bounds: MapBounds) => void
  onMapReady?: (bounds: MapBounds) => void
  flyTarget?: FlyTarget | null
  markers?: MarkerType[][]
  loading?: boolean
  legendItems?: LegendItem[]
  children?: React.ReactNode
  showZoomControls?: boolean
  showCurrentPosition?: boolean
  showLegend?: boolean
  showAttributionControl?: boolean
  locateOnMount?: boolean
}

export default function Map({
  center = MAP_SETTINGS.center,
  scrollWheelZoom = MAP_SETTINGS.scrollWheelZoom,
  zoom = MAP_SETTINGS.zoom,
  height = MAP_SETTINGS.height,
  buttonIconSize = MAP_SETTINGS.buttonIconSize,
  legendTitle = MAP_SETTINGS.legendTitle,
  showZoomControls = MAP_SETTINGS.showZoomControls,
  showCurrentPosition = MAP_SETTINGS.showCurrentPosition,
  showLegend = MAP_SETTINGS.showLegend,
  showAttributionControl = MAP_SETTINGS.showAttributionControl,
  flyTarget = null,
  markers = [],
  loading = false,
  legendItems = [],
  onMapClick,
  onLocationFound,
  onMarkerMove,
  onMoveEnd,
  onZoomEnd,
  onMapReady,
  locateOnMount = MAP_SETTINGS.locateOnMount,
  children,
}: MapProps) {
  const { positions, tileUrl } = MAP_SETTINGS

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{ height }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url={tileUrl} />
      {showZoomControls && (
        <ZoomControlButtons
          size={buttonIconSize}
          position={positions.zoomControl}
        />
      )}
      {showCurrentPosition && (
        <GetCurrentPositionButton
          size={buttonIconSize}
          position={positions.currentPosition}
        />
      )}
      {showLegend && legendItems.length > 0 && (
        <Legend
          title={legendTitle}
          items={legendItems}
          position={positions.legend}
        />
      )}
      {showAttributionControl && (
        <AttributionControl position={positions.attribution} />
      )}
      {loading && <MapSpinner />}
      <FlyToController target={flyTarget} />
      <MapEventsListener
        locateOnMount={locateOnMount}
        onMapClick={onMapClick}
        onLocationFound={onLocationFound}
        onMoveEnd={onMoveEnd}
        onZoomEnd={onZoomEnd}
        onMapReady={onMapReady}
      />
      {markers.map((group, i) => (
        <MarkerClusterGroup
          key={i}
          chunkedLoading
          animate={false}
          disableClusteringAtZoom={MAP_SETTINGS.disableClusteringAtZoom}
        >
          {group.map((m) => (
            <MarkerItem key={m.id} marker={m} onMove={onMarkerMove} />
          ))}
        </MarkerClusterGroup>
      ))}
      {children}
    </MapContainer>
  )
}
