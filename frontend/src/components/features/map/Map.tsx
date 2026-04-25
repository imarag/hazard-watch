import { MapContainer, TileLayer, AttributionControl } from 'react-leaflet'

import React from 'react'

interface MapProps {
  center?: [number, number]
  zoom?: number
  scrollWheelZoom?: boolean
  height?: string
  zoomControl?: boolean
  zoomControlPosition?: 'topleft' | 'topright' | 'bottomleft' | 'bottomright'
  children: React.ReactNode
}

export default function Map({
  center = [51.505, -0.09],
  scrollWheelZoom = true,
  zoom = 13,
  height = '240px',
  children,
}: MapProps) {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={scrollWheelZoom}
      style={{ height: height }}
      zoomControl={false}
      attributionControl={false}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <AttributionControl position='bottomleft' />
      {children}
    </MapContainer>
  )
}
