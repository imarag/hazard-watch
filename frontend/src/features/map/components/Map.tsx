import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet'
import ZoomControlButtons from '@/features/map/components/ZoomControlButtons'
import GetCurrentPositionButton from '@/features/map/components/GetCurrentPositionButton'
import React from 'react'

interface MapProps {
  center?: [number, number]
  zoom?: number
  scrollWheelZoom?: boolean
  height?: string
  zoomControl?: boolean
  attributionControl?: boolean
  zoomControlPosition?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  children: React.ReactNode
  buttonIconSize?: 'small' | 'medium' | 'large'
}

export default function Map({
  center = [51.505, -0.09],
  scrollWheelZoom = true,
  zoom = 13,
  height = '240px',
  zoomControl = false,
  attributionControl = true,
  buttonIconSize = 'small',
  children,
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{ height: height }}
      zoomControl={zoomControl}
      attributionControl={attributionControl}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <AttributionControl position='bottomleft' />
      <ZoomControlButtons size={buttonIconSize} position='topleft' />
      <GetCurrentPositionButton size={buttonIconSize} position='bottomright' />
      {children}
    </MapContainer>
  )
}
