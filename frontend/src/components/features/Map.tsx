import { MapContainer, TileLayer } from 'react-leaflet'
import React from 'react'

interface MapProps {
  center?: [number, number]
  zoom?: number
  scrollWheelZoom?: boolean
  height?: string
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
      style={{ height: height, borderRadius: 8 }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      {children}
    </MapContainer>
  )
}
