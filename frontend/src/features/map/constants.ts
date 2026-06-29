import type { MapElementPosition } from '@/features/map/types'

export const MAP_SETTINGS = {
  center: [51.505, -0.09] as [number, number],
  scrollWheelZoom: true,
  zoom: 13,
  height: '240px',
  buttonIconSize: 'small' as const,
  legendTitle: 'Legend',
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  disableClusteringAtZoom: 8,
  showZoomControls: true,
  showCurrentPosition: true,
  showLegend: true,
  showAttributionControl: true,
  positions: {
    attribution: 'bottomleft',
    zoomControl: 'topleft',
    currentPosition: 'bottomright',
    legend: 'topright',
  } as const satisfies Record<string, MapElementPosition>,
  locateOnMount: false,
  flyDurationSec: 4,
  startZoom: 15
} as const

const POSITION_STYLES: Record<MapElementPosition, React.CSSProperties> = {
  bottomleft: { position: 'absolute', bottom: 10, left: 10, zIndex: 1000 },
  bottomright: { position: 'absolute', bottom: 10, right: 10, zIndex: 1000 },
  topleft: { position: 'absolute', top: 10, left: 10, zIndex: 1000 },
  topright: { position: 'absolute', top: 10, right: 10, zIndex: 1000 },
  centerright: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
  },
  centerleft: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    zIndex: 1000,
  },
  centertop: {
    position: 'absolute',
    top: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  centerbottom: {
    position: 'absolute',
    bottom: 10,
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
}

export function getPositionProps(position: MapElementPosition) {
  return POSITION_STYLES[position]
}
