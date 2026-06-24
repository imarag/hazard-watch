import type { SvgIconComponent } from '@mui/icons-material'
import { renderToStaticMarkup } from 'react-dom/server'
import L from 'leaflet'
import type { MarkerType } from '../types'
import { useRef, useMemo } from 'react'
import { Marker } from 'react-leaflet'
import MarkerTooltip from './MarkerToolTip'

function createMarkerIcon(Icon: SvgIconComponent, color?: string) {
  return L.divIcon({
    html: renderToStaticMarkup(<Icon htmlColor={color} style={{ color }} />),
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  })
}

export default function MarkerItem({
  marker,
  onMove,
}: {
  marker: MarkerType
  onMove?: (id: string, coords: { lat: number; lng: number }) => void
}) {
  const markerRef = useRef<L.Marker>(null)
  const icon = useMemo(
    () =>
      marker.icon ? createMarkerIcon(marker.icon, marker.color) : undefined,
    [marker.icon, marker.color],
  )

  return (
    <Marker
      position={[marker.coords.lat, marker.coords.lng]}
      draggable={marker.draggable}
      icon={icon}
      ref={markerRef}
      eventHandlers={{
        dragend() {
          if (marker.draggable && onMove) {
            const latlng = markerRef.current?.getLatLng()
            if (latlng) {
              onMove(marker.id, { lat: latlng.lat, lng: latlng.lng })
            }
          }
        },
      }}
    >
      {marker.tooltip && <MarkerTooltip tooltip={marker.tooltip} />}
    </Marker>
  )
}
