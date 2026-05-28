import { Marker } from 'react-leaflet'
import L from 'leaflet'
import { renderToStaticMarkup } from 'react-dom/server'
import type { SvgIconComponent } from '@mui/icons-material'
import MarkerTooltip from '@/features/map/components/MarkerToolTip'

const createIcon = (Icon: SvgIconComponent, color: string) =>
  L.divIcon({
    html: renderToStaticMarkup(<Icon style={{ color, fontSize: 32 }} />),
    className: '',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })

export default function HazardMarker({
  lat,
  lon,
  icon,
  color,
  tooltip,
}: {
  lat: number
  lon: number
  icon: SvgIconComponent
  color: string
  tooltip?: Record<string, unknown>
}) {
  if (lat == null || lon == null) {
    return null
  }
  return (
    <Marker position={[lat, lon]} icon={createIcon(icon, color)}>
      {tooltip && <MarkerTooltip tooltip={tooltip} />}
    </Marker>
  )
}
